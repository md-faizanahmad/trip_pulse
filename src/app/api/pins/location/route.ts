import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";
import { toggleLocationPin } from "@/services/pins.service";
import type { LocationPinInput, OsmType } from "@/types/pins";

const VALID_OSM_TYPES: OsmType[] = ["node", "way", "relation"];

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    let body: Partial<LocationPinInput>;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const {
      osmType,
      osmId,
      name,
      latitude,
      longitude,
      displayName,
      country,
      countryCode,
    } = body;

    if (
      typeof osmType !== "string" ||
      !VALID_OSM_TYPES.includes(osmType as OsmType)
    ) {
      return NextResponse.json({ error: "Invalid OSM type." }, { status: 400 });
    }

    if (typeof osmId !== "string" || !/^\d+$/.test(osmId)) {
      return NextResponse.json({ error: "Invalid OSM ID." }, { status: 400 });
    }

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Location name is required." },
        { status: 400 },
      );
    }

    if (
      typeof latitude !== "number" ||
      !Number.isFinite(latitude) ||
      latitude < -90 ||
      latitude > 90
    ) {
      return NextResponse.json({ error: "Invalid latitude." }, { status: 400 });
    }

    if (
      typeof longitude !== "number" ||
      !Number.isFinite(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      return NextResponse.json(
        { error: "Invalid longitude." },
        { status: 400 },
      );
    }

    if (typeof displayName !== "string" || !displayName.trim()) {
      return NextResponse.json(
        { error: "Display name is required." },
        { status: 400 },
      );
    }

    const input: LocationPinInput = {
      osmType: osmType as OsmType,
      osmId,
      name: name.trim(),
      latitude,
      longitude,
      displayName: displayName.trim(),
      country:
        typeof country === "string" && country.trim() ? country.trim() : null,
      countryCode:
        typeof countryCode === "string" && countryCode.trim()
          ? countryCode.trim().toUpperCase()
          : null,
    };

    const result = await toggleLocationPin(user.id, input);

    return NextResponse.json(result, {
      status: result.pinned ? 201 : 200,
    });
  } catch (error) {
    console.error("Location pin error:", error);

    return NextResponse.json(
      { error: "Unable to update location pin." },
      { status: 500 },
    );
  }
}
