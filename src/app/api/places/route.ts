import { NextRequest, NextResponse } from "next/server";
import type { Place, PlaceCategory } from "@/types/places";

type OverpassElement = {
  type?: "node" | "way" | "relation";
  id?: number;
  lat?: number;
  lon?: number;
  center?: { lat?: number; lon?: number };
  tags?: { name?: string; [key: string]: string | undefined };
};

type OverpassResponse = {
  elements?: OverpassElement[];
};

// for categories place

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

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const SEARCH_RADIUS = 10_000;

export async function GET(request: NextRequest) {
  const latitude = Number(request.nextUrl.searchParams.get("latitude"));
  const longitude = Number(request.nextUrl.searchParams.get("longitude"));

  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    return NextResponse.json(
      { error: "Valid latitude and longitude are required." },
      { status: 400 },
    );
  }

  const query = `
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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

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
      return NextResponse.json(
        { error: "Places service is currently unavailable." },
        { status: 502 },
      );
    }

    const data: OverpassResponse = await response.json();

    const places: Place[] = (data.elements ?? [])
      .map((element) => {
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

        return {
          id: `${element.type}-${element.id}`,
          name,
          latitude,
          longitude,
          category: getPlaceCategory(element.tags ?? {}),
          address: element.tags?.["addr:street"] ?? null,
          city:
            element.tags?.["addr:city"] ??
            element.tags?.["addr:town"] ??
            element.tags?.["addr:village"] ??
            null,
          country: element.tags?.["addr:country"] ?? null,
          countryCode:
            element.tags?.["addr:country_code"]?.toUpperCase() ?? null,
        };
      })
      .filter((place): place is Place => place !== null);

    const uniquePlaces = places.filter((place, index, allPlaces) => {
      const normalizedName = place.name.toLowerCase();

      return (
        allPlaces.findIndex(
          (item) => item.name.toLowerCase() === normalizedName,
        ) === index
      );
    });

    return NextResponse.json({ places: uniquePlaces });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Places service timed out." },
        { status: 504 },
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch nearby attractions." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
