import { NextRequest, NextResponse } from "next/server";
import { fetchTransport } from "@/services/transport.service";

export async function GET(request: NextRequest) {
  const latitude = Number(request.nextUrl.searchParams.get("latitude"));
  const longitude = Number(request.nextUrl.searchParams.get("longitude"));

  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    return NextResponse.json(
      { error: "Valid latitude and longitude are required." },
      { status: 400 },
    );
  }

  try {
    const transport = await fetchTransport(latitude, longitude);

    return NextResponse.json({ transport });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Transport service timed out." },
        { status: 504 },
      );
    }

    console.error("Transport API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch transport information." },
      { status: 502 },
    );
  }
}
