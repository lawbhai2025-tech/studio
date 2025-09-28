
import { SchemeRecommendations } from "@/components/features/scheme-recommendations";
import { Header } from "@/components/layout/header";

export default function SchemesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
             <SchemeRecommendations />
          </div>
        </div>
      </main>
    </div>
  );
}
