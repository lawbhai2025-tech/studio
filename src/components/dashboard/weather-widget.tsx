import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { weatherData } from "@/lib/data";
import { Thermometer, Wind, Droplets } from "lucide-react";

export function WeatherWidget() {
  const { current, forecast } = weatherData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Update</CardTitle>
        <CardDescription>{current.location}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <current.icon className="w-16 h-16 text-accent" />
            <div>
              <p className="text-5xl font-bold">{current.temp}°C</p>
              <p className="text-muted-foreground">{current.condition}</p>
            </div>
          </div>
          <div className="text-right space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 justify-end">
              <Droplets className="w-4 h-4" />
              <span>Humidity: {current.details.humidity}</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Wind className="w-4 h-4" />
              <span>Wind: {current.details.wind}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">5-Day Forecast</h4>
          <div className="flex justify-between gap-2">
            {forecast.map((day) => (
              <div key={day.day} className="flex flex-col items-center p-2 rounded-lg bg-secondary/50 w-full">
                <p className="font-medium text-sm">{day.day}</p>
                <day.icon className="w-8 h-8 my-1 text-accent" />
                <p className="text-sm">{day.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
