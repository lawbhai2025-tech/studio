
import { AllSchemes } from "@/components/features/all-schemes";
import { Header } from "@/components/layout/header";

export default function SchemesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Government Schemes for Farmers
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              An overview of central and centrally sponsored schemes for agricultural welfare.
            </p>
          </div>
          <AllSchemes />
        </div>
      </main>
    </div>
  );
}
