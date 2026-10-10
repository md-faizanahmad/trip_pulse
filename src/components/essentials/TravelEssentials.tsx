"use client";

import { ExternalLink, Fuel, Landmark, MapPin } from "lucide-react";
import ErrorState from "@/components/common/ErrorState";
import { useTravelEssentials } from "@/hooks/useTravelEssentials";

type TravelEssentialsProps = {
  latitude: number;
  longitude: number;
};

const categories = [
  { key: "bank", label: "Banks", icon: Landmark },
  { key: "atm", label: "ATMs", icon: MapPin },
  { key: "fuel", label: "Fuel Stations", icon: Fuel },
] as const;

export default function TravelEssentials({
  latitude,
  longitude,
}: TravelEssentialsProps) {
  const { essentials, status, error, retry } = useTravelEssentials(
    latitude,
    longitude,
  );

  return (
    <section className="border-t border-zinc-200 py-8">
      <div>
        <h2 className="text-lg font-semibold text-(--destination-text)">
          Travel Essentials
        </h2>
        <p className="mt-1 text-sm text-(--destination-secondary)">
          Useful places around your destination
        </p>
      </div>

      {status === "loading" && (
        <div className="mt-5 space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-16 animate-pulse bg-zinc-100" />
          ))}
        </div>
      )}

      {status === "error" && error && (
        <ErrorState message={error} onRetry={retry} />
      )}

      {status === "success" && (
        <div className="mt-5 space-y-6">
          {categories.map(({ key, label, icon: Icon }) => {
            const places = essentials[key];

            if (places.length === 0) return null;

            return (
              <div key={key}>
                <div className="mb-2 flex items-center gap-2">
                  <Icon
                    className="h-4 w-4 text-(--destination-primary)"
                    strokeWidth={1.8}
                  />
                  <h3 className="text-sm font-semibold text-(--destination-text)">
                    {label}
                  </h3>
                </div>

                <div className="divide-y divide-zinc-200 border-y border-zinc-200">
                  {places.map((place) => {
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;

                    return (
                      <div
                        key={`${place.type}-${place.id}`}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <p className="min-w-0 truncate text-sm text-(--destination-text)">
                          {place.name}
                        </p>

                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${place.name} in Google Maps`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center text-(--destination-secondary) transition-colors hover:text-(--destination-primary)"
                        >
                          <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {categories.every(({ key }) => essentials[key].length === 0) && (
            <p className="text-sm text-(--destination-secondary)">
              No travel essentials found nearby.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
