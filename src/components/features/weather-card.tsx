
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const initialWeatherData = {
  condition: 'Loading...',
  temperature: '--°C',
  humidity: '--%',
  windSpeed: '-- km/h',
  alert: 'Loading weather data...',
  icon: '⏳',
  alertType: 'info',
  background: 'from-gray-300 via-slate-400 to-gray-500',
  overlay: 'bg-gray-50/70'
};


export function WeatherCard({ className = "" }) {
  const [currentWeather, setCurrentWeather] = useState('cloudy');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [isClient, setIsClient] = useState(false);

  const weatherConditions = ['sunny', 'cloudy', 'rain', 'storm'];

  useEffect(() => {
    setIsClient(true);
    
    const updateWeatherData = () => {
      const date = new Date();
      setCurrentTime(date);
      
      const hour = date.getHours();
      const month = date.getMonth();
      const isRainySeason = month >= 5 && month <= 9;

      const getRealisticTemp = (baseTemp: number) => {
        const hourVariation = Math.sin(((hour - 6) * Math.PI) / 12) * 5;
        const randomVariation = (Math.random() - 0.5) * 4;
        return Math.round(baseTemp + hourVariation + randomVariation);
      };

      const newWeatherData = {
        sunny: {
          condition: 'Sunny',
          temperature: `${getRealisticTemp(isRainySeason ? 30 : 33)}°C`,
          humidity: `${Math.round(40 + Math.random() * 20)}%`,
          windSpeed: `${Math.round(5 + Math.random() * 10)} km/h`,
          alert: hour < 10 
            ? 'Perfect morning weather for field work and spraying' 
            : hour > 15 
            ? 'Hot afternoon - avoid heavy work, ensure adequate hydration'
            : 'Ideal conditions for transplanting and harvesting',
          icon: '☀️',
          alertType: 'success',
          background: 'from-yellow-300 via-orange-300 to-red-300',
          overlay: 'bg-yellow-50/70'
        },
        rain: {
          condition: isRainySeason ? 'Monsoon Rain' : 'Light Rain',
          temperature: `${getRealisticTemp(26)}°C`,
          humidity: `${Math.round(75 + Math.random() * 20)}%`,
          windSpeed: `${Math.round(10 + Math.random() * 15)} km/h`,
          alert: isRainySeason 
            ? 'Monsoon active - postpone pesticide application, check drainage systems'
            : 'Light rain beneficial for crops - good time for organic fertilizer application',
          icon: '🌧️',
          alertType: 'warning',
          background: 'from-slate-500 via-blue-600 to-slate-700',
          overlay: 'bg-blue-50/75'
        },
        cloudy: {
          condition: 'Partly Cloudy',
          temperature: `${getRealisticTemp(29)}°C`,
          humidity: `${Math.round(60 + Math.random() * 20)}%`,
          windSpeed: `${Math.round(8 + Math.random() * 10)} km/h`,
          alert: 'Excellent conditions for transplanting - reduced heat stress on seedlings',
          icon: '⛅',
          alertType: 'info',
          background: 'from-gray-300 via-slate-400 to-gray-500',
          overlay: 'bg-gray-50/70'
        },
        storm: {
          condition: 'Thunderstorm',
          temperature: `${getRealisticTemp(24)}°C`,
          humidity: `${Math.round(85 + Math.random() * 10)}%`,
          windSpeed: `${Math.round(25 + Math.random() * 20)} km/h`,
          alert: 'Severe weather alert! Secure loose equipment, avoid open fields, check livestock shelter',
          icon: '⛈️',
          alertType: 'danger',
          background: 'from-slate-800 via-gray-900 to-black',
          overlay: 'bg-slate-50/60'
        }
      };
      setWeatherData(newWeatherData[currentWeather as keyof typeof newWeatherData] || newWeatherData.cloudy);
    }
    
    // Initial update
    updateWeatherData();
    setCurrentWeather('sunny');

    // Cycle through weather conditions for demo
    const weatherInterval = setInterval(() => {
      setCurrentWeather(prevWeather => {
        const currentIndex = weatherConditions.indexOf(prevWeather);
        const nextIndex = (currentIndex + 1) % weatherConditions.length;
        return weatherConditions[nextIndex];
      });
    }, 5000);
    
    // Update data every cycle
    const dataInterval = setInterval(updateWeatherData, 5000);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
      clearInterval(dataInterval);
    };
  }, [currentWeather]);
  
  const currentWeatherData = isClient ? weatherData : initialWeatherData;

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-orange-500 text-orange-700';
      case 'success':
        return 'border-l-green-500 text-green-700';
      case 'danger':
        return 'border-l-red-500 text-red-700';
      default:
        return 'border-l-blue-500 text-blue-700';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-IN', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const renderWeatherAnimation = () => {
    if (!isClient) return null;

    switch (currentWeather) {
      case 'rain':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(Math.round(35 + Math.random() * 45))].map((_, i) => {
              const size = Math.random() * 2 + 1;
              const length = Math.random() * 15 + 8;
              return (
                <div
                  key={i}
                  className="absolute animate-rain"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${Math.random() * 0.8 + 0.4}s`,
                  }}
                >
                  <div
                    className="bg-gradient-to-b from-blue-200/80 via-blue-300/70 to-blue-400/60 rounded-full shadow-sm"
                    style={{
                      width: `${size}px`,
                      height: `${length}px`,
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 bg-gradient-to-b from-white/50 to-transparent rounded-full"
                    style={{
                      width: `${size * 0.6}px`,
                      height: `${length * 0.3}px`,
                    }}
                  />
                </div>
              );
            })}
            {[...Array(8)].map((_, i) => (
              <div
                key={`splash-${i}`}
                className="absolute bottom-0 w-2 h-0.5 bg-blue-200/40 rounded-full animate-rain-splash"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        );
      case 'cloudy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-2 left-0 w-16 h-8 animate-cloud-move">
              <div className="w-full h-full bg-gradient-to-b from-white/40 to-gray-200/30 rounded-full shadow-lg"></div>
              <div className="absolute bottom-0 left-1 w-14 h-2 bg-gray-300/20 rounded-full blur-sm"></div>
            </div>
            <div className="absolute top-6 left-1/3 w-12 h-6 animate-cloud-move-slow">
              <div className="w-full h-full bg-gradient-to-b from-white/35 to-gray-100/25 rounded-full shadow-md"></div>
              <div className="absolute bottom-0 left-0.5 w-10 h-1.5 bg-gray-200/15 rounded-full blur-sm"></div>
            </div>
            <div className="absolute top-1 right-1/4 w-20 h-10 animate-cloud-move-reverse">
              <div className="w-full h-full bg-gradient-to-b from-white/45 to-gray-200/35 rounded-full shadow-lg"></div>
              <div className="absolute bottom-0 left-2 w-16 h-2.5 bg-gray-300/25 rounded-full blur-sm"></div>
            </div>
          </div>
        );
      case 'sunny':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-3 right-3 w-12 h-12">
              <div className="w-full h-full bg-gradient-to-br from-yellow-200 via-orange-300 to-yellow-400 rounded-full shadow-lg animate-pulse-slow"></div>
              <div className="absolute inset-1 bg-gradient-to-br from-white/60 via-yellow-100/40 to-transparent rounded-full"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-yellow-200/30 via-orange-200/20 to-transparent rounded-full blur-md"></div>
            </div>
            
            <div className="absolute top-4 right-4 w-8 h-8 animate-spin-slow">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="absolute origin-bottom">
                  <div
                    className="w-1.5 bg-gradient-to-t from-yellow-300/70 via-yellow-200/50 to-transparent shadow-sm"
                    style={{
                      height: `${6 + Math.random() * 8}px`,
                      transform: `rotate(${i * 30}deg)`,
                      transformOrigin: '50% 100%'
                    }}
                  />
                </div>
              ))}
            </div>
            
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              >
                <div className="w-1.5 h-1.5 bg-gradient-to-br from-white via-yellow-100 to-yellow-200 rounded-full shadow-sm"></div>
                <div className="absolute inset-0 w-3 h-3 bg-yellow-100/20 rounded-full blur-sm -translate-x-0.5 -translate-y-0.5"></div>
              </div>
            ))}
            
            {[...Array(6)].map((_, i) => (
              <div
                key={`shimmer-${i}`}
                className="absolute w-full h-8 bg-gradient-to-r from-transparent via-yellow-100/10 to-transparent animate-heat-shimmer"
                style={{
                  top: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        );
      case 'storm':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 animate-lightning">
              <div className="absolute top-0 left-1/3 w-0.5 h-16 bg-gradient-to-b from-white via-blue-100 to-transparent shadow-lg transform -skew-x-12"></div>
              <div className="absolute top-8 left-1/3 w-0.5 h-12 bg-gradient-to-b from-white/80 via-purple-100/60 to-transparent transform skew-x-6 translate-x-2"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-blue-100/10 to-transparent"></div>
            </div>
            
            {[...Array(90)].map((_, i) => {
              const size = Math.random() * 1.5 + 0.8;
              const length = Math.random() * 25 + 15;
              return (
                <div
                  key={i}
                  className="absolute animate-heavy-rain"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1}s`,
                    animationDuration: `${Math.random() * 0.4 + 0.2}s`
                  }}
                >
                  <div
                    className="bg-gradient-to-b from-gray-200/90 via-blue-200/80 to-blue-300/70 rounded-full shadow-md"
                    style={{
                      width: `${size}px`,
                      height: `${length}px`,
                      transform: 'skew(-15deg)',
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 bg-gradient-to-b from-white/60 via-white/30 to-transparent rounded-full"
                    style={{
                      width: `${size * 0.4}px`,
                      height: `${length * 0.5}px`,
                    }}
                  />
                </div>
              );
            })}
            
            <div className="absolute top-0 left-0 w-32 h-16 animate-cloud-move-slow">
              <div className="w-full h-full bg-gradient-to-b from-gray-600/40 via-gray-700/30 to-gray-800/20 rounded-full shadow-2xl"></div>
              <div className="absolute bottom-0 left-4 w-24 h-4 bg-gray-800/15 rounded-full blur-md"></div>
            </div>
            
            {[...Array(12)].map((_, i) => (
              <div
                key={`wind-${i}`}
                className="absolute w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent animate-wind-gust transform -skew-x-12"
                style={{
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 60 + 20}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        );
      case 'snow':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-snow"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`shadow-lg ${className}`}>
      <Card className={`border-l-4 ${getAlertStyles(currentWeatherData.alertType)} relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${currentWeatherData.background} opacity-20`}></div>
        <div className={`absolute inset-0 ${currentWeatherData.overlay}`}></div>
        
        {renderWeatherAnimation()}

        <CardContent className="p-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentWeatherData.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">Weather Advisory</p>
                {isClient && <Badge variant="outline" className="text-xs">
                  Palakkad • {formatTime(currentTime)}
                </Badge>}
              </div>
              <p className="text-sm mt-1">{currentWeatherData.alert}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentWeatherData.background} opacity-10`}></div>
        <div className={`absolute inset-0 ${currentWeatherData.overlay}`}></div>
        
        {renderWeatherAnimation()}

        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-2xl">{currentWeatherData.icon}</span>
                Palakkad District Weather
              </h3>
              <p className="text-3xl font-bold mt-2 text-gray-800">{currentWeatherData.temperature}</p>
              <p className="text-sm text-gray-600">{currentWeatherData.condition}</p>
              {isClient && <p className="text-xs text-gray-500 mt-1">Last updated: {formatTime(currentTime)}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">Humidity</p>
              <p className="font-bold text-lg text-blue-600">{currentWeatherData.humidity}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">Wind Speed</p>
              <p className="font-bold text-lg text-green-600">{currentWeatherData.windSpeed}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">Condition</p>
              <Badge variant="outline" className="text-xs font-medium">
                {currentWeatherData.condition}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
