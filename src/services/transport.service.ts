import {
  getDestinationCache,
  saveDestinationCache,
} from "@/services/destination-cache.service";
import { CACHE_TTL } from "@/utils/cache";

type TransportStatus = "available" | "unknown";

type OverpassElement = {
  tags?: {
    route?: string;
  };
};

type OverpassResponse = {
  elements?: OverpassElement[];
};

export type Transport = {
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

function normalizeTransport(data: OverpassResponse): Transport {
  const transport: Transport = { ...initialTransport };

  for (const element of data.elements ?? []) {
    switch (element.tags?.route) {
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

  return transport;
}

export async function fetchTransport(
  latitude: number,
  longitude: number,
): Promise<Transport> {
  const cacheKey = `transport:${latitude.toFixed(2)}:${longitude.toFixed(2)}`;

  try {
    const cached = await getDestinationCache<Transport>(cacheKey);

    if (cached !== null) {
      return cached;
    }
  } catch (error) {
    console.error("Transport cache read failed:", error);
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
      throw new Error("Transport service is currently unavailable.");
    }

    const data: OverpassResponse = await response.json();
    const transport = normalizeTransport(data);

    const hasAvailableTransport = Object.values(transport).some(
      (status) => status === "available",
    );

    if (hasAvailableTransport) {
      try {
        await saveDestinationCache(cacheKey, transport, CACHE_TTL.SEVEN_DAYS);
      } catch (error) {
        console.error("Transport cache write failed:", error);
      }
    }

    return transport;
  } finally {
    clearTimeout(timeoutId);
  }
}
