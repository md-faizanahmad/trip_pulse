export default function UserMenuSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading user menu"
      className="flex items-center gap-2"
    >
      <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-200 ring-1 ring-inset ring-zinc-300/50" />

      <span className="sr-only">Loading user menu...</span>
    </div>
  );
}
