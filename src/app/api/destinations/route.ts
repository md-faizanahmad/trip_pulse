import { NextRequest, NextResponse } from "next/server";

type NominatimResult = {
  lat: string;
  lon: string;
  name: string;
  display_name: string;
  address?: {
    country?: string;
  };
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

    const destinations = results.map((result) => ({
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
