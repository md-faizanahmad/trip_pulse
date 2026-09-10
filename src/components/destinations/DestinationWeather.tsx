"use client";

import { useWeather } from "@/hooks/useWeather";

import WeatherForecast from "@/components/Weather/WeatherForecast";
import WeatherSkeleton from "@/skeletons/weatherSkeleton";

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
    return <WeatherSkeleton />;
  }

  if (status === "error") {
    return (
      <section className="w-full border-b border-zinc-200 bg-white p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-red-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
            Current Weather
          </h2>
        </div>
        <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
      </section>
    );
  }

  if (!weather?.current) {
    return null;
  }

  const { current, forecast = [] } = weather;

  return (
    <section className="w-full border-b border-zinc-200 bg-white p-4 sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between">
        {/* Left: Weather Status */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#008EEB]" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950">
                Current Weather
              </h2>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <span
                className="text-4xl shrink-0 select-none"
                role="img"
                aria-label={getWeatherCondition(current.weatherCode)}
              >
                {getWeatherIcon(current.weatherCode)}
              </span>
              <div className="flex flex-col">
                <span className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                  {current.temperature ?? "—"}°C
                </span>
                <span className="mt-0.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {getWeatherCondition(current.weatherCode)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Conditions Matrix */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-zinc-200 pt-5 md:w-80 md:border-t-0 md:pt-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-zinc-900" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950">
              Conditions
            </h2>
          </div>

          <div className="grid grid-cols-3 divide-x divide-zinc-200 border border-zinc-200 bg-zinc-50/50">
            {/* Feels Like */}
            <div className="flex flex-col p-3">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                </svg>
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Feels
                </span>
              </div>
              <span className="mt-2 text-sm font-semibold tracking-tight text-zinc-950">
                {current.feelsLike ?? "—"}°C
              </span>
            </div>

            {/* Humidity */}
            <div className="flex flex-col p-3">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                </svg>
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Humidity
                </span>
              </div>
              <span className="mt-2 text-sm font-semibold tracking-tight text-zinc-950">
                {current.humidity ?? "—"}%
              </span>
            </div>

            {/* Wind */}
            <div className="flex flex-col p-3">
              <div className="flex items-center gap-1.5 text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                  <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                  <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
                </svg>
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Wind
                </span>
              </div>
              <span className="mt-2 text-sm font-semibold tracking-tight text-zinc-950">
                {current.windSpeed ?? "—"}{" "}
                <span className="text-[10px] font-normal uppercase text-zinc-500">
                  km/h
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-zinc-200 pt-6">
        <WeatherForecast forecast={forecast} />
      </div>
    </section>
  );
}
