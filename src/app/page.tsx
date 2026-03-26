"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import Header from "@/components/ui/header";
import { LeaderboardRow, TableCell, TableRow } from "@/components/ui/table-row";
import { Toggle } from "@/components/ui/toggle";
import { H1, Text } from "@/components/ui/typography";
import type { SupportedLanguage } from "@/lib/syntax-highlighting";

export default function Home() {
  const router = useRouter();
  const [roastMode, setRoastMode] = useState(true);
  const [detectedLanguage, setDetectedLanguage] =
    useState<SupportedLanguage | null>(null);
  const [detectionConfidence, setDetectionConfidence] = useState<number>(0);
  const [isCodeOverLimit, setIsCodeOverLimit] = useState(false);
  const [code, setCode] = useState(`// example code to roast

function calculateTotal(items) {
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
}`);

  const handleRoastCode = () => {
    router.push("/results/123e4567-e89b-12d3-a456-426614174000");
  };

  // Leaderboard data - Auto-colored based on score (1-10 scale)
  const leaderboardData = [
    {
      rank: 1,
      score: 1.2, // Red: Very bad code (≤3)
      code: 'eval(prompt("enter code")) document.write(response) // trust the user lol',
      language: "javascript",
    },
    {
      rank: 2,
      score: 4.5, // Yellow/Orange: Medium code (3.1-6)
      code: "if (x == true) { return true; } else if (x == false) { return false; } else { return !false; }",
      language: "typescript",
    },
    {
      rank: 3,
      score: 8.2, // Green: Good code (6.1-10)
      code: "const users = await db.users.findMany({ where: { isActive: true } });",
      language: "sql",
    },
  ];

  return (
    <div className="min-h-screen bg-devroast-bg text-white">
      <Header />

      {/* Main Content - Mobile-First Responsive Layout */}
      <main className="flex flex-col items-center px-4 sm:px-6 lg:px-10 pt-12 lg:pt-20">
        <div className="flex w-full max-w-6xl flex-col items-center gap-6 lg:gap-8">
          {/* Hero Title - Responsive Typography */}
          <div className="flex flex-col items-center gap-2 lg:gap-3 px-4 lg:px-0">
            <div className="flex flex-col sm:flex-row items-center gap-2 lg:gap-3">
              <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-devroast-green">
                $
              </span>
              <H1 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left">
                paste your code. get roasted.
              </H1>
            </div>
            <Text
              variant="small"
              className="font-[IBM_Plex_Mono] text-xs sm:text-sm text-devroast-text-secondary text-center px-2 sm:px-0"
            >
              {`// drop your code below and we'll rate it — brutally honest or full roast mode`}
            </Text>
          </div>

          {/* Code Editor - CodeEditor with Auto Language Detection */}
          <div className="w-full max-w-full lg:w-195 px-2 sm:px-0">
            <CodeEditor
              value={code}
              onChange={setCode}
              placeholder="// paste your code here for roasting..."
              height="adaptive"
              autoDetectLanguage={true}
              showLanguageSelector={true}
              showLineNumbers={true}
              showHeader={true}
              responsive={true}
              maxLength={2000}
              showCharacterCount={true}
              onLimitExceeded={setIsCodeOverLimit}
              onLanguageChange={(language, confidence) => {
                setDetectedLanguage(language);
                setDetectionConfidence(confidence || 0);
                console.log(
                  `Language detected: ${language} (${Math.round((confidence || 0) * 100)}% confidence)`,
                );
              }}
            />
          </div>

          {/* Actions Bar - Responsive Stack/Flex Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full lg:w-195 gap-4 sm:gap-0 px-2 sm:px-0">
            {/* Left Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Toggle
                checked={roastMode}
                onCheckedChange={setRoastMode}
                aria-label="Toggle roast mode"
                className="w-fit"
              />
              <span className="font-[IBM_Plex_Mono] text-xs sm:text-[13px] text-devroast-text-secondary">
                {roastMode ? "roast mode" : "brutally honest"}
              </span>

              {/* Language Detection Status */}
              {detectedLanguage && (
                <div className="flex items-center gap-2">
                  <span className="font-[IBM_Plex_Mono] text-xs text-devroast-text-muted">
                    detected:
                  </span>
                  <span className="font-mono text-xs text-devroast-green">
                    {detectedLanguage}
                  </span>
                  {detectionConfidence > 0 && (
                    <span className="font-mono text-xs text-devroast-text-muted">
                      ({Math.round(detectionConfidence * 100)}%)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Right Action */}
            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
              <Button
                variant="primary"
                responsive={true}
                onClick={handleRoastCode}
                className="w-full sm:w-auto"
                disabled={isCodeOverLimit}
              >
                $ roast_my_code
              </Button>
            </div>
          </div>

          {/* Footer Statistics - Responsive Text */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 pt-6 lg:pt-8">
            <span className="font-[IBM_Plex_Mono] text-xs text-devroast-text-muted">
              2,847 codes roasted
            </span>
            <span className="hidden sm:inline font-mono text-xs text-devroast-text-muted">
              ·
            </span>
            <span className="font-[IBM_Plex_Mono] text-xs text-devroast-text-muted">
              avg score: 4.2/10
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-15" />

        {/* Leaderboard Section - Pixel Perfect with Pencil Design */}
        <div className="flex flex-col items-center gap-6 lg:gap-8 w-full">
          <div className="w-full max-w-full xl:w-240 flex flex-col gap-6 px-4 lg:px-0">
            {/* Title Row - Matching Pencil Design */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-devroast-green">
                  {"//"}
                </span>
                <span className="font-mono text-sm font-bold text-devroast-text-primary">
                  shame_leaderboard
                </span>
              </div>
              <div className="flex items-center">
                <Link
                  href="/leaderboard"
                  className="font-mono text-xs text-devroast-text-secondary px-3 py-1.5 border border-devroast-border hover:bg-devroast-surface hover:text-devroast-text-primary transition-colors duration-200 cursor-pointer"
                >
                  $ view_all &gt;&gt;
                </Link>
              </div>
            </div>

            {/* Subtitle - Matching Pencil Design */}
            <div className="-mt-2">
              <span className="font-[IBM_Plex_Mono] text-[13px] text-devroast-text-muted">
                {`// the worst code on the internet, ranked by shame`}
              </span>
            </div>

            {/* Leaderboard Table - Matching Pencil Design with Border */}
            <div className="border border-devroast-border">
              {/* Table Header - Matching Pencil Design with Background */}
              <div className="hidden md:flex">
                <TableRow
                  variant="static"
                  className="bg-devroast-surface h-10 border-b border-devroast-border"
                >
                  <TableCell
                    width={50}
                    className="text-devroast-text-muted font-mono text-xs font-bold px-5"
                  >
                    RANK
                  </TableCell>
                  <TableCell
                    width={70}
                    className="text-devroast-text-muted font-mono text-xs font-bold"
                  >
                    SCORE
                  </TableCell>
                  <TableCell className="text-devroast-text-muted font-mono text-xs font-bold flex-1">
                    CODE
                  </TableCell>
                  <TableCell
                    width={100}
                    className="text-devroast-text-muted font-mono text-xs font-bold"
                  >
                    LANG
                  </TableCell>
                </TableRow>
              </div>

              {/* Leaderboard Data - Responsive Cards/Table */}
              <div className="space-y-3 md:space-y-0">
                {leaderboardData.map((item) => (
                  <LeaderboardRow
                    key={item.rank}
                    responsive={true}
                    rank={item.rank}
                    score={item.score}
                    code={item.code}
                    language={item.language}
                  />
                ))}
              </div>
            </div>

            {/* Footer Hint - Matching Pencil Design */}
            <div className="flex justify-center py-4">
              <Link
                href="/leaderboard"
                className="font-[IBM_Plex_Mono] text-xs text-devroast-text-muted hover:text-devroast-text-secondary transition-colors duration-200 cursor-pointer"
              >
                showing top 3 of 2,847 · view full leaderboard &gt;&gt;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
