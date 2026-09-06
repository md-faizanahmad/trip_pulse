"use client";

import { useWeather } from "@/hooks/useWeather";
import { formatWeatherDate, getWeatherCondition } from "@/utils/weather";

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

      {forecast.length > 0 && (
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-zinc-900">
            7-Day Forecast
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {forecast.map((day) => (
              <div
                key={day.date}
                className="rounded-md border border-zinc-200 p-4"
              >
                <p className="text-sm font-medium text-zinc-900">
                  {formatWeatherDate(day.date)}
                </p>

                <p className="mt-2 text-sm text-zinc-600">
                  {getWeatherCondition(day.weatherCode)}
                </p>

                <p className="mt-3 text-sm text-zinc-500">
                  High:{" "}
                  <span className="font-medium text-zinc-900">
                    {day.temperatureMax ?? "—"}°C
                  </span>
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Low:{" "}
                  <span className="font-medium text-zinc-900">
                    {day.temperatureMin ?? "—"}°C
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
