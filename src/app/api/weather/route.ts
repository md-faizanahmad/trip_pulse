import { NextRequest, NextResponse } from "next/server";

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    sunrise?: string[];
    sunset?: string[];
  };
};

type WeatherForecast = {
  date: string;
  weatherCode: number | null;
  temperatureMax: number | null;
  temperatureMin: number | null;
};

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

  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitudeNumber.toString());
  url.searchParams.set("longitude", longitudeNumber.toString());
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
  );
  url.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
    ].join(","),
  );
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("timezone", "auto");

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Weather service is currently unavailable." },
        { status: 502 },
      );
    }

    const data: OpenMeteoResponse = await response.json();

    if (!data.current || !data.daily) {
      return NextResponse.json(
        { error: "Weather data is unavailable." },
        { status: 502 },
      );
    }

    const forecast: WeatherForecast[] = (data.daily.time ?? []).map(
      (date, index) => ({
        date,
        weatherCode: data.daily?.weather_code?.[index] ?? null,
        temperatureMax: data.daily?.temperature_2m_max?.[index] ?? null,
        temperatureMin: data.daily?.temperature_2m_min?.[index] ?? null,
      }),
    );

    return NextResponse.json({
      current: {
        temperature: data.current.temperature_2m ?? null,
        feelsLike: data.current.apparent_temperature ?? null,
        humidity: data.current.relative_humidity_2m ?? null,
        windSpeed: data.current.wind_speed_10m ?? null,
        weatherCode: data.current.weather_code ?? null,
      },
      sunTimes: {
        sunrise: data.daily.sunrise?.[0] ?? null,
        sunset: data.daily.sunset?.[0] ?? null,
      },
      forecast,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch weather data." },
      { status: 502 },
    );
  }
}
