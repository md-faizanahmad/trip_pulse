"use client";

import { ExternalLink, Utensils } from "lucide-react";
import ErrorState from "@/components/common/ErrorState";
import { useRestaurants } from "@/hooks/useRestaurants";
import SectionTitle from "../common/SectionTitle";

type RestaurantsProps = {
  latitude: number;
  longitude: number;
};

export default function Restaurants({ latitude, longitude }: RestaurantsProps) {
  const { restaurants, status, error, retry } = useRestaurants(
    latitude,
    longitude,
  );

  return (
    <section className="border-t border-zinc-200 py-8">
      <SectionTitle
        icon={Utensils}
        iconVariant="circle"
        title="Restaurants"
        description="Places to eat in this destination"
      />

      {status === "loading" && (
        <div className="mt-5 space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse border border-zinc-200 bg-zinc-50"
            />
          ))}
        </div>
      )}

      {status === "error" && error && (
        <ErrorState message={error} onRetry={retry} />
      )}

      {status === "success" && restaurants.length === 0 && (
        <p className="mt-6 text-sm text-(--destination-secondary)">
          No restaurants found.
        </p>
      )}

      {status === "success" && restaurants.length > 0 && (
        <div className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200">
          {restaurants.map((restaurant) => {
            const name = restaurant.tags?.name ?? "Unnamed restaurant";

            const cuisine = restaurant.tags?.cuisine ?? null;

            const latitude = restaurant.lat ?? restaurant.center?.lat;

            const longitude = restaurant.lon ?? restaurant.center?.lon;

            const mapsUrl =
              latitude !== undefined && longitude !== undefined
                ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
                : null;

            return (
              <div
                key={`${restaurant.type}-${restaurant.id}`}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-(--destination-text)">
                    {name}
                  </h3>

                  {cuisine && (
                    <p className="mt-1 text-xs capitalize text-(--destination-secondary)">
                      {cuisine.replace(/;/g, " · ")}
                    </p>
                  )}
                </div>

                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${name} in Google Maps`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center text-(--destination-secondary) transition-colors hover:text-(--destination-primary)"
                  >
                    <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
