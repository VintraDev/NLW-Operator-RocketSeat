"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CodeBlockWithCopy } from "@/components/ui/code-block";
import { getScoreColorFromValue } from "@/components/ui/score-badge";
import { ScoreHero } from "@/components/ui/score-hero";
import { Text } from "@/components/ui/typography";
import type { SupportedLanguage } from "@/lib/syntax-highlighting";
import { useTRPC } from "@/trpc/client";
import { AnalysisCard } from "./ui/analysis-card";

type ResultsPageClientProps = {
  roastId: string;
};

function getVerdict(score: number) {
  if (score <= 3) {
    return "verdict: needs_serious_help";
  }

  if (score <= 6) {
    return "verdict: can_be_much_better";
  }

  return "verdict: surprisingly_decent";
}

function getCardSeverity(priority: "low" | "medium" | "high" | "critical") {
  if (priority === "critical") {
    return "critical" as const;
  }

  if (priority === "high" || priority === "medium") {
    return "warning" as const;
  }

  return "good" as const;
}

const supportedLanguages = new Set<string>([
  "javascript",
  "typescript",
  "jsx",
  "tsx",
  "python",
  "java",
  "csharp",
  "go",
  "rust",
  "php",
  "ruby",
  "swift",
  "sql",
  "bash",
  "shell",
  "json",
  "yaml",
  "xml",
  "html",
  "css",
]);

function normalizeLanguageForDisplay(language: string): SupportedLanguage {
  const normalized = language.toLowerCase();

  if (supportedLanguages.has(normalized)) {
    return normalized as SupportedLanguage;
  }

  return "javascript";
}

export function ResultsPageClient({ roastId }: ResultsPageClientProps) {
  const trpc = useTRPC();

  const roastQuery = useQuery({
    ...trpc.roast.getById.queryOptions({ roastId }),
    refetchInterval: (query) => {
      const status = query.state.data?.submission.status;

      if (status === "pending" || status === "analyzing") {
        return 2000;
      }

      return false;
    },
  });

  const retryMutation = useMutation(
    trpc.roast.retry.mutationOptions({
      onSuccess: async () => {
        await roastQuery.refetch();
      },
    }),
  );

  const payload = roastQuery.data;

  const status = payload?.submission.status;
  const isLoading = !payload || status === "pending" || status === "analyzing";

  const linesCount = useMemo(() => {
    const code = payload?.submission.originalCode ?? "";

    if (!code) {
      return 0;
    }

    return code.split("\n").length;
  }, [payload?.submission.originalCode]);

  if (isLoading) {
    return (
      <section className="w-full border border-devroast-border bg-devroast-surface p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <Text className="font-mono text-sm text-devroast-green">
            {"// analyzing_your_code"}
          </Text>
          <Text className="font-[IBM_Plex_Mono] text-xs sm:text-sm text-devroast-text-secondary">
            segurando o compilador com uma mao e o sarcasmo com a outra...
          </Text>
          <div className="h-1 w-full bg-devroast-border overflow-hidden">
            <div className="h-full w-1/3 bg-devroast-green animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!payload) {
    return (
      <section className="w-full border border-devroast-border bg-devroast-surface p-6 sm:p-8">
        <Text className="font-[IBM_Plex_Mono] text-xs sm:text-sm text-devroast-red">
          nao foi possivel carregar este roast.
        </Text>
      </section>
    );
  }

  if (payload.submission.status === "failed") {
    return (
      <section className="w-full border border-devroast-border bg-devroast-surface p-6 sm:p-8 flex flex-col gap-4">
        <Text className="font-mono text-sm text-devroast-red">
          {"// analysis_failed"}
        </Text>
        <Text className="font-[IBM_Plex_Mono] text-xs sm:text-sm text-devroast-text-secondary">
          {payload.error?.message ||
            "a analise falhou depois das tentativas automaticas."}
        </Text>
        <div>
          <Button
            onClick={() => retryMutation.mutate({ roastId })}
            disabled={retryMutation.isPending}
          >
            {retryMutation.isPending ? "$ retrying..." : "$ tentar_novamente"}
          </Button>
        </div>
      </section>
    );
  }

  const score = payload.submission.shameScore ?? 1;
  const displayLanguage = normalizeLanguageForDisplay(
    payload.submission.language,
  );
  const roastQuote =
    payload.submission.aiRoast ||
    "o modelo ficou sem roast, mas seu codigo nao escapou da vergonha.";
  const technicalFeedback =
    payload.submission.aiFeedback || "Sem feedback tecnico detalhado.";
  const scoreColor = getScoreColorFromValue(score);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10">
      <ScoreHero
        score={score}
        verdict={getVerdict(score)}
        roastQuote={roastQuote}
        language={displayLanguage}
        lines={linesCount}
        responsive={true}
      />

      <div className="h-px bg-devroast-border" />

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-devroast-green">{"//"}</span>
          <h2 className="text-sm font-bold text-devroast-text-primary">
            your_submission
          </h2>
          <span className="font-mono text-xs text-devroast-text-muted">
            ({scoreColor})
          </span>
        </div>

        <div className="w-full max-h-[440px] overflow-hidden border border-devroast-border bg-devroast-input">
          <CodeBlockWithCopy
            showHeader={false}
            showLineNumbers={true}
            className="border-0 h-full"
          >
            {payload.submission.originalCode}
          </CodeBlockWithCopy>
        </div>
      </section>

      <div className="h-px bg-devroast-border" />

      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-devroast-green">{"//"}</span>
          <h2 className="text-sm font-bold text-devroast-text-primary">
            detailed_analysis
          </h2>
        </div>

        <AnalysisCard
          severity="warning"
          title="technical_feedback"
          description={technicalFeedback}
        />

        {payload.improvements.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {payload.improvements.map((improvement) => (
              <AnalysisCard
                key={improvement.id}
                severity={getCardSeverity(improvement.priority)}
                title={improvement.title}
                description={
                  improvement.description ||
                  "Melhoria sugerida sem descricao adicional."
                }
              />
            ))}
          </div>
        ) : (
          <Text className="font-[IBM_Plex_Mono] text-xs sm:text-sm text-devroast-text-secondary">
            nenhum ponto de melhoria foi retornado para este roast.
          </Text>
        )}
      </section>
    </div>
  );
}
