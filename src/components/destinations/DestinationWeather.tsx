"use client";

import { useWeather } from "@/hooks/useWeather";
import WeatherForecast from "@/components/Weather/WeatherForecast";
import { getWeatherCondition } from "@/utils/weather";

type DestinationWeatherProps = {
  latitude: number;
  longitude: number;
};

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

  const { current, forecast = [] } = weather;

  return (
    <section className="mt-8 space-y-8">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
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
      </div>

      <WeatherForecast forecast={forecast} />
    </section>
  );
}
