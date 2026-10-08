const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const SEARCH_RADIUS = 10_000;
const REQUEST_TIMEOUT = 15_000;

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: Record<string, string>;
};

type OverpassResponse = {
  elements?: OverpassElement[];
};

export async function fetchRestaurants(
  latitude: number,
  longitude: number,
): Promise<OverpassElement[]> {
  const query = `
    [out:json][timeout:25];
    nwr["amenity"="restaurant"]
      (around:${SEARCH_RADIUS},${latitude},${longitude});
    out center tags;
  `;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

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
      throw new Error("Restaurant service is currently unavailable.");
    }

    const data: OverpassResponse = await response.json();

    return data.elements ?? [];
  } finally {
    clearTimeout(timeoutId);
  }
}
