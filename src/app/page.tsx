import { Header } from "@/components/layout/header";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import { MandiPrices } from "@/components/dashboard/mandi-prices";
import { AIAdvisory } from "@/components/dashboard/ai-advisory";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <WeatherWidget />
            <MandiPrices />
          </div>
          <div className="lg:col-span-2">
            <AIAdvisory />
          </div>
        </div>
      </main>
    </div>
  );
}
