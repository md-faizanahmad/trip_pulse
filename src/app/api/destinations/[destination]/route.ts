import { NextRequest, NextResponse } from "next/server";
import type { Destination } from "@/types/destination";

type NominatimResult = {
  place_id: number;
  lat: string;
  lon: string;
  name: string;
  display_name: string;
  address?: {
    country?: string;
  };
};

type DestinationRouteProps = {
  params: Promise<{
    destination: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: DestinationRouteProps,
) {
  const { destination } = await params;
  const query = decodeURIComponent(destination).trim();

  if (!query) {
    return NextResponse.json(
      { error: "Destination is required." },
      { status: 400 },
    );
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "TripPulse/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Location service is currently unavailable." },
        { status: 502 },
      );
    }

    const results: NominatimResult[] = await response.json();

    if (results.length === 0) {
      return NextResponse.json(
        { error: "Destination not found." },
        { status: 404 },
      );
    }

    const result = results[0];

    const destination: Destination = {
      placeId: result.place_id,
      name: result.name,
      latitude: Number(result.lat),
      longitude: Number(result.lon),
      displayName: result.display_name,
      country: result.address?.country ?? null,
    };

    return NextResponse.json({ destination });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch destination." },
      { status: 502 },
    );
  }
}
