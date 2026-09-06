"use client";

import { useDestinationSearch } from "@/hooks/useDestinationSearch";
import { FormEvent, useState } from "react";

export default function DestinationSearch() {
  const [query, setQuery] = useState("");

  const { destinations, isLoading, error, searchDestinations } =
    useDestinationSearch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchDestinations(query);
  }

  return (
    <section className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Where do you want to go?
          </h2>

          <p className="mt-2 text-zinc-600">
            Search for a city or destination to explore.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="destination-search" className="sr-only">
            Search destination
          </label>

          <input
            id="destination-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destination..."
            className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && query.trim() && destinations.length === 0 && (
          <p className="mt-6 text-center text-sm text-zinc-500">
            No destinations found.
          </p>
        )}

        {destinations.length > 0 && (
          <div className="mt-6 space-y-3">
            {destinations.map((destination) => (
              <article
                key={`${destination.latitude}-${destination.longitude}`}
                className="rounded-md border border-zinc-200 bg-white p-4"
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
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
