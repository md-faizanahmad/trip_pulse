import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center px-6 py-8">
      <div className="w-full max-w-xl text-center">
        <Image
          src="/not-found.png"
          alt="TripPulse 404 illustration"
          width={1536}
          height={1024}
          className="mx-auto h-auto w-40 sm:w-72"
          priority
        />

        <p className="mt-3 text-sm font-medium text-zinc-500">404</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Page not found
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-zinc-600">
          The page you’re looking for doesn’t exist or may have moved.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Back to TripPulse
        </Link>
      </div>
    </section>
  );
}
