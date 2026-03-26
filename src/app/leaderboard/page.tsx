import type { Metadata } from "next";
import Link from "next/link";
import {
  type LeaderboardCodeLine,
  LeaderboardEntry,
} from "@/components/ui/leaderboard-entry";

// ============================================
// Metadata for SEO (Server-side)
// ============================================
export const metadata: Metadata = {
  title: "Shame Leaderboard | DevRoast",
  description: "The most roasted code on the internet.",
  openGraph: {
    title: "Shame Leaderboard | DevRoast",
    description: "The most roasted code on the internet.",
    type: "website",
  },
};

const leaderboardEntries: Array<{
  rank: number;
  score: number;
  language: string;
  lines: number;
  code: LeaderboardCodeLine[];
}> = [
  {
    rank: 1,
    score: 1.2,
    language: "javascript",
    lines: 3,
    code: [
      {
        text: 'eval(prompt("enter code"));',
        tokens: [
          { type: "function", value: "eval" },
          { type: "operator", value: "(" },
          { type: "function", value: "prompt" },
          { type: "operator", value: "(" },
          { type: "string", value: '"enter code"' },
          { type: "operator", value: "));" },
        ],
      },
      {
        text: "document.write(response);",
        tokens: [
          { type: "variable", value: "document" },
          { type: "operator", value: "." },
          { type: "function", value: "write" },
          { type: "operator", value: "(" },
          { type: "variable", value: "response" },
          { type: "operator", value: ");" },
        ],
      },
      {
        text: "// trust the user lol",
        tokens: [{ type: "comment", value: "// trust the user lol" }],
      },
    ],
  },
  {
    rank: 2,
    score: 1.8,
    language: "typescript",
    lines: 5,
    code: [
      {
        text: "if (x == true) {",
        tokens: [
          { type: "keyword", value: "if" },
          { type: "operator", value: " (" },
          { type: "variable", value: "x" },
          { type: "operator", value: " == " },
          { type: "keyword", value: "true" },
          { type: "operator", value: ") {" },
        ],
      },
      {
        text: "  return true;",
        tokens: [
          { type: "operator", value: "  " },
          { type: "keyword", value: "return" },
          { type: "operator", value: " " },
          { type: "keyword", value: "true" },
          { type: "operator", value: ";" },
        ],
      },
      {
        text: "} else if (x == false) {",
        tokens: [
          { type: "operator", value: "}" },
          { type: "operator", value: " " },
          { type: "keyword", value: "else" },
          { type: "operator", value: " " },
          { type: "keyword", value: "if" },
          { type: "operator", value: " (" },
          { type: "variable", value: "x" },
          { type: "operator", value: " == " },
          { type: "keyword", value: "false" },
          { type: "operator", value: ") {" },
        ],
      },
      {
        text: "  return false;",
        tokens: [
          { type: "operator", value: "  " },
          { type: "keyword", value: "return" },
          { type: "operator", value: " " },
          { type: "keyword", value: "false" },
          { type: "operator", value: ";" },
        ],
      },
      {
        text: "} else { return !false; }",
        tokens: [
          { type: "operator", value: "}" },
          { type: "operator", value: " " },
          { type: "keyword", value: "else" },
          { type: "operator", value: " { " },
          { type: "keyword", value: "return" },
          { type: "operator", value: " !" },
          { type: "keyword", value: "false" },
          { type: "operator", value: "; }" },
        ],
      },
    ],
  },
  {
    rank: 3,
    score: 2.1,
    language: "sql",
    lines: 2,
    code: [
      {
        text: "SELECT * FROM users WHERE id=1;",
        tokens: [
          { type: "keyword", value: "SELECT" },
          { type: "operator", value: " * " },
          { type: "keyword", value: "FROM" },
          { type: "operator", value: " " },
          { type: "variable", value: "users" },
          { type: "operator", value: " " },
          { type: "keyword", value: "WHERE" },
          { type: "operator", value: " " },
          { type: "variable", value: "id" },
          { type: "operator", value: "=" },
          { type: "number", value: "1" },
          { type: "operator", value: ";" },
        ],
      },
      {
        text: "-- LOL, SQL injection time",
        tokens: [{ type: "comment", value: "-- LOL, SQL injection time" }],
      },
    ],
  },
  {
    rank: 4,
    score: 2.6,
    language: "java",
    lines: 5,
    code: [
      {
        text: "class Test {",
        tokens: [
          { type: "keyword", value: "class" },
          { type: "operator", value: " " },
          { type: "function", value: "Test" },
          { type: "operator", value: " {" },
        ],
      },
      {
        text: "  void f() {",
        tokens: [
          { type: "operator", value: "  " },
          { type: "keyword", value: "void" },
          { type: "operator", value: " " },
          { type: "function", value: "f" },
          { type: "operator", value: "() {" },
        ],
      },
      {
        text: "    // yolo",
        tokens: [
          { type: "operator", value: "    " },
          { type: "comment", value: "// yolo" },
        ],
      },
      {
        text: "  }",
        tokens: [{ type: "operator", value: "  }" }],
      },
      {
        text: "}",
        tokens: [{ type: "operator", value: "}" }],
      },
    ],
  },
  {
    rank: 5,
    score: 2.8,
    language: "javascript",
    lines: 3,
    code: [
      {
        text: "const a = new Date() + {};",
        tokens: [
          { type: "keyword", value: "const" },
          { type: "operator", value: " " },
          { type: "variable", value: "a" },
          { type: "operator", value: " = " },
          { type: "keyword", value: "new" },
          { type: "operator", value: " " },
          { type: "function", value: "Date" },
          { type: "operator", value: "() + {};" },
        ],
      },
      {
        text: "new Date(Date.now() + 666)",
        tokens: [
          { type: "keyword", value: "new" },
          { type: "operator", value: " " },
          { type: "function", value: "Date" },
          { type: "operator", value: "(" },
          { type: "function", value: "Date" },
          { type: "operator", value: "." },
          { type: "function", value: "now" },
          { type: "operator", value: "() + " },
          { type: "number", value: "666" },
          { type: "operator", value: ")" },
        ],
      },
      {
        text: "while(true) Math.random()",
        tokens: [
          { type: "keyword", value: "while" },
          { type: "operator", value: "(" },
          { type: "keyword", value: "true" },
          { type: "operator", value: ") " },
          { type: "function", value: "Math" },
          { type: "operator", value: "." },
          { type: "function", value: "random" },
          { type: "operator", value: "()" },
        ],
      },
    ],
  },
];

