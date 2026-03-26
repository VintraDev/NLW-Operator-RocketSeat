import { z } from "zod";
import { getHomepageLeaderboard } from "@/db/queries";
import { baseProcedure, createTRPCRouter } from "../init";

export const leaderboardRouter = createTRPCRouter({
  homepage: baseProcedure
    .output(
      z.object({
        entries: z.array(
          z.object({
            rank: z.number().int().positive(),
            score: z.number().int().min(1).max(10),
            code: z.string(),
            fullCode: z.string(),
            language: z.string(),
          }),
        ),
        stats: z.object({
          totalCodes: z.number().int().nonnegative(),
          totalRoasts: z.number().int().nonnegative(),
        }),
      }),
    )
    .query(async () => {
      return getHomepageLeaderboard();
    }),
});
