
import { Header } from "@/components/layout/header";
import { WeatherCard } from "@/components/features/weather-card";

export default function WeatherPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Weather Dashboard
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Live weather updates and advisories for your farm.
              </p>
            </div>
            <WeatherCard />
          </div>
        </div>
      </main>
    </div>
  );
}
