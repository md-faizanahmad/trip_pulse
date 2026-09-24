"use client";

import Link from "next/link";

import AttractionPinButton from "@/components/pins/AttractionPinButton";
import type { AttractionPin } from "@/types/pins";

type AttractionPinCardProps = {
  attraction: AttractionPin;
};

export default function AttractionPinCard({
  attraction,
}: AttractionPinCardProps) {
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${attraction.latitude},${attraction.longitude}`;

  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-zinc-900">
              {attraction.name}
            </h3>

            <p className="mt-1 text-xs font-medium capitalize text-zinc-500">
              {attraction.category}
            </p>
          </div>

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

        {(attraction.address || attraction.city || attraction.country) && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600">
            {[attraction.address, attraction.city, attraction.country]
              .filter(Boolean)
              .join(", ")}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="truncate text-xs text-zinc-400">
          {attraction.latitude.toFixed(4)}, {attraction.longitude.toFixed(4)}
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
