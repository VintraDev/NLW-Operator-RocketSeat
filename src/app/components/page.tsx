"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlockWithCopy } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";
import { ScoreRing } from "@/components/ui/score-ring";
import { LeaderboardRow, TableCell, TableRow } from "@/components/ui/table-row";
import { Toggle } from "@/components/ui/toggle";
import { Code, H1, H2, H3, Text } from "@/components/ui/typography";

const code = `function calculateTotal(items) {
  var total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  
  if (total > 100) {
    total = total * 0.9; // apply 10% discount
    console.log("Discount applied");
  }`

export default function ComponentsPage() {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  return (
    <div className="min-h-screen bg-devroast-bg text-white">
      <main className="mx-auto max-w-6xl px-20 py-15">
        <header className="mb-15">
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xl font-bold text-devroast-green">
              {"//"}
            </span>
            <H1>component_library</H1>
          </div>
        </header>

        <div className="space-y-15">
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>typography</H2>
            </div>

            <div className="space-y-5">
              <H1>paste your code. get roasted.</H1>

              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-devroast-green">
                  {"//"}
                </span>
                <H3>detailed_analysis</H3>
              </div>

              <Text variant="bodySecondary">description text sample</Text>

              <Text variant="small">lang: javascript • 7 lines</Text>

              <Code>function calculateTotal()</Code>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>buttons</H2>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="primary">$ roast_my_code</Button>
              <Button variant="secondary">$ share_roast</Button>
              <Button variant="ghost">$ view_all &gt;&gt;</Button>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>toggle</H2>
            </div>

            <div className="flex items-center gap-8">
              <Toggle
                checked={toggle1}
                onCheckedChange={setToggle1}
                label="roast mode"
              />
              <Toggle
                checked={toggle2}
                onCheckedChange={setToggle2}
                label="roast mode"
              />
            </div>

            {/* Debug info to show state */}
            <div className="mt-4 font-mono text-xs text-devroast-text-muted">
              Toggle 1: {toggle1 ? "ON" : "OFF"} | Toggle 2:{" "}
              {toggle2 ? "ON" : "OFF"}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>badges</H2>
            </div>

            <div className="flex items-center gap-6">
              <Badge variant="critical">critical</Badge>
              <Badge variant="warning">warning</Badge>
              <Badge variant="good">good</Badge>
              <Badge variant="critical">needs_serious_help</Badge>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>cards</H2>
            </div>

            <Card className="w-120">
              {" "}
              {/* 480px = 30rem */}
              <CardHeader>
                <Badge variant="critical">critical</Badge>
                <CardTitle>using var instead of const/let</CardTitle>
                <CardDescription>
                  the var keyword is function-scoped rather than block-scoped,
                  which can lead to unexpected behavior and bugs. modern
                  javascript uses const for immutable bindings and let for
                  mutable ones.
                </CardDescription>
              </CardHeader>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>code_block</H2>
            </div>

            <div className="space-y-6">
              {/* CodeBlockWithCopy with filename */}
              <CodeBlockWithCopy
                filename="server.js"
                className="w-195" // 780px = 48.75rem
                size="md"
              >{code}
                </CodeBlockWithCopy>
            </div>
          </section>

          {/* Diff Lines Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>diff_line</H2>
            </div>

            <div className="w-140 space-y-0 border border-devroast-border">
              {" "}
              {/* 560px = 35rem */}
              <DiffLine type="removed" code="var total = 0;" />
              <DiffLine type="added" code="const total = 0;" />
              <DiffLine
                type="context"
                code="for (let i = 0; i < items.length; i++) {"
              />
            </div>
          </section>

          {/* Table Row Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>table_row</H2>
            </div>

            <div className="w-full">
              <LeaderboardRow
                rank={1}
                score={2.1}
                scoreColor="red"
                code="function calculateTotal(items) { var total = 0; ...}"
                language="javascript"
              />
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>navbar</H2>
            </div>

            <div className="flex h-14 items-center justify-between border-b border-devroast-border bg-devroast-bg px-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-devroast-green">
                  &gt;
                </span>
                <span className="font-mono text-base font-medium text-devroast-text-primary">
                  devroast
                </span>
              </div>
              <span className="font-mono text-xs text-devroast-text-secondary">
                leaderboard
              </span>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-devroast-green">
                {"//"}
              </span>
              <H2>score_ring</H2>
            </div>

            <ScoreRing score={3.5} maxScore={10} size="lg" />
          </section>
        </div>
      </main>
    </div>
  );
}
