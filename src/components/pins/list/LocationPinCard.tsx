"use client";

import Link from "next/link";

import PinButton from "@/components/pins/PinButton";
import type { LocationPin } from "@/types/pins";

type LocationPinCardProps = {
  location: LocationPin;
};

export default function LocationPinCard({ location }: LocationPinCardProps) {
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
  const destinationUrl = `/destinations/${encodeURIComponent(
    location.name.toLowerCase(),
  )}?osmType=${encodeURIComponent(location.osmType)}&osmId=${location.osmId}`;
  return (
    <article className="group flex h-full flex-col justify-between shadow-sm p-5  transition-all duration-300 hover:-translate-y-0.5 hover:border-(--destination-primary)/40 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={destinationUrl}
              className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--destination-primary)"
            >
              <h3 className="truncate text-base font-semibold text-zinc-900 transition-colors group-hover:text-(--destination-primary)">
                {location.name}
              </h3>
            </Link>
            {(location.country || location.countryCode) && (
              <p className="mt-1 text-xs font-medium text-zinc-500">
                {location.country}
                {location.country && location.countryCode && " · "}
                {location.countryCode?.toUpperCase()}
              </p>
            )}
          </div>

          <div className="shrink-0 pt-0.5">
            <PinButton
              type="location"
              input={{
                osmType: location.osmType,
                osmId: location.osmId,
                name: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
                displayName: location.displayName,
                country: location.country,
                countryCode: location.countryCode,
              }}
              initialPinned
            />
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600">
          {location.displayName}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        {/* Coordinate Pill */}
        <div className="inline-flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-1.5 font-mono text-[10px] font-medium text-zinc-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 text-zinc-300"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v20" />
            <path d="M2 12h20" />
          </svg>
          <span>
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </span>
        </div>

        <Link
          href={mapsDirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-(--destination-primary) px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-(--destination-secondary) active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
          <span>Directions</span>
        </Link>
      </div>
    </article>
  );
}
