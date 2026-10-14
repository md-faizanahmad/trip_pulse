import { eq } from "drizzle-orm";
import { db } from "@/db";
import { destinationCache } from "@/db/schema";

export async function getDestinationCache<T>(
  cacheKey: string,
): Promise<T | null> {
  const [entry] = await db
    .select({
      data: destinationCache.data,
      expiresAt: destinationCache.expiresAt,
    })
    .from(destinationCache)
    .where(eq(destinationCache.cacheKey, cacheKey))
    .limit(1);

  if (!entry || entry.expiresAt.getTime() <= Date.now()) {
    return null;
  }

  return entry.data as T;
}

export async function saveDestinationCache(
  cacheKey: string,
  data: unknown,
  ttlMs: number,
): Promise<void> {
  if (!Number.isFinite(ttlMs) || ttlMs <= 0) {
    throw new Error("Cache TTL must be a positive number.");
  }

  const expiresAt = new Date(Date.now() + ttlMs);

  await db
    .insert(destinationCache)
    .values({ cacheKey, data, expiresAt })
    .onConflictDoUpdate({
      target: destinationCache.cacheKey,
      set: {
        data,
        expiresAt,
        createdAt: new Date(),
      },
    });
}
