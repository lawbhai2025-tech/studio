
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Logo className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Krishimitram
              </h1>
              <p className="text-xs text-gray-500">Kerala Agricultural Assistant</p>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/advisory">AI Advisory</NavLink>
          <NavLink href="/advisory">Gov Schemes</NavLink>
          <NavLink href="/chatbot">Chatbot</NavLink>
          <NavLink href="/weather">Weather</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden lg:flex">Officer Dashboard</Button>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User />
            </Button>
          </Link>
          <Button className="bg-green-600 hover:bg-green-700">Download App</Button>
        </div>
      </div>
    </header>
  );
}

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-1">
    {children}
  </Link>
)
