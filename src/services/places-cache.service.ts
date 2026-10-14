import { eq } from "drizzle-orm";
import { db } from "@/db";
import { placesCache } from "@/db/schema";
import type { Place } from "@/types/places";

export async function getCachedPlaces(
  cacheKey: string,
): Promise<Place[] | null> {
  const [cached] = await db
    .select({
      places: placesCache.places,
      expiresAt: placesCache.expiresAt,
    })
    .from(placesCache)
    .where(eq(placesCache.cacheKey, cacheKey))
    .limit(1);

  if (!cached || cached.expiresAt <= new Date()) {
    return null;
  }

  return cached.places;
}
