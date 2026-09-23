"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogIn, LogOut, List } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export default function UserMenu() {
  const { user, refreshUser } = useAuth();

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
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to log out.");
      }

      setIsOpen(false);
      await refreshUser();
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
        className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 transition-colors hover:text-(--destination-primary)"
      >
        Login
      </Link>
    );
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
        className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--destination-primary) text-sm font-bold text-white">
          {initial}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-zinc-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-56 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg"
        >
          <div className="border-b border-zinc-100 px-3 py-2">
            <p className="truncate text-sm font-semibold text-zinc-950">
              {user.name}
            </p>

            <p className="truncate text-xs text-zinc-500">{user.email}</p>
          </div>

          <Link
            href="/list"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
          >
            <List className="h-4 w-4" aria-hidden="true" />
            Your List
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
