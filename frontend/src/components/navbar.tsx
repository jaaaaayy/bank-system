"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import scrollToSection from "@/hooks/use-scroll-to-section";
import { navbarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Box, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const authButtons: {
  variant: "outline" | "default";
  href: string;
  name: string;
}[] = [
  { variant: "outline", href: "/login", name: "Log in" },
  { variant: "default", href: "/register", name: "Register" },
];

const Navbar = () => {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsBlurred(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`h-14 lg:h-16 p-4 lg:px-6 sticky top-0 z-10 ${
        isBlurred ? "bg-background/50 backdrop-blur-lg" : "bg-background"
      }`}
    >
      <nav className="hidden justify-between md:flex">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold">Jay Bank</div>
          <div className="flex items-center">
            {navbarLinks.map(({ id, name }, index) => (
              <Button
                key={index}
                className="text-muted-foreground"
                variant="ghost"
                onClick={() => scrollToSection(id)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {authButtons.map(({ variant, href, name }, index) => (
            <Link
              key={index}
              className={cn(
                buttonVariants({
                  variant: variant,
                })
              )}
              href={href}
            >
              {name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="block md:hidden">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-500">Jay Bank</div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <Box />
                    <span className="text-2xl font-bold">Bank</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="mb-8 mt-8 px-4 flex flex-col gap-4">
                {navbarLinks.map(({ id, name }, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-start"
                    onClick={() => scrollToSection(id)}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div className="mt-2 px-4 flex flex-col gap-3">
                {authButtons.map(({ variant, href, name }, index) => (
                  <Link
                    key={index}
                    className={cn(
                      buttonVariants({
                        variant: variant,
                      })
                    )}
                    href={href}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
