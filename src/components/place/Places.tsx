"use client";

import { useMemo, useState } from "react";
import { usePlaces } from "@/hooks/usePlaces";
import type { PlaceCategory } from "@/types/places";
import PlacesList from "./PlacesList";
import ErrorState from "../common/ErrorState";
import { Map } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

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
        <SectionTitle
          icon={Map}
          title="Attractions & Highlights"
          description={
            status === "success"
              ? `${filteredPlaces.length} locations nearby`
              : undefined
          }
        />
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
                className={`shrink-0 rounded-sm px-4 py-2 text-sm font-medium transition-all ${
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
      {status === "error" && <ErrorState message={error} onRetry={retry} />}
      {status === "success" && filteredPlaces.length === 0 && (
        <div className="flex min-h-30 items-center justify-center  p-6">
          <p className="text-sm font-bold text-red-500">
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
