"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bookmark, Home, LogIn, LogOut } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

const navigationItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Saved",
    href: "/list",
    icon: Bookmark,
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
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          className="group flex flex-1 flex-col items-center justify-center gap-1 outline-none"
          aria-current={isActive ? "page" : undefined}
        >
          {/* Active Pill & Icon */}
          <div
            className={`flex h-8 w-14 items-center justify-center rounded-full transition-all duration-300 ${
              isActive
                ? "bg-(--destination-primary)/15 text-(--destination-primary)"
                : "text-zinc-500 group-hover:text-zinc-900 group-active:scale-95"
            }`}
          >
            <Icon
              className="h-5.5 w-5.5 transition-all"
              strokeWidth={isActive ? 2.5 : 2}
              fill={isActive ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </div>

          {/* Label */}
          <span
            className={`text-[10px] transition-colors duration-300 ${
              isActive
                ? "font-semibold text-(--destination-primary)"
                : "font-medium text-zinc-500"
            }`}
          >
            {item.label}
          </span>
        </Link>
      );
    });

  if (isLoading) {
    return (
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200/80 bg-white/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex h-16 max-w-md items-stretch">
          {renderNavigationItems()}

          <div className="flex flex-1 flex-col items-center justify-center gap-1 opacity-50">
            <div className="flex h-8 w-14 animate-pulse items-center justify-center rounded-full bg-zinc-200" />
            <span className="h-3 w-10 animate-pulse rounded bg-zinc-200" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200/80 bg-white/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
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
              className="group flex w-full flex-col items-center justify-center gap-1 outline-none"
            >
              <div
                className={`flex h-8 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen
                    ? "bg-(--destination-primary)/15"
                    : "group-active:scale-95"
                }`}
              >
                <span
                  className={`flex h-5.5 w-5.5 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                    isOpen
                      ? "bg-(--destination-primary) text-white"
                      : "bg-zinc-200 text-zinc-600 group-hover:bg-zinc-300 group-hover:text-zinc-900"
                  }`}
                >
                  {user.name.trim().charAt(0).toUpperCase()}
                </span>
              </div>
              <span
                className={`text-[10px] font-medium transition-colors duration-300 ${
                  isOpen ? "text-(--destination-primary)" : "text-zinc-500"
                }`}
              >
                Account
              </span>
            </button>

            {/* Popup Menu */}
            {isOpen && (
              <div
                role="menu"
                className="absolute bottom-full right-4 mb-2 w-48 origin-bottom-right rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl animate-in zoom-in-95"
              >
                <div className="border-b border-zinc-100 px-3 pb-3 pt-2">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-zinc-500">{user.email}</p>
                </div>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="group flex flex-1 flex-col items-center justify-center gap-1 outline-none"
          >
            <div className="flex h-8 w-14 items-center justify-center rounded-full text-zinc-500 transition-all duration-300 group-hover:text-zinc-900 group-active:scale-95">
              <LogIn
                className="h-5.5 w-5.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>
            <span className="text-[10px] font-medium text-zinc-500 transition-colors duration-300">
              Log in
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
