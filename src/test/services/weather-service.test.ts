import { getWeather } from "@/services/weather.service";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("getWeather", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws when the weather API returns an unsuccessful response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Internal Server Error", { status: 500 }),
    );

    await expect(getWeather(25.5941, 85.1376)).rejects.toThrow(
      "WEATHER_SERVICE_UNAVAILABLE",
    );
  });

  it("throws when the network request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );

    await expect(getWeather(25.5941, 85.1376)).rejects.toThrow(
      "Failed to fetch",
    );
  });

  it("throws when required weather data is missing", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          current: {
            temperature_2m: 28,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    await expect(getWeather(25.5941, 85.1376)).rejects.toThrow(
      "WEATHER_DATA_UNAVAILABLE",
    );
  });

  it("requests weather for the correct coordinates and forecast settings", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          current: {},
          daily: {},
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    await getWeather(25.5941, 85.1376);

    const requestedUrl = new URL(String(fetchMock.mock.calls[0][0]));

    expect(requestedUrl.origin).toBe("https://api.open-meteo.com");
    expect(requestedUrl.pathname).toBe("/v1/forecast");
    expect(requestedUrl.searchParams.get("latitude")).toBe("25.5941");
    expect(requestedUrl.searchParams.get("longitude")).toBe("85.1376");
    expect(requestedUrl.searchParams.get("forecast_days")).toBe("7");
    expect(requestedUrl.searchParams.get("timezone")).toBe("auto");
  });

  it("uses null for missing weather fields", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          current: {},
          daily: {
            time: ["2026-10-21"],
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const result = await getWeather(25.5941, 85.1376);

    expect(result.current).toEqual({
      temperature: null,
      feelsLike: null,
      humidity: null,
      windSpeed: null,
      weatherCode: null,
    });

    expect(result.sunTimes).toEqual({
      sunrise: null,
      sunset: null,
    });

    expect(result.forecast).toEqual([
      {
        date: "2026-10-21",
        weatherCode: null,
        temperatureMax: null,
        temperatureMin: null,
      },
    ]);
  });

  it("fetches and transforms weather data successfully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          current: {
            temperature_2m: 28,
            relative_humidity_2m: 65,
            apparent_temperature: 30,
            weather_code: 2,
            wind_speed_10m: 12,
          },
          daily: {
            time: ["2026-10-21", "2026-10-22"],
            weather_code: [2, 3],
            temperature_2m_max: [32, 31],
            temperature_2m_min: [24, 23],
            sunrise: ["2026-10-21T06:00", "2026-10-22T06:01"],
            sunset: ["2026-10-21T17:30", "2026-10-22T17:29"],
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const result = await getWeather(25.5941, 85.1376);

    expect(result.current).toEqual({
      temperature: 28,
      feelsLike: 30,
      humidity: 65,
      windSpeed: 12,
      weatherCode: 2,
    });

    expect(result.sunTimes).toEqual({
      sunrise: "2026-10-21T06:00",
      sunset: "2026-10-21T17:30",
    });

    expect(result.forecast).toHaveLength(2);
    expect(result.forecast[0]).toEqual({
      date: "2026-10-21",
      weatherCode: 2,
      temperatureMax: 32,
      temperatureMin: 24,
    });

    expect(fetch).toHaveBeenCalledOnce();
  });
});
