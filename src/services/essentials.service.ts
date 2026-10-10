const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const SEARCH_RADIUS = 10_000;
const REQUEST_TIMEOUT = 15_000;
const RESULTS_PER_CATEGORY = 3;

type EssentialCategory = "bank" | "atm" | "fuel";

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

export type TravelEssential = {
  id: number;
  type: OverpassElement["type"];
  category: EssentialCategory;
  name: string;
  latitude: number;
  longitude: number;
};

export type TravelEssentials = Record<EssentialCategory, TravelEssential[]>;

export async function fetchTravelEssentials(
  latitude: number,
  longitude: number,
): Promise<TravelEssentials> {
  const query = `
    [out:json][timeout:25];
    (
      nwr["amenity"="bank"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["amenity"="atm"](around:${SEARCH_RADIUS},${latitude},${longitude});
      nwr["amenity"="fuel"](around:${SEARCH_RADIUS},${latitude},${longitude});
    );
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
      throw new Error("Travel essentials service is currently unavailable.");
    }

    const data: OverpassResponse = await response.json();

    const essentials: TravelEssentials = {
      bank: [],
      atm: [],
      fuel: [],
    };

    for (const element of data.elements ?? []) {
      const tags = element.tags;

      if (!tags?.name) continue;

      const category = tags.amenity;

      if (category !== "bank" && category !== "atm" && category !== "fuel") {
        continue;
      }

      if (essentials[category].length >= RESULTS_PER_CATEGORY) continue;

      const elementLatitude = element.lat ?? element.center?.lat;
      const elementLongitude = element.lon ?? element.center?.lon;

      if (elementLatitude === undefined || elementLongitude === undefined) {
        continue;
      }

      essentials[category].push({
        id: element.id,
        type: element.type,
        category,
        name: tags.name,
        latitude: elementLatitude,
        longitude: elementLongitude,
      });
    }

    return essentials;
  } finally {
    clearTimeout(timeoutId);
  }
}
