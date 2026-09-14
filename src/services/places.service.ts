import type { Place, PlaceCategory } from "@/types/places";

type OverpassElement = {
  type?: "node" | "way" | "relation";
  id?: number;
  lat?: number;
  lon?: number;
  center?: {
    lat?: number;
    lon?: number;
  };
  tags?: {
    name?: string;
    [key: string]: string | undefined;
  };
};

type OverpassResponse = {
  elements?: OverpassElement[];
};

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const SEARCH_RADIUS = 10_000;
const REQUEST_TIMEOUT = 15_000;

function getPlaceCategory(
  tags: Record<string, string | undefined>,
): PlaceCategory {
  if (tags.tourism === "museum") {
    return "museum";
  }

  if (
    tags.leisure === "park" ||
    tags.leisure === "garden" ||
    tags.tourism === "botanical_garden"
  ) {
    return "park";
  }

  if (tags.historic !== undefined || tags.tourism === "heritage") {
    return "historical";
  }

  if (
    tags.tourism === "theme_park" ||
    tags.tourism === "zoo" ||
    tags.tourism === "aquarium"
  ) {
    return "entertainment";
  }

  if (tags.natural === "beach" || tags.leisure === "beach_resort") {
    return "beach";
  }

  if (tags.tourism === "viewpoint" || tags.tourism === "attraction") {
    return "landmark";
  }

  return "other";
}

function buildOverpassQuery(latitude: number, longitude: number) {
  return `
    [out:json][timeout:25];
    (
      nwr["tourism"="attraction"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["tourism"="museum"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["tourism"="viewpoint"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["tourism"="theme_park"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["tourism"="zoo"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["tourism"="aquarium"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["tourism"="botanical_garden"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["tourism"="heritage"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["leisure"="park"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["leisure"="garden"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["leisure"="beach_resort"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["natural"="beach"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["historic"](around:${SEARCH_RADIUS},${latitude},${longitude});
    );
    out center;
  `;
}

function normalizePlace(element: OverpassElement): Place | null {
  const latitude = element.lat ?? element.center?.lat;
  const longitude = element.lon ?? element.center?.lon;
  const name = element.tags?.name?.trim();

  if (
    !element.type ||
    element.id === undefined ||
    !name ||
    latitude === undefined ||
    longitude === undefined
  ) {
    return null;
  }

  const tags = element.tags ?? {};

  return {
    id: `${element.type}-${element.id}`,
    name,
    latitude,
    longitude,
    category: getPlaceCategory(tags),
    address: tags["addr:street"] ?? null,
    city:
      tags["addr:city"] ?? tags["addr:town"] ?? tags["addr:village"] ?? null,
    country: tags["addr:country"] ?? null,
    countryCode: tags["addr:country_code"]?.toUpperCase() ?? null,
  };
}

function removeDuplicatePlaces(places: Place[]): Place[] {
  return places.filter((place, index, allPlaces) => {
    const normalizedName = place.name.toLowerCase();

    return (
      allPlaces.findIndex(
        (item) => item.name.toLowerCase() === normalizedName,
      ) === index
    );
  });
}

export async function fetchNearbyPlaces(
  latitude: number,
  longitude: number,
): Promise<Place[]> {
  const query = buildOverpassQuery(latitude, longitude);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(OVERPASS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "TripPulse/1.0",
      },
      body: `data=${encodeURIComponent(query)}`,
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Places service is currently unavailable.");
    }

    const data: OverpassResponse = await response.json();

    const places = (data.elements ?? [])
      .map(normalizePlace)
      .filter((place): place is Place => place !== null);

    return removeDuplicatePlaces(places);
  } finally {
    clearTimeout(timeoutId);
  }
}
