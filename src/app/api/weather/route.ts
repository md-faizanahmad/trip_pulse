import { getWeather } from "@/services/weather.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const latitude = request.nextUrl.searchParams.get("latitude");
  const longitude = request.nextUrl.searchParams.get("longitude");

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "Latitude and longitude are required." },
      { status: 400 },
    );
  }

  const latitudeNumber = Number(latitude);
  const longitudeNumber = Number(longitude);

  if (
    !Number.isFinite(latitudeNumber) ||
    !Number.isFinite(longitudeNumber) ||
    latitudeNumber < -90 ||
    latitudeNumber > 90 ||
    longitudeNumber < -180 ||
    longitudeNumber > 180
  ) {
    return NextResponse.json(
      { error: "Invalid latitude or longitude." },
      { status: 400 },
    );
  }

  try {
    const weather = await getWeather(latitudeNumber, longitudeNumber);

    return NextResponse.json(weather);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "WEATHER_SERVICE_UNAVAILABLE"
    ) {
      return NextResponse.json(
        { error: "Weather service is currently unavailable." },
        { status: 502 },
      );
    }

    if (
      error instanceof Error &&
      error.message === "WEATHER_DATA_UNAVAILABLE"
    ) {
      return NextResponse.json(
        { error: "Weather data is unavailable." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch weather data." },
      { status: 502 },
    );
  }
}
