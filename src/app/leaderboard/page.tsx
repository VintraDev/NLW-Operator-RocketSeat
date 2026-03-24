"use client";

import { Button } from "@/components/ui/button";
import { ResponsiveLink } from "@/components/ui/responsive-link";
import { LeaderboardRow, TableCell, TableRow } from "@/components/ui/table-row";
import { H1, Text } from "@/components/ui/typography";

export default function LeaderboardPage() {
  // Example leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      score: 1.2,
      code: 'eval(prompt("enter code")) document.write(response) // trust the user lol',
      language: "javascript" as const,
    },
    {
      rank: 2,
      score: 1.8,
      code: "for(var i=0;i<arr.length;i++) { console.log(arr[i]); }",
      language: "javascript" as const,
    },
    {
      rank: 3,
      score: 2.1,
      code: "var x = Math.random() > 0.5 ? true : false;",
      language: "javascript" as const,
    },
    {
      rank: 4,
      score: 2.4,
      code: "setTimeout(function(){ alert('Hello'); }, 3000);",
      language: "javascript" as const,
    },
    {
      rank: 5,
      score: 2.7,
      code: "if(x == true) { console.log('x is true'); }",
      language: "javascript" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-devroast-bg text-devroast-text-primary">
      {/* Header/Navbar - Consistent with homepage */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-14 bg-devroast-surface border-b border-devroast-border">
        <div className="flex items-center gap-4 sm:gap-8">
          <ResponsiveLink
            href="/"
            variant="inline"
            className="font-mono text-lg sm:text-xl font-bold text-devroast-green"
          >
            devroast
          </ResponsiveLink>
          <span className="hidden sm:flex font-mono text-sm text-devroast-text-primary">
            leaderboard
          </span>
        </div>
        <span className="font-mono text-sm text-devroast-text-muted">
          2,847 submissions
        </span>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center px-4 sm:px-6 lg:px-10 pt-12 lg:pt-20">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-8 lg:mb-12">
            <H1 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
              full leaderboard
            </H1>
            <Text className="font-[IBM_Plex_Mono] text-xs sm:text-sm text-devroast-text-secondary text-center">
              {`// the worst code on the internet, ranked by shame`}
            </Text>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <ResponsiveLink
              href="/"
              variant="button"
              buttonStyle="secondary"
              responsive={true}
            >
              ← back to roasting
            </ResponsiveLink>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                filter by language
              </Button>
              <Button variant="ghost" size="sm">
                sort by worst
              </Button>
            </div>
          </div>

          {/* Leaderboard Table/Cards */}
          <div className="space-y-4">
            {/* Desktop Table Header - Hidden on mobile */}
            <div className="hidden md:block">
              <TableRow>
                <TableCell className="font-mono text-xs text-devroast-text-muted uppercase tracking-wider">
                  rank
                </TableCell>
                <TableCell className="font-mono text-xs text-devroast-text-muted uppercase tracking-wider">
                  shame score
                </TableCell>
                <TableCell className="font-mono text-xs text-devroast-text-muted uppercase tracking-wider">
                  code
                </TableCell>
                <TableCell className="font-mono text-xs text-devroast-text-muted uppercase tracking-wider">
                  language
                </TableCell>
              </TableRow>
            </div>

            {/* Leaderboard Data */}
            <div className="space-y-3 md:space-y-0">
              {leaderboardData.map((entry) => (
                <LeaderboardRow
                  key={entry.rank}
                  responsive={true}
                  rank={entry.rank}
                  score={entry.score}
                  code={entry.code}
                  language={entry.language}
                />
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-8">
            <Button variant="secondary" responsive={true}>
              load more submissions
            </Button>
          </div>
        </div>
      </main>

      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  );
}
