import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" aria-label="TripPulse home">
            <Image
              src="/brand/trippulse-logo.png"
              alt="TripPulse"
              width={130}
              height={43}
            />
          </Link>

          <p className="mt-1 text-sm text-zinc-500">
            Plan better trips, one journey at a time.
          </p>
        </div>

        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} TripPulse
        </p>
      </div>
    </footer>
  );
}
