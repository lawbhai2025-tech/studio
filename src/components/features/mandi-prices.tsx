
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
              <TableHead className="text-right">Min Price</TableHead>
              <TableHead className="text-right">Max Price</TableHead>
              <TableHead className="text-right font-semibold">Modal Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mandiPrices.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-medium text-gray-800">{item.crop}</p>
                  <p className="text-xs text-gray-500">{item.variety}</p>
                </TableCell>
                <TableCell className="text-right text-red-600 flex items-center justify-end gap-1">
                  <TrendingDown className="w-4 h-4" /> {item.minPrice}
                </TableCell>
                <TableCell className="text-right text-green-600 flex items-center justify-end gap-1">
                  <TrendingUp className="w-4 h-4" /> {item.maxPrice}
                </TableCell>
                <TableCell className="text-right font-bold text-gray-900 flex items-center justify-end gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {item.modalPrice}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
