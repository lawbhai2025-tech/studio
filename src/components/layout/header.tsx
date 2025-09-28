import { Logo } from "@/components/icons/logo";

export function Header() {
  return (
    <header className="flex items-center gap-4 p-4 border-b bg-card">
      <div className="flex items-center gap-2 text-primary">
        <Logo className="w-8 h-8" />
        <h1 className="text-2xl font-bold text-foreground">
          Krishi Sahayak
        </h1>
      </div>
      <p className="text-sm text-muted-foreground hidden md:block">
        Your 24/7 Digital Krishi Officer
      </p>
    </header>
  );
}
