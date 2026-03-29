import "server-only";

import {
  createAnalysisSession,
  createCodeImprovement,
  deleteSubmissionImprovements,
  markCodeSubmissionAnalyzing,
  markCodeSubmissionFailed,
  updateCodeSubmissionAnalysis,
  upsertLeaderboardEntry,
} from "@/db/queries";
import { generateRoastAnalysis } from "@/server/ai/gemini";

const RETRY_DELAYS_MS = [1000, 3000];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shouldRetryGeminiError(error: unknown) {
  const message = String(error).toLowerCase();

  if (
    message.includes("invalid") ||
    message.includes("api key") ||
    message.includes("quota") ||
    message.includes("permission") ||
    message.includes("unauthorized")
  ) {
    return false;
  }

  return (
    message.includes("timeout") ||
    message.includes("timed out") ||
    message.includes("rate") ||
    message.includes("temporar") ||
    message.includes("unavailable") ||
    message.includes("5")
  );
}

export async function analyzeSubmission(params: {
  submissionId: string;
  userId: string;
  code: string;
  language: string;
  roastMode: "roast" | "honest";
}) {
  const startedAt = Date.now();

  await markCodeSubmissionAnalyzing(params.submissionId);

  let lastError: unknown = null;
  let modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  for (let attempt = 0; attempt < RETRY_DELAYS_MS.length + 1; attempt++) {
    try {
      const { analysis, rawText, model } = await generateRoastAnalysis({
        code: params.code,
        language: params.language,
        roastMode: params.roastMode,
      });

      modelName = model;

      await updateCodeSubmissionAnalysis(params.submissionId, {
        shameScore: analysis.shameScore,
        aiFeedback: analysis.technicalFeedback,
        aiRoast: analysis.roastText,
        analysisDurationMs: Date.now() - startedAt,
        status: "completed",
      });

      await deleteSubmissionImprovements(params.submissionId);

      for (const improvement of analysis.improvements) {
        await createCodeImprovement({
          submissionId: params.submissionId,
          title: improvement.title,
          description: improvement.description || undefined,
          improvedCode: params.code,
          improvementType: improvement.improvementType,
          priority: improvement.priority,
          lineStart: improvement.lineStart || undefined,
          lineEnd: improvement.lineEnd || undefined,
        });
      }

      await createAnalysisSession({
        submissionId: params.submissionId,
        aiModel: model,
        aiResponseRaw: rawText,
        latencyMs: Date.now() - startedAt,
        success: true,
      });

      await upsertLeaderboardEntry({
        userId: params.userId,
        submissionId: params.submissionId,
        shameScore: analysis.shameScore,
        language: params.language,
        codePreview: params.code.slice(0, 120),
      });

      return;
    } catch (error) {
      lastError = error;

      const canRetry =
        attempt < RETRY_DELAYS_MS.length && shouldRetryGeminiError(error);

      if (!canRetry) {
        break;
      }

      await wait(RETRY_DELAYS_MS[attempt] || 0);
    }
  }

  const errorMessage =
    lastError instanceof Error ? lastError.message : "Unknown analysis error";

  await createAnalysisSession({
    submissionId: params.submissionId,
    aiModel: modelName,
    success: false,
    errorMessage,
    latencyMs: Date.now() - startedAt,
  });

  await markCodeSubmissionFailed(params.submissionId, {
    errorMessage,
    analysisDurationMs: Date.now() - startedAt,
  });
}
