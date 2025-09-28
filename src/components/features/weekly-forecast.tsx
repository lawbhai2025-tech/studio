
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addDays, format } from 'date-fns';
import { Sun, Cloud, CloudRain, CloudLightning, Wind, Droplets, CloudSun } from 'lucide-react';

const weatherIcons = {
  Sunny: <Sun className="w-6 h-6 text-yellow-500" />,
  'Partly Cloudy': <CloudSun className="w-6 h-6 text-gray-500" />,
  Cloudy: <Cloud className="w-6 h-6 text-gray-400" />,
  Rain: <CloudRain className="w-6 h-6 text-blue-500" />,
  Thunderstorm: <CloudLightning className="w-6 h-6 text-purple-500" />,
};

const weeklyForecastData = [
  { day: 0, condition: 'Sunny', temp: '32°/24°', rain: 10, wind: 12 },
  { day: 1, condition: 'Partly Cloudy', temp: '31°/25°', rain: 20, wind: 15 },
  { day: 2, condition: 'Cloudy', temp: '29°/24°', rain: 40, wind: 18 },
  { day: 3, condition: 'Rain', temp: '27°/23°', rain: 80, wind: 22 },
  { day: 4, condition: 'Thunderstorm', temp: '26°/22°', rain: 90, wind: 25 },
  { day: 5, condition: 'Rain', temp: '28°/23°', rain: 70, wind: 20 },
  { day: 6, condition: 'Partly Cloudy', temp: '30°/24°', rain: 30, wind: 16 },
];

export function WeeklyForecast() {
  const today = new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weeklyForecastData.map((forecast) => (
            <div
              key={forecast.day}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
            >
              <div className="w-1/4">
                <p className="font-medium">
                  {format(addDays(today, forecast.day), 'EEEE')}
                </p>
                <p className="text-sm text-gray-500">
                  {format(addDays(today, forecast.day), 'MMM d')}
                </p>
              </div>
              <div className="w-1/4 flex items-center justify-center gap-2">
                {weatherIcons[forecast.condition as keyof typeof weatherIcons]}
                <span className="hidden sm:inline">{forecast.condition}</span>
              </div>
              <div className="w-1/4 text-center font-medium">{forecast.temp}</div>
              <div className="w-1/4 space-y-1 text-right text-sm">
                <div className="flex items-center justify-end gap-1.5 text-blue-500">
                  <Droplets className="w-4 h-4" />
                  <span>{forecast.rain}%</span>
                </div>
                <div className="flex items-center justify-end gap-1.5 text-gray-500">
                  <Wind className="w-4 h-4" />
                  <span>{forecast.wind} km/h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

