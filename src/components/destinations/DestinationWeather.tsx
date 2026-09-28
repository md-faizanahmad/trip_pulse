"use client";

import { useWeather } from "@/hooks/useWeather";

import WeatherForecast from "@/components/Weather/WeatherForecast";
import WeatherSkeleton from "@/skeletons/weatherSkeleton";
import WeatherStatus from "./WeatherStatus";
import WeatherConditions from "./WeatherConditions";

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
          <span className="h-2 w-2 bg-red-600" aria-hidden="true" />

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
    <section className="w-full border-b border-zinc-200 bg-white p-4  sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between">
        <WeatherStatus
          weatherCode={current.weatherCode}
          temperature={current.temperature}
        />

        <WeatherConditions
          feelsLike={current.feelsLike}
          humidity={current.humidity}
          windSpeed={current.windSpeed}
        />
      </div>

      <div className="mt-6 pt-6">
        <WeatherForecast forecast={forecast} />
      </div>
    </section>
  );
}
