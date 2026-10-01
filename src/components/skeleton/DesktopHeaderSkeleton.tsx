"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DesktopHeaderSkeleton() {
  const { user } = useAuth();

  return (
    <header
      aria-label="Loading header"
      className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand logo */}
        <div className="h-10 w-36 animate-pulse rounded-md bg-zinc-200" />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="h-4 w-10 animate-pulse rounded bg-zinc-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-zinc-200" />

          {/* User menu skeleton */}
          <div className="ml-2 flex items-center gap-3 border-l border-zinc-200 pl-6">
            {user ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-200" />
            ) : (
              <div className="h-9 w-20 animate-pulse rounded-lg bg-zinc-200" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
