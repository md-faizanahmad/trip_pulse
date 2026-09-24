"use client";

import type { AttractionPin, LocationPin } from "@/types/pins";

type PinsListProps = {
  locations: LocationPin[];
  attractions: AttractionPin[];
  isLoading: boolean;
  error: string | null;
};

export default function PinsList({
  locations,
  attractions,
  isLoading,
  error,
}: PinsListProps) {
  if (isLoading) {
    return (
      <section className="w-full">
        <div className="flex min-h-60 items-center justify-center">
          <span
            className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-200 border-t-(--destination-primary)"
            aria-label="Loading your list"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full">
        <div className="flex min-h-60 items-center justify-center px-4 text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (locations.length === 0 && attractions.length === 0) {
    return (
      <section className="w-full">
        <div className="flex min-h-60 flex-col items-center justify-center px-4 text-center">
          <h2 className="text-lg font-semibold text-zinc-900">
            Your list is empty
          </h2>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
            Pin locations and attractions while exploring TripPulse and they
            will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="space-y-10">
        {locations.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">Locations</h2>

              <p className="mt-1 text-sm text-zinc-500">
                Places you have saved.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Location cards will be added next */}
            </div>
          </section>
        )}

        {attractions.length > 0 && (
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">
                Attractions
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Attractions you have saved.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Attraction cards will be added next */}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
