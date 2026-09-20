import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden border-t border-zinc-200 bg-white md:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-5 text-center sm:px-6">
        <Link href="/" aria-label="TripPulse home">
          <Image
            src="/brand/trippulse-logo.png"
            alt="TripPulse"
            width={110}
            height={37}
          />
        </Link>

        <span className="hidden text-zinc-300 sm:inline" aria-hidden="true">
          |
        </span>

        <p className="text-xs font-medium text-zinc-500">
          Plan better trips, one journey at a time.
        </p>

        <span className="hidden text-zinc-300 sm:inline" aria-hidden="true">
          |
        </span>

        <p className="text-[11px] font-medium text-zinc-400">
          © {new Date().getFullYear()} TripPulse
        </p>
      </div>
    </footer>
  );
}
