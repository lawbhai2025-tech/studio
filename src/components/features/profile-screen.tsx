'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileScreen() {
  const [editMode, setEditMode] = useState(false);

  const farmerProfile = {
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    location: "Palakkad, Kerala",
    languages: ["Malayalam", "English", "Hindi"],
    farmSize: "5 acres",
    crops: ["Rice", "Coconut", "Pepper"],
    experience: "15 years",
    joinedDate: "Jan 2023",
    totalQueries: 47,
    resolvedQueries: 42,
    satisfactionRating: 4.8
  };

  const farmHistory = [
    { season: "Kharif 2024", crop: "Rice", variety: "Jyothi", area: "3 acres", yield: "65 quintal", status: "Harvested" },
    { season: "Rabi 2024", crop: "Coconut", variety: "Dwarf Green", area: "2 acres", yield: "8000 nuts", status: "Active" },
    { season: "Kharif 2023", crop: "Rice", variety: "Ponni", area: "3 acres", yield: "58 quintal", status: "Harvested" }
  ];

  const achievements = [
    { title: "Early Adopter", description: "First 100 farmers on platform", icon: "🏆" },
    { title: "Active Learner", description: "50+ queries resolved", icon: "📚" },
    { title: "Community Helper", description: "Helped 10+ fellow farmers", icon: "🤝" },
    { title: "Tech Savvy", description: "Uses all platform features", icon: "💻" }
  ];

  const preferences = {
    notifications: {
      weather: true,
      market: true,
      expert: true,
      community: false
    },
    communication: "voice", // voice, sms, app
    language: "malayalam",
    location_sharing: true
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                {farmerProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{farmerProfile.name}</h1>
                <p className="text-gray-600">{farmerProfile.location}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800">{farmerProfile.experience} Experience</Badge>
                  <Badge className="bg-blue-100 text-blue-800">{farmerProfile.farmSize}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Button 
                variant={editMode ? "default" : "outline"} 
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Save Profile" : "Edit Profile"}
              </Button>
              <p className="text-sm text-gray-600 mt-2">Member since {farmerProfile.joinedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{farmerProfile.totalQueries}</div>
            <div className="text-sm text-gray-600">Total Queries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{farmerProfile.resolvedQueries}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{farmerProfile.satisfactionRating}⭐</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">89%</div>
            <div className="text-sm text-gray-600">Auto-Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Farm Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌾 Farm Profile Memory
            <Badge className="bg-blue-100 text-blue-800 text-xs">AI Personalization</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Farm Size</Label>
                <Input defaultValue={farmerProfile.farmSize} disabled={!editMode} />
              </div>
              <div>
                <Label>Primary Crops</Label>
                <div className="flex gap-2 mt-1">
                  {farmerProfile.crops.map((crop, index) => (
                    <Badge key={index} variant="outline">{crop}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Languages</Label>
                <div className="flex gap-2 mt-1">
                  {farmerProfile.languages.map((lang, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800">{lang}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Contact Number</Label>
                <Input defaultValue={farmerProfile.phone} disabled={!editMode} />
              </div>
              <div>
                <Label>Location</Label>
                <Input defaultValue={farmerProfile.location} disabled={!editMode} />
              </div>
              <div>
                <Label>Farming Experience</Label>
                <Input defaultValue={farmerProfile.experience} disabled={!editMode} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Crop History & Performance
            <Badge variant="outline" className="text-xs">Stored for Personalization</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {farmHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{record.season}</h4>
                    <Badge 
                      variant={record.status === 'Active' ? 'default' : 'outline'}
                      className={record.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {record.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{record.crop} - {record.variety} • {record.area}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{record.yield}</p>
                  <p className="text-sm text-gray-600">Yield</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>🏆 Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h4 className="font-semibold text-yellow-800">{achievement.title}</h4>
                  <p className="text-sm text-yellow-700">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚙️ Communication Preferences
            <Badge className="bg-purple-100 text-purple-800 text-xs">Inclusive Access</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Preferred Communication Method</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <Card className={`cursor-pointer ${preferences.communication === 'app' ? 'ring-2 ring-blue-500' : ''}`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-medium">Smartphone App</div>
                  <div className="text-xs text-gray-600">Full features</div>
                </CardContent>
              </Card>
              <Card className={`cursor-pointer ${preferences.communication === 'voice' ? 'ring-2 ring-blue-500' : ''}`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📞</div>
                  <div className="font-medium">Voice Call (IVR)</div>
                  <div className="text-xs text-gray-600">Malayalam support</div>
                </CardContent>
              </Card>
              <Card className={`cursor-pointer ${preferences.communication === 'sms' ? 'ring-2 ring-blue-500' : ''}`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="font-medium">SMS</div>
                  <div className="text-xs text-gray-600">Feature phone</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Notification Preferences</h4>
            <div className="space-y-2">
              {Object.entries(preferences.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 border rounded">
                  <span className="capitalize">{key.replace('_', ' ')} Alerts</span>
                  <Badge variant={value ? "default" : "outline"}>
                    {value ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support & Help */}
      <Card>
        <CardHeader>
          <CardTitle>🆘 Support & Help</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Button variant="outline" className="h-16 flex-col gap-1">
            <span className="text-xl">📞</span>
            <span>24×7 Helpline</span>
            <span className="text-xs text-gray-600">Malayalam • English • Hindi</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <span className="text-xl">📚</span>
            <span>Training Videos</span>
            <span className="text-xs text-gray-600">Learn platform features</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <span className="text-xl">👥</span>
            <span>Community Forum</span>
            <span className="text-xs text-gray-600">Connect with farmers</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <span className="text-xl">💡</span>
            <span>Feature Requests</span>
            <span className="text-xs text-gray-600">Suggest improvements</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
