import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CropAdviceForm } from "./crop-advice-form";
import { SchemeRecommendationsForm } from "./scheme-recommendations-form";
import { Leaf, Handshake } from "lucide-react";

export function AIAdvisory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Disease Prediction</CardTitle>
        <CardDescription>
          Get instant, personalized predictions powered by AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crop-advice">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="crop-advice">
              <Leaf className="mr-2 h-4 w-4" />
              Crop Advice
            </TabsTrigger>
            <TabsTrigger value="scheme-recommendations">
              <Handshake className="mr-2 h-4 w-4" />
              Scheme Recommendations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="crop-advice" className="mt-4">
            <CropAdviceForm />
          </TabsContent>
          <TabsContent value="scheme-recommendations" className="mt-4">
            <SchemeRecommendationsForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
