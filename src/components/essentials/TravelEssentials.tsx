"use client";

import {
  ChevronDown,
  ExternalLink,
  Fuel,
  Landmark,
  MapPin,
} from "lucide-react";
import ErrorState from "@/components/common/ErrorState";
import { useTravelEssentials } from "@/hooks/useTravelEssentials";
import SectionTitle from "../common/SectionTitle";

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
      <SectionTitle
        title="Travel Essentials"
        description="Useful places around your destination"
      />

      {status === "loading" && (
        <div className="mt-5 space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-14 animate-pulse bg-zinc-100" />
          ))}
        </div>
      )}

      {status === "error" && error && (
        <div className="mt-5">
          <ErrorState message={error} onRetry={retry} />
        </div>
      )}

      {status === "success" && (
        <div className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200">
          {categories.map(({ key, label, icon: Icon }) => {
            const places = essentials[key];

            if (places.length === 0) return null;

            return (
              <details key={key} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 py-3 [&::-webkit-details-marker]:hidden">
                  <Icon
                    className="h-5 w-5 shrink-0 text-(--destination-primary)"
                    strokeWidth={1.8}
                  />

                  <span className="flex-1 text-sm font-medium text-(--destination-text)">
                    {label}
                  </span>

                  <span className="text-xs text-(--destination-secondary)">
                    {places.length} {places.length === 1 ? "place" : "places"}
                  </span>

                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-(--destination-secondary) transition-transform group-open:rotate-180"
                    strokeWidth={1.8}
                  />
                </summary>

                <div className="pb-3 pl-8">
                  {places.map((place) => {
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;

                    return (
                      <div
                        key={`${place.type}-${place.id}`}
                        className="flex items-center gap-3 border-t border-zinc-100 py-3"
                      >
                        <p className="min-w-0 flex-1 text-sm text-(--destination-text)">
                          {place.name}
                        </p>

                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${place.name} in Google Maps`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center text-(--destination-secondary) transition-colors hover:text-(--destination-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--destination-primary)"
                        >
                          <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}

          {categories.every(({ key }) => essentials[key].length === 0) && (
            <p className="py-4 text-sm text-(--destination-secondary)">
              No travel essentials found nearby.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
