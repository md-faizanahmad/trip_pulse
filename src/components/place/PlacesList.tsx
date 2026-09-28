"use client";

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
      {places.map((place, index) => (
        <div
          key={place.id}
          className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-white p-3.5 shadow-sm transition-all hover:border-(--destination-primary)/30 hover:bg-(--destination-surface) hover:shadow-md"
        >
          {/* Index */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-xs font-medium text-zinc-400 transition-colors group-hover:bg-(--destination-secondary)/10 group-hover:text-(--destination-secondary)">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Place Details */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-(--destination-secondary)">
              {place.name}
            </h3>

            {(place.address || place.city) && (
              <p className="mt-0.5 truncate text-xs text-zinc-500">
                {[place.address, place.city].filter(Boolean).join(", ")}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {user && (
              <AttractionPinButton
                input={{
                  osmType: place.id.split("-")[0] as
                    | "node"
                    | "way"
                    | "relation",
                  osmId: place.id.split("-").slice(1).join("-"),
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
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 transition-all hover:border-(--destination-primary) hover:bg-(--destination-primary) hover:text-white active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
