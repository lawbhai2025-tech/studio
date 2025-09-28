
import { Header } from "@/components/layout/header";
import { WeatherCard } from "@/components/features/weather-card";
import { WeeklyForecast } from "@/components/features/weekly-forecast";
import { AgriculturalAdvisory } from "@/components/features/agricultural-advisory";

export default function WeatherPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Weather Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Live weather updates and advisories for your farm.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <WeatherCard />
              <WeeklyForecast />
            </div>
            <div className="lg:col-span-1">
              <AgriculturalAdvisory />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
