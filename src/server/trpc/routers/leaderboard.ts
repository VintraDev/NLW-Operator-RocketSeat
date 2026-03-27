import { z } from "zod";
import { getFullLeaderboard, getHomepageLeaderboard } from "@/db/queries";
import { baseProcedure, createTRPCRouter } from "../init";

const FULL_LEADERBOARD_LIMIT = 20;

const leaderboardEntrySchema = z.object({
  rank: z.number().int().positive(),
  score: z.number().int().min(1).max(10),
  code: z.string(),
  fullCode: z.string(),
  language: z.string(),
});

export const leaderboardRouter = createTRPCRouter({
  homepage: baseProcedure
    .output(
      z.object({
        entries: z.array(leaderboardEntrySchema),
        stats: z.object({
          totalCodes: z.number().int().nonnegative(),
          totalRoasts: z.number().int().nonnegative(),
        }),
      }),
    )
    .query(async () => {
      return getHomepageLeaderboard();
    }),
  full: baseProcedure
    .output(
      z.object({
        entries: z.array(leaderboardEntrySchema),
        stats: z.object({
          totalCodes: z.number().int().nonnegative(),
          avgScore: z.number().min(0).max(10),
        }),
      }),
    )
    .query(async () => {
      return getFullLeaderboard(FULL_LEADERBOARD_LIMIT);
    }),
});
