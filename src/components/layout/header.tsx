import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4 border-b bg-card">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Logo className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-foreground">
            Krishi Sahayak
          </h1>
        </Link>
        <p className="text-sm text-muted-foreground hidden md:block">
          Your 24/7 Digital Krishi Officer
        </p>
      </div>
      <nav>
        <Button asChild variant="ghost">
          <Link href="/chatbot">Chatbot</Link>
        </Button>
      </nav>
    </header>
  );
}
