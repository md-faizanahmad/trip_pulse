import Link from "next/link";
import type { Destination } from "@/types/destination";

type DestinationSearchResultsProps = {
  destinations: Destination[];
};

export default function DestinationSearchResults({
  destinations,
}: DestinationSearchResultsProps) {
  if (destinations.length === 0) {
    return (
      <div className="mt-3 rounded-2xl border border-zinc-200 bg-white px-4 py-6 text-center">
        <p className="text-sm font-medium text-zinc-700">
          No destinations found.
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          Try searching for another city or destination.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 max-h-80 overflow-y-auto overscroll-contain rounded-2xl border border-zinc-200 bg-white shadow-lg shadow-zinc-900/5">
      <ul className="divide-y divide-zinc-100">
        {destinations.map((destination) => (
          <li key={`${destination.osmType}-${destination.osmId}`}>
            <Link
              href={`/destinations/${encodeURIComponent(
                destination.name.toLowerCase(),
              )}?osmType=${encodeURIComponent(
                destination.osmType,
              )}&osmId=${destination.osmId}`}
              className="group flex w-full items-center gap-4 px-4 py-3.5 transition-colors hover:bg-zinc-50 focus:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-300"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors group-hover:bg-zinc-200">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="9"
                    r="2.25"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-900">
                  {destination.name}
                </p>

                <p className="mt-0.5 truncate text-xs text-zinc-500">
                  {destination.displayName}
                </p>
              </div>

              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500"
              >
                <path
                  d="m7.5 4.5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
