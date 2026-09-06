"use client";

import { useWeather } from "@/hooks/useWeather";
import WeatherForecast from "@/components/Weather/WeatherForecast";
import { getWeatherCondition, getWeatherIcon } from "@/utils/weather";

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
      <section className="mt-10">
        <div className="rounded-2xl bg-zinc-50/80 p-6 sm:p-8">
          <div className="animate-pulse">
            <div className="h-5 w-32 rounded bg-zinc-200" />
            <div className="mt-6 flex items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-zinc-200" />
              <div className="space-y-2">
                <div className="h-8 w-24 rounded bg-zinc-200" />
                <div className="h-4 w-28 rounded bg-zinc-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="mt-10">
        <div className="rounded-2xl bg-zinc-50/80 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            Current Weather
          </h2>

          <p className="mt-4 text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!weather?.current) {
    return null;
  }

  const { current, forecast = [] } = weather;

  return (
    <section className="mt-10 space-y-10">
      <div className="rounded-2xl bg-zinc-50/80 p-6 sm:p-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">Current Weather</p>

            <div className="mt-4 flex items-center gap-4">
              <span
                className="text-5xl transition-transform duration-300 hover:scale-110"
                role="img"
                aria-label={getWeatherCondition(current.weatherCode)}
              >
                {getWeatherIcon(current.weatherCode)}
              </span>

              <div>
                <p className="text-4xl font-semibold tracking-tight text-zinc-900">
                  {current.temperature ?? "—"}°C
                </p>

                <p className="mt-1 text-sm text-zinc-600">
                  {getWeatherCondition(current.weatherCode)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:min-w-70">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-zinc-400">Feels like</p>
              </div>

              <p className="mt-1 font-medium text-zinc-900">
                {current.feelsLike ?? "—"}°C{" "}
                <span aria-hidden="true" className="text-base">
                  🌡️
                </span>
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-zinc-400">Humidity</p>
              </div>

              <p className="mt-1 font-medium text-zinc-900">
                {current.humidity ?? "—"}%{" "}
                <span aria-hidden="true" className="text-base">
                  💧
                </span>
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs text-zinc-400">Wind</p>
              </div>

              <p className="mt-1 font-medium text-zinc-900">
                {current.windSpeed ?? "—"} km/h{" "}
                <span aria-hidden="true" className="text-base">
                  💨
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <WeatherForecast forecast={forecast} />
    </section>
  );
}
