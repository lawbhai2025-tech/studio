
import { ProfileScreen } from "@/components/features/profile-screen";
import { Header } from "@/components/layout/header";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <ProfileScreen />
      </main>
    </div>
  );
}
