"use client";

import Link from "next/link";
import { useState } from "react";
import { useDestinationSearch } from "@/hooks/useDestinationSearch";

export default function DestinationSearch() {
  const [query, setQuery] = useState("");

  const { destinations, status, error } = useDestinationSearch(query);

  const isLoading = status === "loading";
  const hasResults = destinations.length > 0;
  const showEmpty =
    status === "success" && query.trim().length >= 3 && !hasResults;

  return (
    <section className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Where to?
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Search for a city or destination.
          </p>
        </div>

        <form onSubmit={(event) => event.preventDefault()} className="mt-6">
          <label htmlFor="destination-search" className="sr-only">
            Search destination
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="destination-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a destination"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Searching" : "Search"}
            </button>
          </div>
        </form>

        {isLoading && (
          <p
            className="mt-4 text-center text-sm text-zinc-500"
            aria-live="polite"
          >
            Searching...
          </p>
        )}

        {status === "error" && (
          <div
            className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3"
            role="alert"
          >
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {showEmpty && (
          <p className="mt-6 text-center text-sm text-zinc-500">
            No destinations found.
          </p>
        )}

        {hasResults && (
          <div className="mt-6 space-y-3">
            {destinations.map((destination) => (
              <Link
                key={`${destination.osmType}-${destination.osmId}`}
                href={`/destinations/${encodeURIComponent(
                  destination.name.toLowerCase(),
                )}?osmType=${encodeURIComponent(
                  destination.osmType,
                )}&osmId=${destination.osmId}`}
                className="block rounded-md border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-300"
              >
                <h3 className="font-medium text-zinc-900">
                  {destination.name}
                </h3>

                <p className="mt-1 text-sm text-zinc-600">
                  {destination.displayName}
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  {destination.latitude.toFixed(4)},{" "}
                  {destination.longitude.toFixed(4)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
