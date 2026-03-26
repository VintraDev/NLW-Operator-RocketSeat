import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { HomeMetrics } from "./home-metrics";

export function HomeMetricsSection() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.metrics.homepage.queryOptions());

  return (
    <HydrateClient>
      <HomeMetrics />
    </HydrateClient>
  );
}
