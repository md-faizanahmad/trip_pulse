type Restaurant = {
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

export type RestaurantItem = {
  id: number;
  type: Restaurant["type"];
  name: string;
  cuisine: string | null;
  mapsUrl: string | null;
};

export function normalizeRestaurant(restaurant: Restaurant): RestaurantItem {
  const latitude = restaurant.lat ?? restaurant.center?.lat;
  const longitude = restaurant.lon ?? restaurant.center?.lon;

  return {
    id: restaurant.id,
    type: restaurant.type,
    name: restaurant.tags?.name ?? "Unnamed restaurant",
    cuisine: restaurant.tags?.cuisine ?? null,
    mapsUrl:
      latitude !== undefined && longitude !== undefined
        ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
        : null,
  };
}
