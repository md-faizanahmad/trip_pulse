import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";
import { toggleAttractionPin } from "@/services/pins.service";
import type { AttractionPinInput, OsmType } from "@/types/pins";

const VALID_OSM_TYPES: OsmType[] = ["node", "way", "relation"];

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    let body: Partial<AttractionPinInput>;

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
      category,
      address,
      city,
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
        { error: "Attraction name is required." },
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

    if (typeof category !== "string" || !category.trim()) {
      return NextResponse.json(
        { error: "Attraction category is required." },
        { status: 400 },
      );
    }

    const input: AttractionPinInput = {
      osmType: osmType as OsmType,
      osmId,
      name: name.trim(),
      latitude,
      longitude,
      category: category.trim(),
      address:
        typeof address === "string" && address.trim() ? address.trim() : null,
      city: typeof city === "string" && city.trim() ? city.trim() : null,
      country:
        typeof country === "string" && country.trim() ? country.trim() : null,
      countryCode:
        typeof countryCode === "string" && countryCode.trim()
          ? countryCode.trim().toUpperCase()
          : null,
    };

    const result = await toggleAttractionPin(user.id, input);

    return NextResponse.json(result, {
      status: result.pinned ? 201 : 200,
    });
  } catch (error) {
    console.error("Attraction pin error:", error);

    return NextResponse.json(
      { error: "Unable to update attraction pin." },
      { status: 500 },
    );
  }
}
