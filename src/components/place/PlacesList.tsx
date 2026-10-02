"use client";

import Link from "next/link";
import Image from "next/image";
import type { Place } from "@/types/places";
import AttractionPinButton from "../pins/AttractionPinButton";
import { useAuth } from "@/hooks/useAuth";

type PlacesListProps = {
  places: Place[];
  getGoogleMapsUrl: (latitude: number, longitude: number) => string;
};

export default function PlacesList({
  places,
  getGoogleMapsUrl,
}: PlacesListProps) {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {places.map((place, index) => {
        const [osmType, ...osmIdParts] = place.id.split("-");
        const osmId = osmIdParts.join("-");

        const destinationUrl = `/destinations/${encodeURIComponent(
          place.name.toLowerCase(),
        )}?osmType=${encodeURIComponent(osmType)}&osmId=${encodeURIComponent(osmId)}`;

        return (
          <div
            key={place.id}
            className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-white p-3.5 shadow-sm transition-all hover:border-(--destination-primary)/30 hover:bg-(--destination-surface) hover:shadow-md"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-xs font-medium text-zinc-400 transition-colors group-hover:bg-(--destination-secondary)/10 group-hover:text-(--destination-secondary)">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="min-w-0 flex-1">
              <Link
                href={destinationUrl}
                className="block truncate text-sm font-semibold text-(--destination-secondary) outline-none transition-colors hover:text-(--destination-primary) focus-visible:underline"
              >
                {place.name}
              </Link>

              {(place.address || place.city) && (
                <p className="mt-0.5 truncate text-xs text-zinc-500">
                  {[place.address, place.city].filter(Boolean).join(", ")}
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {user && (
                <AttractionPinButton
                  input={{
                    osmType: osmType as "node" | "way" | "relation",
                    osmId,
                    name: place.name,
                    latitude: place.latitude,
                    longitude: place.longitude,
                    address: place.address,
                    city: place.city,
                    country: place.country,
                    countryCode: place.countryCode,
                    category: place.category,
                  }}
                />
              )}

              <a
                href={getGoogleMapsUrl(place.latitude, place.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${place.name} in Google Maps`}
                className="flex shrink-0 items-center justify-center rounded-md p-1 transition-transform hover:scale-110 active:scale-95"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Maps_icon_%282015-2020%29.svg"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
