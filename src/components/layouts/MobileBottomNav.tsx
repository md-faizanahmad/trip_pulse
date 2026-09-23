"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const router = useRouter();

  const { user, isLoading, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      setIsOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  const renderNavigationItems = () =>
    navigationItems.map((item) => {
      const isActive =
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

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
    });

  if (isLoading) {
    return (
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex h-16 max-w-md items-stretch">
          {renderNavigationItems()}

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
        {renderNavigationItems()}

        {user ? (
          <div ref={menuRef} className="relative flex flex-1">
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              className="flex w-full flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-950"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--destination-primary) text-[10px] font-bold text-white">
                {user.name.trim().charAt(0).toUpperCase()}
              </span>

              <span>Account</span>
            </button>

            {isOpen && (
              <div
                role="menu"
                className="absolute bottom-full right-2 mb-3 w-40 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg"
              >
                <div className="border-b border-zinc-100 px-3 py-2">
                  <p className="truncate text-xs font-semibold text-zinc-950">
                    {user.name}
                  </p>

                  <p className="truncate text-[10px] text-zinc-500">
                    {user.email}
                  </p>
                </div>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="mt-1 flex w-full items-center rounded-lg px-3 py-2.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
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
