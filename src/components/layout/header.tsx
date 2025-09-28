
import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { Button } from "../ui/button";
import { User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/advisory">AI Advisory</NavLink>
          <NavLink href="/schemes">Gov Schemes</NavLink>
          <NavLink href="/chatbot">Chatbot</NavLink>
          <NavLink href="/weather">Weather</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User />
              </Button>
            </Link>
            <Button className="bg-green-600 hover:bg-green-700">Download App</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <SheetClose asChild>
                    <NavLink href="/">Home</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/advisory">AI Advisory</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/schemes">Gov Schemes</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/chatbot">Chatbot</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/weather">Weather</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/profile">Profile</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="bg-green-600 hover:bg-green-700 w-full justify-start">Download App</Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const NavLink = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
  <Link href={href} className={cn("px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-1", className)}>
    {children}
  </Link>
);

import { cn } from "@/lib/utils";
