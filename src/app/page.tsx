import { HomeMetricsSection } from "@/components/home-metrics-section";
import { HomePage } from "@/components/home-page";

export default function Page() {
  return <HomePage metrics={<HomeMetricsSection />} />;
}
