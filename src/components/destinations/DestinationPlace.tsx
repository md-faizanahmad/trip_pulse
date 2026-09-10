import type { Destination } from "@/types/destination";
import SunTimes from "../Weather/SunTimes";
import LocalTime from "../localTime/LocalTime";

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
    <section className="w-full border-b border-zinc-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Destination Information */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {countryLabel && (
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                {countryLabel}
              </p>
            )}

            <h1 className="mt-1 text-2xl font-medium tracking-tight text-zinc-950 sm:text-3xl">
              {destination.name}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:max-w-xl">
              {destination.displayName}
            </p>
          </div>

          <div className="mt-6">
            <LocalTime
              latitude={destination.latitude}
              longitude={destination.longitude}
            />

            <a
              href={mapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 border border-zinc-900 bg-zinc-900 px-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800 sm:w-auto"
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
        </div>

        {/* Sun Times & Embedded Map */}
        <div className="flex shrink-0 flex-col gap-4 border-t border-zinc-200 pt-5 md:w-64 md:border-t-0 md:pt-0">
          <SunTimes
            latitude={destination.latitude}
            longitude={destination.longitude}
          />

          <div className="relative aspect-video w-full border border-zinc-200 bg-zinc-50 md:aspect-square md:w-full">
            <iframe
              title={`Map showing ${destination.name}`}
              src={mapsEmbedUrl}
              className="h-full w-full border-0 grayscale-20% contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
