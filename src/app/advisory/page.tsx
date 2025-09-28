
import { CropAdvice } from "@/components/features/crop-advice";
import { SchemeRecommendations } from "@/components/features/scheme-recommendations";
import { Header } from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Award } from "lucide-react";

export default function AdvisoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                AI Advisory
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Get instant, personalized advice powered by AI.
              </p>
            </div>

            <Tabs defaultValue="crop-advice" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="crop-advice">
                  <Leaf className="w-4 h-4 mr-2" />
                  Crop Disease Prediction
                </TabsTrigger>
                <TabsTrigger value="scheme-recommendations">
                  <Award className="w-4 h-4 mr-2" />
                  Scheme Recommendations
                </TabsTrigger>
              </TabsList>
              <TabsContent value="crop-advice">
                <CropAdvice />
              </TabsContent>
              <TabsContent value="scheme-recommendations">
                <SchemeRecommendations />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
