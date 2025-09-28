
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mandiPrices } from "@/lib/data";
import { LineChart, TrendingUp, TrendingDown, IndianRupee } from "lucide-react";

export function MandiPrices() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="w-6 h-6 text-green-600" />
          Daily Mandi Prices
        </CardTitle>
        <CardDescription>Live prices from your local agricultural market.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead className="text-right">Price Range (per Quintal)</TableHead>
              <TableHead className="text-right font-semibold">Modal Price (per Quintal)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mandiPrices.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-medium text-gray-800">{item.crop}</p>
                  <p className="text-xs text-gray-500">{item.variety}</p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <div className="flex items-center gap-1 text-red-600">
                      <TrendingDown className="w-4 h-4" /> {item.minPrice}
                    </div>
                    <span>-</span>
                    <div className="flex items-center gap-1 text-green-600">
                      {item.maxPrice} <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-gray-900">
                    <div className="flex items-center justify-end gap-1">
                        <IndianRupee className="w-4 h-4" />
                        <span>{item.modalPrice}</span>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
