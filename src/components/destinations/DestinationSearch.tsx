"use client";

import { useState } from "react";
import { useDestinationSearch } from "@/hooks/useDestinationSearch";
import DestinationSearchResults from "@/components/destinations/DestinationSearchResults";
import { validateDestinationQuery } from "@/validation/validation";
import SearchSkeleton from "./SearchSkeleton";

export default function DestinationSearch() {
  const [query, setQuery] = useState("");

  const { destinations, status, error } = useDestinationSearch(query);

  const isLoading = status === "loading";
  const validationError = validateDestinationQuery(query);

  const showResults = status === "success" && destinations.length > 0;

  const showEmpty =
    status === "success" &&
    validationError === null &&
    destinations.length === 0;

  function handleQueryChange(value: string) {
    const sanitizedValue = value.replace(/[^a-zA-ZÀ-ÿ\s.'-]/g, "");

    setQuery(sanitizedValue);
  }

  return (
    <section className=" bg-zinc-50">
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
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Search a destination"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />

            <button
              type="submit"
              disabled={isLoading || validationError !== null}
              className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Search
            </button>
          </div>
        </form>

        {validationError && query.trim().length > 0 && (
          <p className="mt-3 text-sm text-zinc-500" role="status">
            {validationError}
          </p>
        )}

        {isLoading && <SearchSkeleton />}

        {status === "error" && (
          <div className="mt-3 rounded-2xl bg-red-50 px-4 py-3" role="alert">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {showResults && (
          <DestinationSearchResults destinations={destinations} />
        )}

        {showEmpty && <DestinationSearchResults destinations={[]} />}
      </div>
    </section>
  );
}