// ============================================
// Leaderboard Page (Server Component)
// ============================================
export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-devroast-bg text-devroast-text-primary font-mono">
      <nav className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-10 border-b border-devroast-border">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-bold text-devroast-green">{">"}</span>
            <span className="text-lg font-medium text-devroast-text-primary">
              devroast
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <span className="text-[13px] font-normal text-devroast-text-secondary">
            leaderboard
          </span>
        </div>
      </nav>

      <main className="w-full px-4 sm:px-6 lg:px-20 py-10">
        <div className="w-full flex flex-col gap-10">
          <section className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3">
              <span className="text-[32px] font-bold text-devroast-green leading-none">
                {">"}
              </span>
              <h1 className="text-[28px] font-bold text-devroast-text-primary leading-none">
                shame_leaderboard
              </h1>
            </div>
            <p className="text-sm font-normal text-devroast-text-secondary font-[IBM_Plex_Mono]">
              {"// the most roasted code on the internet"}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-normal text-devroast-text-tertiary font-[IBM_Plex_Mono]">
                2,847 submissions
              </span>
              <span className="text-xs font-normal text-devroast-text-tertiary font-[IBM_Plex_Mono]">
                ·
              </span>
              <span className="text-xs font-normal text-devroast-text-tertiary font-[IBM_Plex_Mono]">
                avg score: 4.2/10
              </span>
            </div>
          </section>

          <section className="flex flex-col gap-5 w-full">
            {leaderboardEntries.map((entry) => (
              <LeaderboardEntry
                key={entry.rank}
                rank={entry.rank}
                score={entry.score}
                language={entry.language}
                lines={entry.lines}
                code={entry.code}
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
