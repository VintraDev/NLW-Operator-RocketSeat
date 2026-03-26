import { createTRPCRouter } from "../init";
import { leaderboardRouter } from "./leaderboard";
import { metricsRouter } from "./metrics";

export const appRouter = createTRPCRouter({
  leaderboard: leaderboardRouter,
  metrics: metricsRouter,
});

export type AppRouter = typeof appRouter;
