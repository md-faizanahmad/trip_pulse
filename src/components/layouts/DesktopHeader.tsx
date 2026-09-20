"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

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
  const router = useRouter();
  const { isLoading, isAuthenticated, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="hidden border-b border-zinc-200 bg-white md:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="TripPulse home">
          <Image
            src="/brand/trippulse-logo.png"
            alt="TripPulse"
            width={150}
            height={50}
            priority
          />
        </Link>

        <nav aria-label="Desktop navigation">
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
                  className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-(--destination-primary)"
                      : "text-zinc-600 hover:text-(--destination-primary)"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}

            {isLoading ? (
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                ...
              </span>
            ) : isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 transition-colors hover:text-(--destination-primary)"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  pathname.startsWith("/login")
                    ? "text-(--destination-primary)"
                    : "text-zinc-600 hover:text-(--destination-primary)"
                }`}
                aria-current={
                  pathname.startsWith("/login") ? "page" : undefined
                }
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
