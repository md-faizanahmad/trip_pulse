export default function DesktopHeaderSkeleton() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div
          className="h-12.5 w-37.5 animate-pulse rounded bg-zinc-100"
          aria-hidden="true"
        />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex" aria-hidden="true">
          <div className="h-3 w-10 animate-pulse rounded bg-zinc-100" />
          <div className="h-3 w-16 animate-pulse rounded bg-zinc-100" />

          {/* User menu */}
          <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-100" />
        </div>
      </div>
    </header>
  );
}
