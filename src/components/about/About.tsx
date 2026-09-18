import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="w-full border-t border-zinc-200 bg-white px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 sm:gap-10 md:flex-row md:items-center">
        {/* Brand */}
        <div className="flex w-full justify-center md:w-1/2 md:justify-start">
          <Image
            src="/brand/trippulse-logo.png"
            alt="TripPulse"
            width={190}
            height={63}
            className="h-auto w-40 sm:w-48"
          />
        </div>

        {/* Content */}
        <div className="w-full text-center md:w-1/2 md:text-left">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-(--destination-primary)">
            About TripPulse
          </span>

          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-zinc-950 sm:text-2xl">
            Everything you need before you go.
          </h2>

          <p className="mt-3 max-w-xl text-xs font-medium leading-6 text-zinc-500 sm:text-sm">
            TripPulse brings useful destination information together in one
            place, so you can understand a place before you arrive. Check local
            time, currency, transport, attractions, and safety information
            without jumping between different websites.
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex h-10 items-center justify-center border border-(--destination-primary) bg-(--destination-primary) px-5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:border-(--destination-secondary) hover:bg-(--destination-secondary) active:bg-(--destination-secondary)"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
