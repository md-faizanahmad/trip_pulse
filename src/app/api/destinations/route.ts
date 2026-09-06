import { Destination } from "@/types/destination";
import { NextRequest, NextResponse } from "next/server";

type NominatimResult = {
  place_id: number;
  lat: string;
  lon: string;
  name: string;
  display_name: string;
  address?: {
    country?: string;
  };
  osm_type: "node" | "way" | "relation";
  osm_id: number;
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required." },
      { status: 400 },
    );
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");

  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "5");
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

    const destinations: Destination[] = results.map((result) => ({
      placeId: result.place_id,
      osmType: result.osm_type,
      osmId: result.osm_id,
      name: result.name,
      latitude: Number(result.lat),
      longitude: Number(result.lon),
      displayName: result.display_name,
      country: result.address?.country ?? null,
    }));

    return NextResponse.json({ destinations });
  } catch {
    return NextResponse.json(
      { error: "Failed to search locations." },
      { status: 502 },
    );
  }
}
