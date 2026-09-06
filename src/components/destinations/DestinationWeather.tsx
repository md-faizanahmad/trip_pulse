"use client";

import { useWeather } from "@/hooks/useWeather";

type DestinationWeatherProps = {
  latitude: number;
  longitude: number;
};

function getWeatherCondition(weatherCode: number | null) {
  if (weatherCode === null) return "Unknown";

  if (weatherCode === 0) return "Clear sky";
  if ([1, 2, 3].includes(weatherCode)) return "Partly cloudy";
  if ([45, 48].includes(weatherCode)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(weatherCode)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(weatherCode)) return "Rain";
  if ([71, 73, 75, 77].includes(weatherCode)) return "Snow";
  if ([80, 81, 82].includes(weatherCode)) return "Rain showers";
  if ([85, 86].includes(weatherCode)) return "Snow showers";
  if ([95, 96, 99].includes(weatherCode)) return "Thunderstorm";

  return "Unknown";
}

export default function DestinationWeather({
  latitude,
  longitude,
}: DestinationWeatherProps) {
  const { weather, status, error } = useWeather(latitude, longitude);

  if (status === "loading") {
    return (
      <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-900">Current Weather</h2>
        <p className="mt-4 text-sm text-zinc-500">Loading weather...</p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-900">Current Weather</h2>
        <p className="mt-4 text-sm text-red-600">{error}</p>
      </section>
    );
  }

  if (!weather?.current) {
    return null;
  }

  const { current } = weather;

  return (
    <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-zinc-900">Current Weather</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="text-sm text-zinc-500">Temperature</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900">
            {current.temperature ?? "—"}°C
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Condition</p>
          <p className="mt-1 font-medium text-zinc-900">
            {getWeatherCondition(current.weatherCode)}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Feels like</p>
          <p className="mt-1 font-medium text-zinc-900">
            {current.feelsLike ?? "—"}°C
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Humidity</p>
          <p className="mt-1 font-medium text-zinc-900">
            {current.humidity ?? "—"}%
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Wind</p>
          <p className="mt-1 font-medium text-zinc-900">
            {current.windSpeed ?? "—"} km/h
          </p>
        </div>
      </div>
    </section>
  );
}
