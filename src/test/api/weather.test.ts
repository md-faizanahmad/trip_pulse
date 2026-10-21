import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/weather/route";
import { getWeather } from "@/services/weather.service";

vi.mock("@/services/weather-service", () => ({
  getWeather: vi.fn(),
}));

describe("GET /api/weather", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when coordinates are missing", async () => {
    const request = new NextRequest("http://localhost/api/weather");

    const response = await GET(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Latitude and longitude are required.",
    });
    expect(getWeather).not.toHaveBeenCalled();
  });

  it("returns 400 when coordinates are invalid", async () => {
    const request = new NextRequest(
      "http://localhost/api/weather?latitude=91&longitude=85",
    );

    const response = await GET(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Invalid latitude or longitude.",
    });
    expect(getWeather).not.toHaveBeenCalled();
  });
});
