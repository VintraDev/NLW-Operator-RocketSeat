"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LeaderboardRow, TableCell, TableRow } from "@/components/ui/table-row";
import { useTRPC } from "@/trpc/client";

export function HomeLeaderboard() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.leaderboard.homepage.queryOptions());
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRow = (rank: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rank]: !prev[rank],
    }));
  };

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-8 w-full">
      <div className="w-full max-w-full xl:w-240 flex flex-col gap-6 px-4 lg:px-0">
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

        <div className="-mt-2">
          <span className="font-[IBM_Plex_Mono] text-[13px] text-devroast-text-muted">
            {`// the worst code on the internet, ranked by shame`}
          </span>
        </div>

        <div className="border border-devroast-border">
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

          <div className="space-y-3 md:space-y-0">
            {data.entries.map((item) => {
              const isExpanded = expandedRows[item.rank] ?? false;

              return (
                <div
                  key={item.rank}
                  className="border-b border-devroast-border last:border-b-0"
                >
                  <LeaderboardRow
                    responsive={true}
                    rank={item.rank}
                    score={item.score}
                    code={item.code}
                    language={item.language}
                  />

                  <div className="px-4 md:px-5 py-3 bg-devroast-bg border-t border-devroast-border">
                    <button
                      type="button"
                      onClick={() => toggleRow(item.rank)}
                      className="inline-flex items-center gap-2 font-mono text-xs text-devroast-green hover:text-devroast-text-primary transition-colors cursor-pointer"
                    >
                      {isExpanded ? "show less" : "show more"}
                      {isExpanded ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 border border-devroast-border bg-devroast-surface p-3 max-h-52 overflow-auto">
                        <pre className="font-mono text-xs leading-5 text-devroast-text-secondary whitespace-pre-wrap break-words m-0">
                          {item.fullCode}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center py-4">
          <Link
            href="/leaderboard"
            className="font-[IBM_Plex_Mono] text-xs text-devroast-text-muted hover:text-devroast-text-secondary transition-colors duration-200 cursor-pointer"
          >
            showing top 3 of {data.stats.totalCodes} - {data.stats.totalRoasts}{" "}
            roasts completed - view full leaderboard &gt;&gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
