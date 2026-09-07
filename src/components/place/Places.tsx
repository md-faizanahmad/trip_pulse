"use client";

import { useState } from "react";
import { usePlaces } from "@/hooks/usePlaces";

type PlacesProps = {
  latitude: number;
  longitude: number;
};

const INITIAL_PLACE_COUNT = 6;

export default function Places({ latitude, longitude }: PlacesProps) {
  const { places, status, error } = usePlaces(latitude, longitude);
  const [showAll, setShowAll] = useState(false);

  const visiblePlaces = showAll ? places : places.slice(0, INITIAL_PLACE_COUNT);

  const hasMorePlaces = places.length > INITIAL_PLACE_COUNT;

  function getGoogleMapsUrl(placeLatitude: number, placeLongitude: number) {
    return `https://www.google.com/maps/search/?api=1&query=${placeLatitude},${placeLongitude}`;
  }

  return (
    <section className="mt-8 border-t border-zinc-100 pt-8 sm:mt-10 sm:pt-10">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Explore
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
          Attractions
        </h2>
      </div>

      {status === "loading" && (
        <div className="divide-y divide-zinc-100 border-y border-zinc-200">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-16 animate-pulse bg-zinc-50" />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {status === "success" && places.length === 0 && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-600">
            No nearby attractions were found.
          </p>
        </div>
      )}

      {status === "success" && places.length > 0 && (
        <>
          <div className="max-h-80 divide-y divide-zinc-100 overflow-y-auto overscroll-contain border-y border-zinc-200 p-5">
            {visiblePlaces.map((place) => (
              <div
                key={place.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-zinc-900">
                    {place.name}
                  </h3>

                  {(place.address || place.city) && (
                    <p className="mt-1 truncate text-sm text-zinc-500">
                      {[place.address, place.city].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>

                <a
                  href={getGoogleMapsUrl(place.latitude, place.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-sm font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-900"
                >
                  Maps
                </a>
              </div>
            ))}
          </div>

          {hasMorePlaces && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
              >
                {showAll
                  ? "Show less"
                  : `Show all ${places.length} attractions`}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
