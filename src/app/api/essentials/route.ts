import { NextRequest, NextResponse } from "next/server";
import { fetchTravelEssentials } from "@/services/essentials.service";
import {
  getDestinationCache,
  saveDestinationCache,
} from "@/services/destination-cache.service";
import { CACHE_TTL } from "@/utils/cache";

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
    const cacheKey = `essentials:${latitude.toFixed(2)}:${longitude.toFixed(2)}`;

    let essentials: Awaited<ReturnType<typeof fetchTravelEssentials>> | null =
      null;

    try {
      essentials =
        await getDestinationCache<
          Awaited<ReturnType<typeof fetchTravelEssentials>>
        >(cacheKey);
    } catch (error) {
      console.error("Travel essentials cache read failed:", error);
    }

    if (essentials !== null) {
      return NextResponse.json({ essentials, source: "cache" });
    }

    essentials = await fetchTravelEssentials(latitude, longitude);

    const hasResults = Object.values(essentials).some(
      (category) => category.length > 0,
    );

    if (hasResults) {
      try {
        await saveDestinationCache(cacheKey, essentials, CACHE_TTL.SEVEN_DAYS);
      } catch (error) {
        console.error("Travel essentials cache write failed:", error);
      }
    }

    return NextResponse.json({ essentials, source: "api" });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Travel essentials service timed out." },
        { status: 504 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch travel essentials.",
      },
      { status: 502 },
    );
  }
}
