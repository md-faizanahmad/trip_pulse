"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Your List",
    href: "/list",
  },
];

export default function DesktopHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label="TripPulse home"
          className="transition-opacity hover:opacity-80 active:scale-95"
        >
          <Image
            src="/brand/trippulse-logo.png"
            alt="TripPulse"
            width={150}
            height={50}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {/* 
          Note: Since this is DesktopHeader, you might want to hide the entire 
          header on mobile if you have a separate MobileHeader component, 
          but I kept your existing 'hidden md:block' on the nav wrapper. 
        */}
        <nav className="hidden md:block" aria-label="Desktop navigation">
          <div className="flex items-center gap-8">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-(--destination-primary)"
                      : "text-zinc-500 hover:text-(--destination-primary)"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="ml-2 border-l border-zinc-200 pl-6">
              <UserMenu />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
