"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Navigation, Globe2 } from "lucide-react";

import AttractionPinButton from "@/components/pins/AttractionPinButton";
import type { AttractionPin } from "@/types/pins";

type AttractionPinCardProps = {
  attraction: AttractionPin;
};

export default function AttractionPinCard({
  attraction,
}: AttractionPinCardProps) {
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${attraction.latitude},${attraction.longitude}`;

  const destinationUrl = `/destinations/${encodeURIComponent(
    attraction.name.toLowerCase(),
  )}?osmType=${encodeURIComponent(attraction.osmType)}&osmId=${attraction.osmId}`;

  const address = [attraction.address, attraction.city, attraction.country]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="group flex h-full min-w-0 flex-col rounded-sm border border-zinc-200 bg-white p-3 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-3.5">
      {/* Header */}
      <div className="flex items-start gap-2">
        <div className="flex size-8 shrink-0 items-center justify-center bg-(--destination-primary)/8 text-(--destination-primary)">
          <MapPin size={16} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-sm leading-snug font-semibold text-zinc-900">
            <Link
              href={destinationUrl}
              className="rounded-sm transition-colors hover:text-(--destination-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--destination-primary)"
            >
              <span className="line-clamp-2 wrap-break-word">
                {attraction.name}
              </span>
            </Link>
          </h3>

          <p className="mt-1 text-xs font-medium capitalize text-zinc-500">
            {attraction.category}
          </p>
        </div>

        <div className="shrink-0">
          <AttractionPinButton
            input={{
              osmType: attraction.osmType,
              osmId: attraction.osmId,
              name: attraction.name,
              latitude: attraction.latitude,
              longitude: attraction.longitude,
              category: attraction.category,
              address: attraction.address,
              city: attraction.city,
              country: attraction.country,
              countryCode: attraction.countryCode,
            }}
            initialPinned
          />
        </div>
      </div>

      {/* Address */}
      {address && (
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
          {address}
        </p>
      )}

      {/* Coordinates */}
      <div className="mt-3 flex min-w-0 items-center gap-1.5 border-t border-zinc-100 pt-2.5">
        <Globe2
          size={13}
          className="shrink-0 text-zinc-400"
          aria-hidden="true"
        />

        <span
          className="truncate font-mono text-[11px] tabular-nums text-zinc-500"
          title={`${attraction.latitude}, ${attraction.longitude}`}
        >
          {attraction.latitude.toFixed(4)}, {attraction.longitude.toFixed(4)}
        </span>
      </div>

      {/* Directions */}
      <div className="mt-3">
        <Link
          href={mapsDirUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${attraction.name} on Google Maps`}
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
