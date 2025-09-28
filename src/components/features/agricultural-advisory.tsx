
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ShieldCheck, Siren } from 'lucide-react';

const advisoryData = [
  {
    type: 'warning',
    title: 'Pest Alert: Whitefly',
    message: 'Increased humidity raises the risk of whitefly infestation in cotton and vegetable crops. Monitor your fields and consider preventive spraying.',
    icon: <AlertTriangle className="text-orange-500" />,
  },
  {
    type: 'info',
    title: 'Good Irrigation Window',
    message: 'The next 48 hours are ideal for irrigating paddy fields. Lower wind speeds will ensure even water distribution.',
    icon: <ShieldCheck className="text-green-500" />,
  },
  {
    type: 'danger',
    title: 'Heavy Rainfall Expected',
    message: 'Heavy rain is forecast in 3 days. Ensure proper drainage in your fields to prevent waterlogging. Harvest mature crops if possible.',
    icon: <Siren className="text-red-500" />,
  },
  {
    type: 'info',
    title: 'Fertilizer Application',
    message: 'Cloudy conditions tomorrow are suitable for applying nitrogen-based fertilizers to reduce evaporation loss.',
    icon: <ShieldCheck className="text-green-500" />,
  },
];

const getAlertStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-green-50 border-green-200';
      case 'danger':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

export function AgriculturalAdvisory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Farming Advisories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {advisoryData.map((advisory, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getAlertStyles(advisory.type)}`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">{advisory.icon}</div>
                <div>
                  <h4 className="font-semibold">{advisory.title}</h4>
                  <p className="text-sm text-gray-700 mt-1">{advisory.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

