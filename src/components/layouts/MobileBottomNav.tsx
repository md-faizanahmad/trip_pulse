"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const navigationItems = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    label: "Your List",
    href: "/list",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex h-16 max-w-md items-stretch">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-(--destination-primary)"
                    : "text-zinc-500 hover:text-zinc-950"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}

          <Link
            href="/login"
            className="flex flex-1 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[9px]">
              ?
            </span>
            <span>Login</span>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex h-16 max-w-md items-stretch">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider transition-colors ${
                isActive
                  ? "text-(--destination-primary)"
                  : "text-zinc-500 hover:text-zinc-950"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}

        {user ? (
          <Link
            href="/list"
            className="flex flex-1 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-950"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--destination-primary) text-[10px] font-bold text-white">
              {user.name.trim().charAt(0).toUpperCase()}
            </span>

            <span>Account</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex flex-1 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-950"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-400 text-[10px]">
              →
            </span>

            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
