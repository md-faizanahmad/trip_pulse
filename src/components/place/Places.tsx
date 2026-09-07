"use client";

import { usePlaces } from "@/hooks/usePlaces";

type PlacesProps = {
  latitude: number;
  longitude: number;
};
export default function Places({ latitude, longitude }: PlacesProps) {
  const { places, status, error } = usePlaces(latitude, longitude);

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
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100"
            />
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
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <article
              key={place.id}
              className="rounded-lg border border-zinc-200 bg-white p-4"
            >
              <h3 className="font-semibold text-zinc-900">{place.name}</h3>

              {place.address && (
                <p className="mt-1 text-sm text-zinc-500">{place.address}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
