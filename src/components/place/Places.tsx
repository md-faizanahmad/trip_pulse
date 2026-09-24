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
    <section className="w-full bg-white p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-(--destination-primary)"
            aria-hidden="true"
          >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>

          <h2 className="text-xs font-bold uppercase tracking-widest text-(--destination-secondary)">
            Attractions & Highlights
          </h2>
        </div>

        {status === "success" && (
          <span className="font-mono text-[10px] font-bold text-slate-400">
            {filteredPlaces.length} LOCATIONS
          </span>
        )}
      </div>

      {/* Category Filters */}
      {status === "success" && places.length > 0 && (
        <div className="mt-3.5 flex gap-1.5 overflow-x-auto py-2 scrollbar-none">
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
                className={`shrink-0 cursor-pointer border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-(--destination-secondary) bg-(--destination-secondary) text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-(--destination-primary) hover:text-(--destination-primary)"
                }`}
                aria-pressed={isActive}
              >
                {category.label} ({categoryCount})
              </button>
            );
          })}
        </div>
      )}

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="mt-3.5 grid grid-cols-1 border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse border-b border-r border-slate-200 bg-slate-50"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="mt-3.5 flex items-center justify-between gap-3 border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-bold text-red-700">{error}</p>

          <button
            type="button"
            onClick={retry}
            className="inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 border border-(--destination-primary) bg-(--destination-primary) px-3 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:border-(--destination-secondary) hover:bg-(--destination-secondary) active:bg-(--destination-secondary)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
              <path d="M4 5v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
              <path d="M20 19v-4h-4" />
            </svg>

            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {status === "success" && filteredPlaces.length === 0 && (
        <div className="mt-3.5 border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-700">
            No nearby attractions were found in this category.
          </p>
        </div>
      )}

      {/* Places List */}
      {status === "success" && filteredPlaces.length > 0 && (
        <div className="mt-3.5">
          <PlacesList
            places={visiblePlaces}
            getGoogleMapsUrl={getGoogleMapsUrl}
          />

          {/* Show All / Show Less */}
          {hasMorePlaces && (
            <div className="mt-3 flex justify-center md:justify-start">
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                className="inline-flex h-9 w-48 cursor-pointer items-center justify-center gap-1.5 border border-(--destination-primary) bg-(--destination-primary) px-4 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:border-(--destination-secondary) hover:bg-(--destination-secondary) active:bg-(--destination-secondary)"
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
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-3 w-3 transition-transform duration-200 ${
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
