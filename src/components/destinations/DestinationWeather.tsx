"use client";

import { useEffect } from "react";
import { useLazyLoad } from "@/hooks/useLazyLoad";
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
  const { ref, isVisible } = useLazyLoad();
  const { weather, status, error, fetchWeather } = useWeather(
    latitude,
    longitude,
    false,
  );

  useEffect(() => {
    if (isVisible) {
      fetchWeather();
    }
  }, [isVisible, fetchWeather]);

  return (
    <div ref={ref} className="min-h-40">
      {!isVisible || status === "idle" || status === "loading" ? (
        <WeatherSkeleton />
      ) : status === "error" ? (
        <section
          role="alert"
          className="w-full border-b border-zinc-200 bg-white p-4 sm:p-6"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
            Current Weather
          </h2>
          <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
        </section>
      ) : !weather?.current ? null : (
        <section className="w-full border-b border-zinc-200 bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between">
            <WeatherStatus
              weatherCode={weather.current.weatherCode}
              temperature={weather.current.temperature}
            />
            <WeatherConditions
              feelsLike={weather.current.feelsLike}
              humidity={weather.current.humidity}
              windSpeed={weather.current.windSpeed}
            />
          </div>

          <div className="mt-6 pt-6">
            <WeatherForecast forecast={weather.forecast ?? []} />
          </div>
        </section>
      )}
    </div>
  );
}
