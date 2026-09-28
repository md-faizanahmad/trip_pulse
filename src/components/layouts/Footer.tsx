import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white pb-16 md:pb-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:flex-wrap md:gap-x-4 md:gap-y-2 md:py-5">
        <Link href="/" aria-label="TripPulse home">
          <Image
            src="/brand/trippulse-logo.png"
            alt="TripPulse"
            width={110}
            height={37}
          />
        </Link>

        <span className="hidden text-zinc-300 md:inline" aria-hidden="true">
          |
        </span>

        <p className="text-xs font-medium text-zinc-500">
          Plan better trips, one journey at a time.
        </p>

        <Link
          href="/policy"
          className="text-xs underline font-medium text-blue-400"
        >
          Policy Section
        </Link>

        <span className="hidden text-zinc-300 md:inline" aria-hidden="true">
          |
        </span>

        <p className="text-[11px] font-medium text-zinc-400">
          © {new Date().getFullYear()} TripPulse ·{" "}
          <a
            href="https://mdfaizanahmad.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-600"
          >
            mdfaizanahmad.vercel.app
          </a>
        </p>
      </div>
    </footer>
  );
}
