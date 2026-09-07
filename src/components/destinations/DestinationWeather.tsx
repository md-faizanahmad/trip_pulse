"use client";

import { useLocalTime } from "@/hooks/useLocalTime";
import { useTimezone } from "@/hooks/useTimezone";
import { useWeather } from "@/hooks/useWeather";

import WeatherForecast from "@/components/Weather/WeatherForecast";
import WeatherSkeleton from "@/skeletons/weatherSkeleton";

import { getWeatherCondition, getWeatherIcon } from "@/utils/weather";
import { formatUtcOffset } from "@/utils/timezone";

type DestinationWeatherProps = {
  latitude: number;
  longitude: number;
};

export default function DestinationWeather({
  latitude,
  longitude,
}: DestinationWeatherProps) {
  const { weather, status, error } = useWeather(latitude, longitude);

  const {
    timezone,
    status: timezoneStatus,
    error: timezoneError,
  } = useTimezone(latitude, longitude);

  const localTime = useLocalTime(timezone?.timezone ?? null);

  if (status === "loading") {
    return <WeatherSkeleton />;
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
      <div className="w-full   p-5  sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Local Time */}
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Local Time
            </h2>

            {timezoneStatus === "loading" && (
              <div
                className="flex w-full flex-col gap-2 animate-pulse"
                aria-label="Loading local time"
                aria-busy="true"
              >
                <div className="h-8 w-24 rounded-md bg-zinc-200" />
                <div className="h-4 w-32 rounded-md bg-zinc-100" />
              </div>
            )}

            {timezone && localTime && (
              <div className="flex flex-col items-start">
                <span className="text-3xl font-semibold tracking-tight text-zinc-900">
                  {localTime}
                </span>
                <span className="text-sm font-medium text-zinc-600">
                  {timezone.timezone} · {formatUtcOffset(timezone.gmtOffset)}
                </span>
              </div>
            )}

            {timezoneStatus === "error" && (
              <span className="text-sm font-medium text-rose-500">
                {timezoneError}
              </span>
            )}
          </div>
          {/* Current Weather */}
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Current Weather
            </h2>
            <div className="flex items-center gap-3">
              <span
                className="text-4xl transition-transform duration-300 hover:scale-105"
                role="img"
                aria-label={getWeatherCondition(current.weatherCode)}
              >
                {getWeatherIcon(current.weatherCode)}
              </span>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold tracking-tight text-zinc-900">
                  {current.temperature ?? "—"}°C
                </span>
                <span className="text-sm font-medium text-zinc-600">
                  {getWeatherCondition(current.weatherCode)}
                </span>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="flex flex-col items-start gap-3 sm:col-span-2 lg:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Conditions
            </h2>
            <div className="grid w-full grid-cols-3 gap-2 rounded-xl bg-zinc-50 p-4 border border-zinc-100/50">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500">Feels like</span>
                <span className="mt-1 text-sm font-semibold text-zinc-900">
                  {current.feelsLike ?? "—"}°C
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-zinc-500">Humidity</span>
                <span className="mt-1 text-sm font-semibold text-zinc-900">
                  {current.humidity ?? "—"}%
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-zinc-500">Wind</span>
                <span className="mt-1 text-sm font-semibold text-zinc-900">
                  {current.windSpeed ?? "—"}{" "}
                  <span className="text-xs font-medium text-zinc-500">
                    km/h
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WeatherForecast forecast={forecast} />
    </section>
  );
}
