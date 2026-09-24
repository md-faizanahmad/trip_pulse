"use client";

import Link from "next/link";

import PinButton from "@/components/pins/PinButton";
import type { LocationPin } from "@/types/pins";

type LocationPinCardProps = {
  location: LocationPin;
};

export default function LocationPinCard({ location }: LocationPinCardProps) {
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;

  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-zinc-900">
              {location.name}
            </h3>

            {(location.country || location.countryCode) && (
              <p className="mt-1 text-xs text-zinc-500">
                {location.country}
                {location.country && location.countryCode && " · "}
                {location.countryCode?.toUpperCase()}
              </p>
            )}
          </div>

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

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600">
          {location.displayName}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-zinc-400">
          {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </span>

        <Link
          href={mapsDirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-(--destination-primary) px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-(--destination-secondary)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
