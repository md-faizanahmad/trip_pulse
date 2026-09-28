"use client";

import { useMemo, useState } from "react";

import { usePlaces } from "@/hooks/usePlaces";
import type { PlaceCategory } from "@/types/places";

import PlacesList from "./PlacesList";

type PlacesProps = {
  latitude: number;
  longitude: number;
};

type CategoryFilter = "all" | PlaceCategory;

const INITIAL_PLACE_COUNT = 6;

const CATEGORY_FILTERS: {
  value: CategoryFilter;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "museum", label: "Museums" },
  { value: "park", label: "Parks" },
  { value: "historical", label: "Historical" },
  { value: "entertainment", label: "Entertainment" },
  { value: "beach", label: "Beaches" },
  { value: "landmark", label: "Landmarks" },
  { value: "other", label: "Other" },
];

export default function Places({ latitude, longitude }: PlacesProps) {
  const { places, status, error, retry } = usePlaces(latitude, longitude);

  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");

  const filteredPlaces = useMemo(() => {
    if (selectedCategory === "all") {
      return places;
    }

    return places.filter((place) => place.category === selectedCategory);
  }, [places, selectedCategory]);

  const visiblePlaces = showAll
    ? filteredPlaces
    : filteredPlaces.slice(0, INITIAL_PLACE_COUNT);

  const hasMorePlaces = filteredPlaces.length > INITIAL_PLACE_COUNT;

  function getGoogleMapsUrl(latitude: number, longitude: number) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  function handleCategoryChange(category: CategoryFilter) {
    setSelectedCategory(category);
    setShowAll(false);
  }

  return (
    <section className="w-full  p-5  sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-(--destination-primary)/30 bg-(--destination-primary)/5 text-(--destination-primary)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-zinc-900 sm:text-lg">
              Attractions & Highlights
            </h2>
            {status === "success" && (
              <p className="mt-0.5 text-sm text-zinc-500">
                {filteredPlaces.length} locations nearby
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Category Filters */}
      {status === "success" && places.length > 0 && (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {CATEGORY_FILTERS.map((category) => {
            const isActive = selectedCategory === category.value;
            const categoryCount =
              category.value === "all"
                ? places.length
                : places.filter((place) => place.category === category.value)
                    .length;

            if (category.value !== "all" && categoryCount === 0) {
              return null;
            }

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryChange(category.value)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-(--destination-primary) text-white shadow-sm"
                    : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
                aria-pressed={isActive}
              >
                {category.label}{" "}
                <span className="opacity-70">({categoryCount})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-24 rounded-xl bg-zinc-100/80 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-red-100 bg-red-50/50 p-5 sm:flex-row">
          <p className="text-sm font-medium text-red-600">{error}</p>
          <button
            type="button"
            onClick={retry}
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-red-600 shadow-sm ring-1 ring-inset ring-red-200 transition-colors hover:bg-red-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {status === "success" && filteredPlaces.length === 0 && (
        <div className="flex min-h-30 items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-6">
          <p className="text-sm font-medium text-zinc-500">
            No nearby attractions were found in this category.
          </p>
        </div>
      )}

      {/* Places List */}
      {status === "success" && filteredPlaces.length > 0 && (
        <div className="animate-in fade-in duration-300">
          <PlacesList
            places={visiblePlaces}
            getGoogleMapsUrl={getGoogleMapsUrl}
          />

          {/* Show All / Show Less */}
          {hasMorePlaces && (
            <div className="mt-6 flex justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-(--destination-primary)/20 bg-(--destination-primary)/5 px-6 text-sm font-semibold text-(--destination-primary) transition-colors hover:bg-(--destination-primary)/10 sm:w-auto"
              >
                <span>
                  {showAll
                    ? "Show Less"
                    : `Show All (${filteredPlaces.length})`}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
