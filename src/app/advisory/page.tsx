
import { CropAdvice } from "@/components/features/crop-advice";
import { Header } from "@/components/layout/header";
import { Leaf } from "lucide-react";

export default function AdvisoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Crop Protection
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Get instant, AI-powered advice to protect your crops.
              </p>
            </div>
            <CropAdvice />
          </div>
        </div>
      </main>
    </div>
  );
}
