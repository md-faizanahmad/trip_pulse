"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, List, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import UserMenuSkeleton from "../skeleton/UserMenuSkeleton";

export default function UserMenu() {
  const { user, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
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

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-9 items-center justify-center rounded-lg bg-(--destination-primary) px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-(--destination-secondary) active:scale-95"
      >
        Log in
      </Link>
    );
  }
  if (isLoading) {
    return <UserMenuSkeleton />;
  }
  const initial = user.name.trim().charAt(0).toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open user menu"
        className="group flex items-center gap-2 rounded-full outline-none transition-all"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--destination-primary)/10 text-sm font-bold text-(--destination-primary) ring-1 ring-inset ring-(--destination-primary)/20 transition-all group-hover:bg-(--destination-primary)/20 group-active:scale-95">
          {initial}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-zinc-400 transition-all duration-300 group-hover:text-zinc-600 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right  bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="border-b border-zinc-100 px-3 pb-3 pt-2">
            <p className="truncate text-sm font-semibold text-zinc-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-zinc-500">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/list"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-(--destination-primary)/5 hover:text-(--destination-primary)"
            >
              <List className="h-4 w-4" aria-hidden="true" />
              Your List
            </Link>
          </div>

          <div className="border-t border-zinc-100 pt-1">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
