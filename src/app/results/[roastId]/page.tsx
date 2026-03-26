import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalysisCard } from "@/components/ui/analysis-card";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { ScoreHero } from "@/components/ui/score-hero";

export const metadata: Metadata = {
  title: "Roast Results | DevRoast",
  description: "Detailed AI roast results for your code submission.",
  openGraph: {
    title: "Roast Results | DevRoast",
    description: "Detailed AI roast results for your code submission.",
    type: "website",
  },
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const submittedCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }

  if (total > 100) {
    console.log("discount applied");
    total = total * 0.9;
  }

  // TODO: handle tax calculation
  // TODO: handle currency conversion

  return total;
}`;

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ roastId: string }>;
}) {
  const { roastId } = await params;

  if (!UUID_REGEX.test(roastId)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-devroast-bg text-devroast-text-primary font-mono">
      <nav className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-10 border-b border-devroast-border">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-xl font-bold text-devroast-green">{">"}</span>
          <span className="text-lg font-medium text-devroast-text-primary">
            devroast
          </span>
        </Link>

        <span className="text-[13px] font-normal text-devroast-text-secondary">
          roast: {roastId.slice(0, 8)}
        </span>
      </nav>

      <main className="w-full px-4 sm:px-6 lg:px-20 py-10">
        <div className="w-full flex flex-col gap-10">
          <ScoreHero
            score={3.5}
            verdict="verdict: needs_serious_help"
            roastQuote="this code looks like it was written during a power outage... in 2005."
            language="javascript"
            lines={7}
          />

          <div className="h-px bg-devroast-border" />

          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <h2 className="text-sm font-bold text-devroast-text-primary">
                your_submission
              </h2>
            </div>

            <div className="w-full h-[424px] overflow-hidden border border-devroast-border bg-devroast-input">
              <CodeBlock
                code={submittedCode}
                language="javascript"
                showHeader={false}
                showLineNumbers={true}
                className="border-0 h-full"
              />
            </div>
          </section>

          <div className="h-px bg-devroast-border" />

          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <h2 className="text-sm font-bold text-devroast-text-primary">
                detailed_analysis
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <AnalysisCard
                severity="critical"
                title="using var instead of const/let"
                description="var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed."
              />
              <AnalysisCard
                severity="warning"
                title="imperative loop pattern"
                description="for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations."
              />
              <AnalysisCard
                severity="good"
                title="clear naming conventions"
                description="calculateTotal and items are descriptive, self-documenting names that communicate intent without comments."
              />
              <AnalysisCard
                severity="good"
                title="single responsibility"
                description="the function does one thing well - calculates a total. no side effects, no mixed concerns, no hidden complexity."
              />
            </div>
          </section>

          <div className="h-px bg-devroast-border" />

          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <h2 className="text-sm font-bold text-devroast-text-primary">
                suggested_fix
              </h2>
            </div>

            <div className="w-full border border-devroast-border bg-devroast-input overflow-hidden">
              <div className="flex items-center h-10 px-4 border-b border-devroast-border">
                <span className="text-xs font-medium text-devroast-text-secondary">
                  your_code.ts → improved_code.ts
                </span>
              </div>

              <div className="py-1">
                <DiffLine
                  type="context"
                  code="function calculateTotal(items) {"
                />
                <DiffLine type="removed" code="  var total = 0;" />
                <DiffLine
                  type="removed"
                  code="  for (var i = 0; i < items.length; i++) {"
                />
                <DiffLine
                  type="removed"
                  code="    total = total + items[i].price;"
                />
                <DiffLine type="removed" code="  }" />
                <DiffLine type="removed" code="  return total;" />
                <DiffLine
                  type="added"
                  code="  return items.reduce((sum, item) => sum + item.price, 0);"
                />
                <DiffLine type="context" code="}" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
