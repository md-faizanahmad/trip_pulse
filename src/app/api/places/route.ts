import { NextRequest, NextResponse } from "next/server";
import { fetchNearbyPlaces } from "@/services/places.service";
import {
  getCachedPlaces,
  getStaleCachedPlaces,
  saveCachedPlaces,
} from "@/services/places-cache.service";

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

  const cacheKey = `nearby:${latitude.toFixed(2)}:${longitude.toFixed(2)}`;

  try {
    const cachedPlaces = await getCachedPlaces(cacheKey);

    if (cachedPlaces !== null) {
      return NextResponse.json({
        places: cachedPlaces,
        source: "cache",
      });
    }

    const places = await fetchNearbyPlaces(latitude, longitude);

    try {
      await saveCachedPlaces(cacheKey, places);
    } catch (error) {
      // Cache failures must not prevent successful API results.
      console.error("Failed to cache nearby places:", error);
    }

    return NextResponse.json({ places, source: "api" });
  } catch (error) {
    try {
      const stalePlaces = await getStaleCachedPlaces(cacheKey);

      if (stalePlaces !== null) {
        return NextResponse.json({
          places: stalePlaces,
          source: "stale-cache",
        });
      }
    } catch (cacheError) {
      console.error("Failed to retrieve stale places:", cacheError);
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Places service timed out." },
        { status: 504 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch nearby attractions.",
      },
      { status: 502 },
    );
  }
}
