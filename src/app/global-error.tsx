"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        <main className="flex min-h-screen items-center justify-center px-6 py-8">
          <div className="w-full max-w-xl text-center">
            <p className="text-sm font-medium text-zinc-500">TripPulse</p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Something went wrong
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-zinc-600">
              TripPulse encountered an unexpected problem. Please try again.
            </p>

            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
              >
                Try again
              </button>

              <Link
                href="/"
                className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
              >
                Back to TripPulse
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
