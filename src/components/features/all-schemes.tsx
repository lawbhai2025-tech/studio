
'use client';

import { useState } from 'react';
import { schemesData, type Scheme } from "@/lib/schemes-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';

export function AllSchemes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Central Sector Scheme', 'Centrally Sponsored Scheme'];

  const filteredSchemes = schemesData
    .filter(scheme =>
      selectedCategory === 'All' || scheme.category === selectedCategory
    )
    .filter(scheme =>
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Input
          placeholder="Search for schemes..."
          className="w-full md:flex-1"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-medium hidden sm:inline">Filter:</span>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{scheme.name}</CardTitle>
              <CardDescription>
                <Badge variant={scheme.category === 'Central Sector Scheme' ? 'secondary' : 'default'}>
                  {scheme.category}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-gray-700">{scheme.purpose}</p>
            </CardContent>
            <CardFooter>
                <Button variant="link" className="p-0">Learn More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredSchemes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-semibold">No schemes found</p>
            <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
