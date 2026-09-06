import Link from "next/link";

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-900"
          >
            TripPulse
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
