import { NextRequest, NextResponse } from "next/server";
import { fetchNearbyPlaces } from "@/services/places.service";

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
    const places = await fetchNearbyPlaces(latitude, longitude);

    return NextResponse.json({ places });
  } catch (error) {
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
