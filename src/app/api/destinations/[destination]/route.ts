import { NextRequest, NextResponse } from "next/server";
import type { Destination } from "@/types/destination";

type NominatimResult = {
  place_id: number;
  osm_type: "node" | "way" | "relation";
  osm_id: number;
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

  const osmType = request.nextUrl.searchParams.get("osmType");
  const osmId = request.nextUrl.searchParams.get("osmId");

  if (!osmType || !osmId) {
    return NextResponse.json(
      { error: "OSM type and OSM ID are required." },
      { status: 400 },
    );
  }

  const url = new URL("https://nominatim.openstreetmap.org/lookup");

  const osmPrefix = osmType.charAt(0).toUpperCase();

  url.searchParams.set("osm_ids", `${osmPrefix}${osmId}`);
  url.searchParams.set("format", "json");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "en");

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
      osmType: result.osm_type,
      osmId: result.osm_id,
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
