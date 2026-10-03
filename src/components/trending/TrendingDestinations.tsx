import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import destinations from "@/data/trending-destinations.json";

export default function TrendingDestinations() {
  return (
    <section
      aria-labelledby="trending-destinations-heading"
      className="w-full px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--destination-secondary)">
              Explore the world
            </p>

            <h2
              id="trending-destinations-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
            >
              Trending destinations
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
              Find inspiration for your next trip, from iconic cities to
              unforgettable escapes.
            </p>
          </div>

          <Link
            href="/destinations"
            className="mb-1 hidden shrink-0 items-center gap-2 text-sm font-medium text-zinc-700 transition-colors hover:text-(--destination-secondary) sm:inline-flex"
          >
            Explore all
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Destination cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {destinations.map((destination) => (
            <Link
              key={destination.slug}
              href={`/destinations/${destination.slug}`}
              className="group relative isolate aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--destination-secondary)"
              aria-label={`Explore ${destination.name}, ${destination.country}`}
            >
              <Image
                src={destination.image}
                alt={`${destination.name}, ${destination.country}`}
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Contrast for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              {/* Destination details */}
              <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5">
                <div className="mb-1.5 flex items-center gap-1.5 text-xs text-white/80">
                  <MapPin size={13} aria-hidden="true" />
                  <span>{destination.country}</span>
                </div>

                <h3 className="text-base font-semibold leading-snug sm:text-xl">
                  {destination.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <Link
          href="/destinations"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-700 sm:hidden"
        >
          Explore all destinations
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
