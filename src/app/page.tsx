import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
        <span className="mb-4 text-sm font-medium text-zinc-500">
          Your travel companion
        </span>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
          Plan your next trip with TripPulse.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          Discover destinations, organize your travel plans, and keep your
          journey in one place.
        </p>

        <div className="mt-8">
          <Link
            href="/explore"
            className="inline-flex items-center rounded-md bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Start Exploring
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Everything for your journey
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-600">
            TripPulse will grow into a simple place to discover, plan, and
            manage your trips.
          </p>
        </div>
      </section>
    </main>
  );
}
