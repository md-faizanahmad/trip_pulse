import type { Destination } from "@/types/destination";
import SunTimes from "../Weather/SunTimes";
import LocalTime from "../localTime/LocalTime";
import CountryInfo from "../CountryInfo/CountryInfo";
import Image from "next/image";

type DestinationPlaceProps = {
  destination: Destination;
};

export default function DestinationPlace({
  destination,
}: DestinationPlaceProps) {
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${destination.latitude},${destination.longitude}&z=14&output=embed`;

  return (
    <section className="w-full border-b border-zinc-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Destination Information */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <CountryInfo
              country={destination.country}
              countryCode={destination.countryCode}
            />

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
              className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 border border-[#008EEB] bg-[#008EEB] px-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-[#022A5A] hover:bg-[#022A5A] sm:w-auto"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Maps_icon_%282015-2020%29.svg"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
                aria-hidden="true"
              />
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
