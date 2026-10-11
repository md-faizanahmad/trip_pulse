import type { PlaceCategory } from "@/types/places";

type Place = {
  category: PlaceCategory;
};

type CategoryFilter = "all" | PlaceCategory;

export function getCategoryCount(
  places: Place[],
  category: CategoryFilter,
): number {
  if (category === "all") {
    return places.length;
  }

  return places.filter((place) => place.category === category).length;
}

export function getVisiblePlaces<T>(
  places: T[],
  showAll: boolean,
  initialCount: number,
): T[] {
  return showAll ? places : places.slice(0, initialCount);
}

export function hasMorePlaces(total: number, initialCount: number): boolean {
  return total > initialCount;
}

export function getGoogleMapsUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}
