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
    country_code?: string;
  };
  osm_type: "node" | "way" | "relation";
  osm_id: number;
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

  const osmType = request.nextUrl.searchParams.get("osmType");
  const osmId = request.nextUrl.searchParams.get("osmId");

  if (!osmType || !osmId) {
    return NextResponse.json(
      { error: "OSM type and OSM ID are required." },
      { status: 400 },
    );
  }

  if (!["node", "way", "relation"].includes(osmType)) {
    return NextResponse.json({ error: "Invalid OSM type." }, { status: 400 });
  }

  if (!/^\d+$/.test(osmId)) {
    return NextResponse.json({ error: "Invalid OSM ID." }, { status: 400 });
  }

  const osmPrefix = osmType === "node" ? "N" : osmType === "way" ? "W" : "R";

  const url = new URL("https://nominatim.openstreetmap.org/lookup");

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

    const result = results[0];

    if (!result) {
      return NextResponse.json(
        { error: `Destination "${destination}" was not found.` },
        { status: 404 },
      );
    }

    const destinationData: Destination = {
      placeId: result.place_id,
      osmType: result.osm_type,
      osmId: result.osm_id,
      name: result.name,
      latitude: Number(result.lat),
      longitude: Number(result.lon),
      displayName: result.display_name,
      country: result.address?.country ?? null,
      countryCode: result.address?.country_code?.toUpperCase() ?? null,
    };

    return NextResponse.json({
      destination: destinationData,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load destination." },
      { status: 502 },
    );
  }
}
