
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { weatherData } from "@/lib/data";
import { Cloud, Droplets, Gauge, MapPin, Wind } from "lucide-react";

export function WeatherCard() {
  const { current, forecast } = weatherData;
  const Icon = current.icon;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-6 h-6 text-blue-500" />
          Weather Advisory
        </CardTitle>
        <CardDescription>Current conditions and 5-day forecast for your area.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-inner">
          <div className="flex justify-between items-start">
            <div>
              <p className="flex items-center gap-1 text-lg">
                <MapPin className="w-5 h-5" />
                {current.location}
              </p>
              <p className="text-7xl font-bold">{current.temp}°C</p>
              <p className="text-lg font-medium">{current.condition}</p>
            </div>
            <Icon className="w-24 h-24 text-white/80" />
          </div>
          <div className="mt-6 pt-4 border-t border-white/20 grid grid-cols-3 gap-4 text-center text-sm">
            <div className="flex flex-col items-center">
              <Droplets className="w-5 h-5 mb-1" />
              <span className="font-bold">{current.details.humidity}</span>
              <span>Humidity</span>
            </div>
            <div className="flex flex-col items-center">
              <Wind className="w-5 h-5 mb-1" />
              <span className="font-bold">{current.details.wind}</span>
              <span>Wind</span>
            </div>
            <div className="flex flex-col items-center">
              <Gauge className="w-5 h-5 mb-1" />
              <span className="font-bold">{current.details.precipitation}</span>
              <span>Precipitation</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-gray-700">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-2 text-center">
            {forecast.map((day, index) => {
              const DayIcon = day.icon;
              return (
                <div key={index} className="p-3 rounded-md bg-gray-100">
                  <p className="font-bold text-sm text-gray-800">{day.day}</p>
                  <DayIcon className="w-8 h-8 mx-auto my-1 text-gray-600" />
                  <p className="text-sm text-gray-700">{day.temp}°</p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
