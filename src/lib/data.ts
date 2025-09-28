import { Sun, Cloudy, CloudRain, Wind } from 'lucide-react';

export const weatherData = {
  current: {
    temp: 28,
    condition: 'Sunny',
    icon: Sun,
    location: 'Bhopal, MP',
    details: {
      humidity: '65%',
      wind: '10 km/h',
      precipitation: '5%',
    },
  },
  forecast: [
    { day: 'Mon', temp: 30, icon: Sun },
    { day: 'Tue', temp: 29, icon: Cloudy },
    { day: 'Wed', temp: 27, icon: CloudRain },
    { day: 'Thu', temp: 31, icon: Sun },
    { day: 'Fri', temp: 28, icon: Cloudy },
  ],
};

export const mandiPrices = [
  { crop: 'Wheat', variety: 'Lokwan', minPrice: 2200, maxPrice: 2500, modalPrice: 2350 },
  { crop: 'Soybean', variety: 'JS-9560', minPrice: 4200, maxPrice: 4500, modalPrice: 4350 },
  { crop: 'Gram', variety: 'Vishal', minPrice: 5000, maxPrice: 5400, modalPrice: 5200 },
  { crop: 'Maize', variety: 'Hybrid', minPrice: 1800, maxPrice: 2100, modalPrice: 1950 },
  { crop: 'Paddy', variety: 'Basmati', minPrice: 3200, maxPrice: 3800, modalPrice: 3500 },
];
