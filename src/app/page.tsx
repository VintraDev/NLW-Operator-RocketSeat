"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeBlockWithCopy } from "@/components/ui/code-block";
import { TableCell, TableRow } from "@/components/ui/table-row";
import { Toggle } from "@/components/ui/toggle";
import { H1, Text } from "@/components/ui/typography";

export default function Home() {
  const [roastMode, setRoastMode] = useState(true);

  // Código exemplo do design Pencil
  const sampleCode = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i];
  }
  
  if (total > 100) {
    total = total * 0.9;
    console.log("Discount applied");
  }
  
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  
  return total;
  
}`;

  return (
    <div className="min-h-screen bg-devroast-bg text-white">
      {/* Navbar */}
      <nav className="flex h-14 items-center justify-between border-b border-devroast-border bg-devroast-bg px-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-devroast-green">
            &gt;
          </span>
          <span className="font-mono text-lg font-medium text-devroast-text-primary">
            devroast
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-mono text-[13px] text-devroast-text-secondary">
            leaderboard
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center px-10 pt-20">
        <div className="flex w-full max-w-6xl flex-col items-center gap-8">
          {/* Hero Title */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-4xl font-bold text-devroast-green">
                $
              </span>
              <H1 className="font-mono text-4xl font-bold">
                paste your code. get roasted.
              </H1>
            </div>
            <Text
              variant="small"
              className="font-[IBM_Plex_Mono] text-sm text-devroast-text-secondary"
            >
              {`// drop your code below and we'll rate it — brutally honest or full roast mode`}
            </Text>
          </div>

          {/* Code Editor - Using CodeBlockWithCopy component */}
          <div className="w-195">
            <CodeBlockWithCopy
              size="md"
              showHeader={true}
              showLineNumbers={true}
            >
              {sampleCode}
            </CodeBlockWithCopy>
          </div>

          {/* Actions Bar */}
          <div className="flex w-195 items-center justify-between">
            {/* Left Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <Toggle
                  checked={roastMode}
                  onCheckedChange={setRoastMode}
                  label="roast mode"
                  size="md"
                />
              </div>
              <span className="font-[IBM_Plex_Mono] text-xs text-devroast-text-muted">
                {`// maximum sarcasm enabled`}
              </span>
            </div>

            {/* Submit Button */}
            <Button variant="primary">$ roast_my_code</Button>
          </div>

          {/* Footer Statistics */}
          <div className="flex items-center justify-center gap-6 pt-8">
            <span className="font-[IBM_Plex_Mono] text-xs text-devroast-text-muted">
              2,847 codes roasted
            </span>
            <span className="font-mono text-xs text-devroast-text-muted">
              ·
            </span>
            <span className="font-[IBM_Plex_Mono] text-xs text-devroast-text-muted">
              avg score: 4.2/10
            </span>
          </div>
        </div>

        {/* Spacer - 60px as per Pencil design */}
        <div className="h-15" />

        {/* Second Section - Leaderboard Preview */}
        <div className="flex flex-col items-center gap-8">
          <div className="w-240 flex flex-col gap-6">
            {/* Title Row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-devroast-green">
                  {`//`}
                </span>
                <span className="font-mono text-sm font-bold text-devroast-text-primary">
                  shame_leaderboard
                </span>
              </div>
              <Button
                variant="secondary"
                className="text-xs font-mono border border-devroast-border px-3 py-1.5"
              >
                $ view_all &gt;&gt;
              </Button>
            </div>

            {/* Subtitle */}
            <Text className="font-[IBM_Plex_Mono] text-sm text-devroast-text-muted">
              {`// the worst code on the internet, ranked by shame`}
            </Text>

            {/* Leaderboard Table */}
            <div className="border border-devroast-border">
              {/* Table Header */}
              <div className="flex items-center h-10 px-5 bg-devroast-surface border-b border-devroast-border">
                <div className="flex items-center w-12.5">
                  <span className="font-mono text-xs font-medium text-devroast-text-muted">
                    #
                  </span>
                </div>
                <div className="flex items-center w-17.5">
                  <span className="font-mono text-xs font-medium text-devroast-text-muted">
                    score
                  </span>
                </div>
                <div className="flex items-center flex-1">
                  <span className="font-mono text-xs font-medium text-devroast-text-muted">
                    code
                  </span>
                </div>
                <div className="flex items-center w-25">
                  <span className="font-mono text-xs font-medium text-devroast-text-muted">
                    lang
                  </span>
                </div>
              </div>

              {/* Row 1 */}
              <div className="flex items-start px-5 py-4 border-b border-devroast-border">
                <div className="flex items-center w-12.5">
                  <span className="font-mono text-xs text-amber-500">1</span>
                </div>
                <div className="flex items-center w-17.5">
                  <span className="font-mono text-xs font-bold text-devroast-red">
                    1.2
                  </span>
                </div>
                <div className="flex flex-col gap-1 flex-1 pr-6">
                  <span className="font-mono text-xs text-devroast-text-primary">
                    eval(prompt("enter code"))
                  </span>
                  <span className="font-mono text-xs text-devroast-text-primary">
                    document.write(response)
                  </span>
                  <span className="font-mono text-xs text-[#8B8B8B]">
                    {`// trust the user lol`}
                  </span>
                </div>
                <div className="flex items-center w-25">
                  <span className="font-mono text-xs text-devroast-text-secondary">
                    javascript
                  </span>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-start px-5 py-4 border-b border-devroast-border">
                <div className="flex items-center w-12.5">
                  <span className="font-mono text-xs text-devroast-text-secondary">
                    2
                  </span>
                </div>
                <div className="flex items-center w-17.5">
                  <span className="font-mono text-xs font-bold text-devroast-red">
                    1.8
                  </span>
                </div>
                <div className="flex flex-col gap-1 flex-1 pr-6">
                  <span className="font-mono text-xs text-devroast-text-primary">
                    if (x == true) &#123; return true; &#125;
                  </span>
                  <span className="font-mono text-xs text-devroast-text-primary">
                    else if (x == false) &#123; return false; &#125;
                  </span>
                  <span className="font-mono text-xs text-devroast-text-primary">
                    else &#123; return !false; &#125;
                  </span>
                </div>
                <div className="flex items-center w-25">
                  <span className="font-mono text-xs text-devroast-text-secondary">
                    typescript
                  </span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex items-start px-5 py-4">
                <div className="flex items-center w-12.5">
                  <span className="font-mono text-xs text-devroast-text-secondary">
                    3
                  </span>
                </div>
                <div className="flex items-center w-17.5">
                  <span className="font-mono text-xs font-bold text-devroast-red">
                    2.1
                  </span>
                </div>
                <div className="flex flex-col gap-1 flex-1 pr-6">
                  <span className="font-mono text-xs text-devroast-text-primary">
                    SELECT * FROM users WHERE 1=1
                  </span>
                  <span className="font-mono text-xs text-[#8B8B8B]">
                    {`-- TODO: add authentication`}
                  </span>
                </div>
                <div className="flex items-center w-25">
                  <span className="font-mono text-xs text-devroast-text-secondary">
                    sql
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Hint */}
            <div className="flex items-center justify-center py-4">
              <span className="font-[IBM_Plex_Mono] text-xs text-devroast-text-muted">
                showing top 3 of 2,847 · view full leaderboard &gt;&gt;
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Spacer - 60px as per Pencil design */}
        <div className="h-15" />
      </main>
    </div>
  );
}
