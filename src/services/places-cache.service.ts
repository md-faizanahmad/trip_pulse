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

export async function saveCachedPlaces(
  cacheKey: string,
  places: Place[],
): Promise<void> {
  // const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const expiresAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
  await db
    .insert(placesCache)
    .values({
      cacheKey,
      places,
      expiresAt,
    })
    .onConflictDoUpdate({
      target: placesCache.cacheKey,
      set: {
        places,
        expiresAt,
        createdAt: new Date(),
      },
    });
}

export async function getStaleCachedPlaces(
  cacheKey: string,
): Promise<Place[] | null> {
  const [cached] = await db
    .select({
      places: placesCache.places,
    })
    .from(placesCache)
    .where(eq(placesCache.cacheKey, cacheKey))
    .limit(1);

  return cached?.places ?? null;
}
