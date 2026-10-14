import { NextRequest, NextResponse } from "next/server";
import { fetchRestaurants } from "@/services/restaurants.service";
import {
  getDestinationCache,
  saveDestinationCache,
} from "@/services/destination-cache.service";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

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

  try {
    const cacheKey = `restaurants:${latitude.toFixed(2)}:${longitude.toFixed(2)}`;

    let restaurants: Awaited<ReturnType<typeof fetchRestaurants>> | null = null;

    try {
      restaurants =
        await getDestinationCache<Awaited<ReturnType<typeof fetchRestaurants>>>(
          cacheKey,
        );
    } catch (error) {
      console.error("Restaurant cache read failed:", error);
    }

    if (restaurants !== null) {
      return NextResponse.json({ restaurants, source: "cache" });
    }

    restaurants = await fetchRestaurants(latitude, longitude);

    if (restaurants.length > 0) {
      try {
        await saveDestinationCache(cacheKey, restaurants, CACHE_TTL_MS);
      } catch (error) {
        console.error("Restaurant cache write failed:", error);
      }
    }

    return NextResponse.json({ restaurants, source: "api" });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Restaurant service timed out." },
        { status: 504 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch restaurants.",
      },
      { status: 502 },
    );
  }
}
