export default function SearchSkeleton() {
  return (
    <div
      className="mt-3 max-h-80 overflow-hidden rounded-2xl bg-white shadow-lg shadow-zinc-900/5"
      aria-label="Loading destinations"
      aria-busy="true"
    >
      <ul className="divide-y divide-zinc-100">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className="flex min-h-16 items-center justify-between gap-4 px-4 py-3"
          >
            <div className="min-w-0 flex-1 animate-pulse space-y-2">
              <div className="h-4 w-32 rounded bg-zinc-200" />
              <div className="h-3 w-48 max-w-full rounded bg-zinc-100" />
            </div>

            <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-zinc-100" />
          </li>
        ))}
      </ul>
    </div>
  );
}
