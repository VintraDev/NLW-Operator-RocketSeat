import "server-only";

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const analysisImprovementSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional().default(null),
  improvementType: z.enum([
    "performance",
    "readability",
    "security",
    "best_practices",
    "bug_fix",
    "code_style",
    "architecture",
  ]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  lineStart: z.number().int().nullable().optional().default(null),
  lineEnd: z.number().int().nullable().optional().default(null),
});

const roastAnalysisSchema = z.object({
  shameScore: z.number().int().min(1).max(10),
  roastText: z.string().min(1),
  technicalFeedback: z.string().min(1),
  improvedCode: z.string().optional().default(""),
  diffPatch: z.string().nullable().optional().default(null),
  improvements: z.array(analysisImprovementSchema).default([]),
});

export type RoastAnalysis = z.infer<typeof roastAnalysisSchema>;

function createDeterministicSeed(input: string) {
  let hash = 0;

  for (let index = 0; index < input.length; index++) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }

  // Gemini expects seed as int32 (max 2147483647)
  const int32Seed = hash % 2147483647;

  return int32Seed || 1;
}

function compactRoastText(roastText: string) {
  const normalized = roastText.replace(/\s+/g, " ").trim();
  const firstSentenceMatch = normalized.match(/^(.+?[.!?])(?:\s|$)/);
  const firstSentence = firstSentenceMatch?.[1] || normalized;

  if (firstSentence.length <= 110) {
    return firstSentence;
  }

  return `${firstSentence.slice(0, 107).trimEnd()}...`;
}

type GeminiConfig = {
  apiKey: string;
  model: string;
};

export function getGeminiConfig(): GeminiConfig {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY for roast analysis.");
  }

  return {
    apiKey,
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  };
}

function buildRoastPrompt(params: {
  code: string;
  language: string;
  roastMode: "roast" | "honest";
}) {
  const toneInstruction =
    params.roastMode === "roast"
      ? "Use sarcastic and sharp humor in roastText, but keep technical accuracy."
      : "Use brutally honest but constructive tone in roastText without sarcasm.";

  return [
    "You are DevRoast, an expert code reviewer.",
    toneInstruction,
    "Evaluate code quality and return ONLY valid JSON.",
    "Return shape:",
    '{"shameScore": number(1-10), "roastText": string, "technicalFeedback": string, "improvedCode": string, "diffPatch": string|null, "improvements": [{"title": string, "description": string|null, "improvementType": "performance"|"readability"|"security"|"best_practices"|"bug_fix"|"code_style"|"architecture", "priority": "low"|"medium"|"high"|"critical", "lineStart": number|null, "lineEnd": number|null}]}',
    "Rules:",
    "- shameScore must be an integer between 1 and 10.",
    "- Use this stable rubric and keep scores consistent for equivalent code:",
    "  - correctness and bugs (0-4)",
    "  - readability and maintainability (0-3)",
    "  - best practices and safety (0-3)",
    "- Always map the same technical findings to the same score band.",
    "- technicalFeedback should be objective and concise.",
    "- roastText must be one short punchline sentence (max 110 chars).",
    "- improvedCode must be a full improved version of the submitted code.",
    "- diffPatch should be a unified diff string when possible, otherwise null.",
    "- improvements should include only actionable suggestions.",
    `Language: ${params.language}`,
    "Code:",
    params.code,
  ].join("\n");
}

function extractJsonObject(rawText: string) {
  const trimmed = rawText.trim();

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const jsonBlock = trimmed.match(/```json\s*([\s\S]*?)```/i);
  if (jsonBlock?.[1]) {
    return jsonBlock[1].trim();
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  throw new Error("Gemini response did not contain a valid JSON object.");
}

export function parseGeminiAnalysis(rawText: string): RoastAnalysis {
  const jsonString = extractJsonObject(rawText);
  const parsed = JSON.parse(jsonString);

  return roastAnalysisSchema.parse(parsed);
}

export async function generateRoastAnalysis(params: {
  code: string;
  language: string;
  roastMode: "roast" | "honest";
}) {
  const { apiKey, model } = getGeminiConfig();
  const client = new GoogleGenAI({ apiKey });
  const prompt = buildRoastPrompt(params);
  const seed = createDeterministicSeed(
    `${params.language}|${params.roastMode}|${params.code}`,
  );

  const response = await client.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature: 0,
      topP: 0.1,
      topK: 1,
      candidateCount: 1,
      seed,
    },
  });

  const rawText = response.text;

  if (!rawText) {
    throw new Error("Gemini returned an empty response.");
  }

  const parsed = parseGeminiAnalysis(rawText);

  return {
    model,
    rawText,
    analysis: {
      ...parsed,
      roastText: compactRoastText(parsed.roastText),
    },
  };
}
