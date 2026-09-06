import { NextRequest, NextResponse } from "next/server";

export type GeoNamesTimezoneResponse = {
  timezoneId?: string;
  timezone?: string;
  gmtOffset?: number;
  dstOffset?: number;
  status?: {
    message?: string;
    value?: number;
  };
};

function isValidCoordinate(value: number, min: number, max: number) {
  return Number.isFinite(value) && value >= min && value <= max;
}

export async function GET(request: NextRequest) {
  const latitude = Number(request.nextUrl.searchParams.get("latitude"));
  const longitude = Number(request.nextUrl.searchParams.get("longitude"));

  if (
    !isValidCoordinate(latitude, -90, 90) ||
    !isValidCoordinate(longitude, -180, 180)
  ) {
    return NextResponse.json(
      { error: "Valid latitude and longitude are required." },
      { status: 400 },
    );
  }

  const username = process.env.GEONAMES_USERNAME;

  if (!username) {
    return NextResponse.json(
      { error: "GeoNames configuration is unavailable." },
      { status: 500 },
    );
  }

  const url = new URL("https://secure.geonames.org/timezoneJSON");

  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lng", String(longitude));
  url.searchParams.set("username", username);

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    const data: GeoNamesTimezoneResponse = await response.json();

    if (!response.ok) {
      console.error("GeoNames timezone request failed:", {
        status: response.status,
        message: data.status?.message,
        value: data.status?.value,
      });

      return NextResponse.json(
        { error: "Timezone service is currently unavailable." },
        { status: 502 },
      );
    }

    if (data.status) {
      console.error("GeoNames timezone API error:", data.status);

      return NextResponse.json(
        { error: data.status.message ?? "Unable to load timezone." },
        { status: 502 },
      );
    }

    const timezone = data.timezoneId ?? data.timezone;

    if (!timezone) {
      return NextResponse.json(
        { error: "Timezone information is unavailable." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      timezone: {
        timezone,
        gmtOffset: data.gmtOffset ?? null,
        dstOffset: data.dstOffset ?? null,
      },
    });
  } catch (error) {
    console.error("GeoNames timezone request error:", error);

    return NextResponse.json(
      { error: "Failed to load timezone information." },
      { status: 502 },
    );
  }
}
