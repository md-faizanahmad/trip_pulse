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
      <div className="mt-3 rounded-2xl  px-4 py-5 text-center">
        <p className="text-sm text-zinc-500">No destinations found.</p>
      </div>
    );
  }

  return (
    <div className="mt-3 max-h-80 overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-lg shadow-zinc-900/5">
      <ul className="divide-y divide-zinc-100">
        {destinations.map((destination) => (
          <li
            key={`${destination.osmType}-${destination.osmId}`}
            className="group"
          >
            <div className="flex items-center gap-4 px-4 py-3 transition-colors hover:">
              <Link
                href={`/destinations/${encodeURIComponent(
                  destination.name.toLowerCase(),
                )}?osmType=${encodeURIComponent(
                  destination.osmType,
                )}&osmId=${destination.osmId}`}
                className="min-w-0 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-300"
              >
                <p className="truncate text-sm font-medium text-zinc-900">
                  {destination.name}
                </p>

                <p className="mt-1 truncate text-xs text-zinc-500">
                  {destination.displayName}
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
