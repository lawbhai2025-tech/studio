
'use client';

import Link from "next/link";
import { Button } from "../ui/button";
import { User, Menu, Globe, Check } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useTranslation } from "@/hooks/use-translation";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, setLanguage, language } = useTranslation('header');
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {t('title')}
              </h1>
              <p className="text-xs text-gray-500">{t('subtitle')}</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/">{t('nav.home')}</NavLink>
          <NavLink href="/advisory">{t('nav.cropProtection')}</NavLink>
          <NavLink href="/schemes">{t('nav.govSchemes')}</NavLink>
          <NavLink href="/chatbot">{t('nav.chatbot')}</NavLink>
          <NavLink href="/weather">{t('nav.weather')}</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                {language === 'en' && <Check className="w-4 h-4 mr-2" />}
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ml')}>
                {language === 'ml' && <Check className="w-4 h-4 mr-2" />}
                മലയാളം
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User />
              </Button>
            </Link>
            <Button className="bg-green-600 hover:bg-green-700">{t('downloadApp')}</Button>
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
                    <NavLink href="/">{t('nav.home')}</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/advisory">{t('nav.cropProtection')}</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/schemes">{t('nav.govSchemes')}</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/chatbot">{t('nav.chatbot')}</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/weather">{t('nav.weather')}</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink href="/profile">{t('nav.profile')}</NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="bg-green-600 hover:bg-green-700 w-full justify-start">{t('downloadApp')}</Button>
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
