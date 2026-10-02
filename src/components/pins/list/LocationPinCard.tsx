"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Navigation, Globe2 } from "lucide-react";

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
    <article className="group flex h-full min-w-0 flex-col rounded-sm  border border-zinc-200 bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-3.5">
      {/* Header */}
      <div className="flex items-start gap-2">
        <div className="flex size-8 shrink-0 items-center justify-center bg-(--destination-primary)/8 text-(--destination-primary)">
          <MapPin size={16} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <Link
            href={destinationUrl}
            className="inline rounded-sm text-sm leading-snug font-semibold text-zinc-900 transition-colors hover:text-(--destination-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--destination-primary)"
          >
            <span className="line-clamp-2 wrap-break-word">
              {location.name}
            </span>
          </Link>

          {(location.country || location.countryCode) && (
            <p className="mt-1 text-xs text-zinc-500">
              {location.country}
              {location.country && location.countryCode && " · "}
              {location.countryCode?.toUpperCase()}
            </p>
          )}
        </div>

        <div className="shrink-0">
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

      {/* Location details */}
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
        {location.displayName}
      </p>

      {/* Coordinates */}
      <div className="mt-3 flex min-w-0 items-center gap-1.5 border-t border-zinc-100 pt-2.5">
        <Globe2
          size={13}
          className="shrink-0 text-zinc-400"
          aria-hidden="true"
        />
        <span
          className="truncate font-mono text-[11px] tabular-nums text-zinc-500"
          title={`${location.latitude}, ${location.longitude}`}
        >
          {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </span>
      </div>

      {/* Directions */}
      <div className="mt-3">
        <Link
          href={mapsDirUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${location.name} on Google Maps`}
          className="inline-flex h-9 w-full items-center justify-between gap-2 bg-zinc-50 px-3 text-xs font-medium text-zinc-800 transition-colors hover:bg-(--destination-primary) hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--destination-primary) active:scale-[0.99]"
        >
          <span className="inline-flex items-center gap-1.5">
            <Navigation size={14} aria-hidden="true" />
            Directions
          </span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
