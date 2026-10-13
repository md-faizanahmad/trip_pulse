"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Home, LogIn, LogOut } from "lucide-react";

import { useMobileNav } from "@/hooks/useMobileNav";
import MobileNavShell from "./mobile/MobileNavShell";

const navigationItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Saved", href: "/list", icon: Bookmark },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const {
    user,
    isLoading,
    isOpen,
    setIsOpen,
    isLoggingOut,
    menuRef,
    handleLogout,
  } = useMobileNav();

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
          <div
            className={`flex h-10 mt-2 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              isActive
                ? "bg-zinc-50/75 text-(--destination-primary)"
                : "text-zinc-500 group-hover:bg-zinc-100/60 group-hover:text-zinc-900 group-active:scale-95"
            }`}
          >
            <Icon
              className="h-5.5 w-5.5 transition-all"
              strokeWidth={isActive ? 2.5 : 2}
              fill={isActive ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </div>

          <span
            className={`text-[10px] transition-colors duration-200 ${
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
      <MobileNavShell>
        {renderNavigationItems()}

        <div className="flex flex-1 flex-col items-center justify-center gap-1 opacity-50">
          <div className="flex h-8 w-14 animate-pulse items-center justify-center rounded-full bg-zinc-200" />
          <span className="h-3 w-10 animate-pulse rounded bg-zinc-200" />
        </div>
      </MobileNavShell>
    );
  }

  return (
    <MobileNavShell>
      {renderNavigationItems()}

      {user ? (
        <div ref={menuRef} className="relative flex flex-1">
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-haspopup="menu"
            aria-label="Account menu"
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
            <LogIn className="h-5.5 w-5.5" strokeWidth={2} aria-hidden="true" />
          </div>

          <span className="text-[10px] font-medium text-zinc-500 transition-colors duration-300">
            Log in
          </span>
        </Link>
      )}
    </MobileNavShell>
  );
}
