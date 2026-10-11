"use client";

import Image from "next/image";
import { Utensils } from "lucide-react";
import ErrorState from "@/components/common/ErrorState";
import SectionTitle from "@/components/common/SectionTitle";
import { useRestaurants } from "@/hooks/useRestaurants";
import { normalizeRestaurant } from "@/utils/restaurant";

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
    <section className="border-t border-zinc-200 px-4 py-8 sm:px-6 sm:py-10">
      <SectionTitle
        icon={Utensils}
        iconVariant="circle"
        title="Restaurants"
        description="Places to eat in this destination"
      />

      {status === "loading" && (
        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-16 animate-pulse bg-zinc-100" />
          ))}
        </div>
      )}

      {status === "error" && error && (
        <div className="mt-6">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}

      {status === "success" && restaurants.length === 0 && (
        <p className="mt-6 text-sm text-(--destination-secondary)">
          No restaurants found.
        </p>
      )}

      {status === "success" && restaurants.length > 0 && (
        <div className="mt-6 px-12 divide-y divide-zinc-200">
          {restaurants.map((restaurant) => {
            const item = normalizeRestaurant(restaurant);

            return (
              <div
                key={`${item.type}-${item.id}`}
                className="flex min-w-0 items-center gap-3 py-4 transition-colors hover:bg-zinc-50/60"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-(--destination-text)">
                    {item.name}
                  </h3>

                  {item.cuisine && (
                    <p className="mt-1 line-clamp-2 text-xs capitalize leading-5 text-(--destination-secondary)">
                      {item.cuisine.replace(/;/g, " · ")}
                    </p>
                  )}
                </div>

                {item.mapsUrl && (
                  <a
                    href={item.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Find ${item.name} on Google Maps`}
                    title="Open in Google Maps"
                    className="flex h-10 w-10 shrink-0 items-center justify-center transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--destination-primary)"
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Maps_icon_%282015-2020%29.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
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
