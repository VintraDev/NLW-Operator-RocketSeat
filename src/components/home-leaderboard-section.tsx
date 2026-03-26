import { Suspense } from "react";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { HomeLeaderboard } from "./home-leaderboard";
import { HomeLeaderboardSkeleton } from "./home-leaderboard-skeleton";

export function HomeLeaderboardSection() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.leaderboard.homepage.queryOptions());

  return (
    <HydrateClient>
      <Suspense fallback={<HomeLeaderboardSkeleton />}>
        <HomeLeaderboard />
      </Suspense>
    </HydrateClient>
  );
}
