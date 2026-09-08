import { NextRequest, NextResponse } from "next/server";

type TransportStatus = "available" | "unknown";

type OverpassElement = {
  tags?: {
    route?: string;
  };
};

type OverpassResponse = {
  elements?: OverpassElement[];
};

type Transport = {
  metro: TransportStatus;
  bus: TransportStatus;
  train: TransportStatus;
  tram: TransportStatus;
  ferry: TransportStatus;
};

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const SEARCH_RADIUS = 10_000;

const initialTransport: Transport = {
  metro: "unknown",
  bus: "unknown",
  train: "unknown",
  tram: "unknown",
  ferry: "unknown",
};

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
    relation["type"="route"]["route"~"^(subway|bus|train|tram|ferry)$"]
      (around:${SEARCH_RADIUS},${latitude},${longitude});
    out tags;
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
        { error: "Transport service is currently unavailable." },
        { status: 502 },
      );
    }

    const data: OverpassResponse = await response.json();

    const transport: Transport = { ...initialTransport };

    for (const element of data.elements ?? []) {
      const route = element.tags?.route;

      switch (route) {
        case "subway":
          transport.metro = "available";
          break;

        case "bus":
          transport.bus = "available";
          break;

        case "train":
          transport.train = "available";
          break;

        case "tram":
          transport.tram = "available";
          break;

        case "ferry":
          transport.ferry = "available";
          break;
      }
    }

    return NextResponse.json({ transport });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Transport service timed out." },
        { status: 504 },
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch transport information." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
