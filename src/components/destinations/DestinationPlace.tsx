import type { Destination } from "@/types/destination";
import SunTimes from "../Weather/SunTimes";
type DestinationPlaceProps = {
  destination: Destination;
};

export default function DestinationPlace({
  destination,
}: DestinationPlaceProps) {
  const countryLabel = [destination.country, destination.countryCode]
    .filter(Boolean)
    .join(" · ");

  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${destination.latitude},${destination.longitude}&z=14&output=embed`;

  return (
    <section className="flex flex-row items-start justify-between gap-4  p-4   sm:p-5 sm:gap-6">
      {/* Left Column: Text & Action */}
      <div className="flex flex-1 flex-col space-y-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            {destination.name}
          </h1>

          {countryLabel && (
            <p className="mt-1 text-xs font-medium text-zinc-500">
              {countryLabel}
            </p>
          )}

          <p className="mt-2 text-sm leading-relaxed text-zinc-600 line-clamp-3">
            {destination.displayName}
          </p>
        </div>

        <a
          href={mapsDirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 rounded-lg  px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 active:scale-[0.98]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <span>Get Directions</span>
        </a>
      </div>

      {/* Right Column: Embedded Map */}
      {/* Right Column: Sun Times & Embedded Map */}
      <div>
        <SunTimes
          latitude={destination.latitude}
          longitude={destination.longitude}
        />

        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-zinc-100 ring-1 ring-black/5 sm:h-36 sm:w-48">
          <iframe
            title={`Map showing ${destination.name}`}
            src={mapsEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
