import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { attractionPins, locationPins } from "@/db/schema";
import type {
  AttractionPinInput,
  LocationPinInput,
  PinToggleResult,
} from "@/types/pins";

export async function toggleLocationPin(
  userId: string,
  input: LocationPinInput,
): Promise<PinToggleResult> {
  const existingPin = await db
    .select({ id: locationPins.id })
    .from(locationPins)
    .where(
      and(
        eq(locationPins.userId, userId),
        eq(locationPins.osmType, input.osmType),
        eq(locationPins.osmId, input.osmId),
      ),
    )
    .limit(1);

  const pin = existingPin[0];

  if (pin) {
    await db.delete(locationPins).where(eq(locationPins.id, pin.id));

    return {
      pinned: false,
    };
  }

  await db.insert(locationPins).values({
    userId,
    osmType: input.osmType,
    osmId: input.osmId,
    name: input.name,
    latitude: input.latitude,
    longitude: input.longitude,
    displayName: input.displayName,
    country: input.country,
    countryCode: input.countryCode,
  });

  return {
    pinned: true,
  };
}

export async function toggleAttractionPin(
  userId: string,
  input: AttractionPinInput,
): Promise<PinToggleResult> {
  const existingPin = await db
    .select({ id: attractionPins.id })
    .from(attractionPins)
    .where(
      and(
        eq(attractionPins.userId, userId),
        eq(attractionPins.osmType, input.osmType),
        eq(attractionPins.osmId, input.osmId),
      ),
    )
    .limit(1);

  const pin = existingPin[0];

  if (pin) {
    await db.delete(attractionPins).where(eq(attractionPins.id, pin.id));

    return {
      pinned: false,
    };
  }

  await db.insert(attractionPins).values({
    userId,
    osmType: input.osmType,
    osmId: input.osmId,
    name: input.name,
    latitude: input.latitude,
    longitude: input.longitude,
    category: input.category,
    address: input.address,
    city: input.city,
    country: input.country,
    countryCode: input.countryCode,
  });

  return {
    pinned: true,
  };
}

export async function getUserPins(userId: string) {
  const [locations, attractions] = await Promise.all([
    db.select().from(locationPins).where(eq(locationPins.userId, userId)),

    db.select().from(attractionPins).where(eq(attractionPins.userId, userId)),
  ]);

  return {
    locations,
    attractions,
  };
}
