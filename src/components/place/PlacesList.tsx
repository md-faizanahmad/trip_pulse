import PinButton from "@/components/pins/PinButton";
import type { Place } from "@/types/places";
import AttractionPinButton from "../pins/AttractionPinButton";

type PlacesListProps = {
  places: Place[];
  getGoogleMapsUrl: (latitude: number, longitude: number) => string;
};

export default function PlacesList({
  places,
  getGoogleMapsUrl,
}: PlacesListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place, index) => (
        <div
          key={place.id}
          className="group flex items-center justify-between gap-3 bg-white px-3.5 py-2.5 transition-colors hover:bg-(--destination-surface)"
        >
          {/* Index */}
          <span className="font-mono text-[11px] font-bold text-slate-300 transition-colors group-hover:text-(--destination-secondary)">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Place Details */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xs font-bold tracking-tight text-(--destination-secondary)">
              {place.name}
            </h3>

            {(place.address || place.city) && (
              <p className="mt-0.5 truncate text-[11px] font-medium text-slate-700">
                {[place.address, place.city].filter(Boolean).join(", ")}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <AttractionPinButton
              input={{
                osmType: place.id.split("-")[0] as "node" | "way" | "relation",
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

            <a
              href={getGoogleMapsUrl(place.latitude, place.longitude)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${place.name} in Google Maps`}
              className="flex h-8 w-8 shrink-0 items-center justify-center border border-slate-200 text-slate-400 transition-colors hover:border-(--destination-primary) hover:bg-(--destination-primary) hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
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
