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
    <article className="group flex h-full flex-col justify-between  p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-(--destination-primary)/40 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-zinc-900 transition-colors group-hover:text-(--destination-primary)">
              {attraction.name}
            </h3>

            <p className="mt-1 text-xs font-medium capitalize text-zinc-500">
              {attraction.category}
            </p>
          </div>

          <div className="shrink-0 pt-0.5">
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

        {(attraction.address || attraction.city || attraction.country) && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-600">
            {[attraction.address, attraction.city, attraction.country]
              .filter(Boolean)
              .join(", ")}
          </p>
        )}
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
          <span className="truncate">
            {attraction.latitude.toFixed(4)}, {attraction.longitude.toFixed(4)}
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
