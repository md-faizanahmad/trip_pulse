"use client";

import { useWeather } from "@/hooks/useWeather";

import WeatherForecast from "@/components/Weather/WeatherForecast";
import WeatherSkeleton from "@/skeletons/weatherSkeleton";

import { getWeatherCondition, getWeatherIcon } from "@/utils/weather";
import { Droplets, Thermometer, Wind } from "lucide-react";

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
              <span
                className="h-2 w-2 bg-(--destination-primary)"
                aria-hidden="true"
              />
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950">
                Current Weather
              </h2>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <span
                className="shrink-0 text-4xl select-none"
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
        <div className="flex shrink-0 flex-col gap-4 md:w-80">
          {/* Header with Pulse Accent */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 bg-(--destination-primary)"
                aria-hidden="true"
              />

              <h2 className="font-mono text-[11px] font-black uppercase tracking-widest text-(--destination-secondary)">
                Live Atmosphere
              </h2>
            </div>

            <span className="font-mono text-[9px] font-bold tracking-wider text-slate-400">
              TELEMETRY
            </span>
          </div>

          {/* Open Floating Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {/* Feels Like */}
            <div className="group flex flex-col justify-between py-1 transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5">
                <Thermometer
                  size={14}
                  strokeWidth={2.4}
                  className="text-[#09ac14] transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />

                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-(--destination-secondary)">
                  Feels
                </span>
              </div>

              <div className="mt-2 font-mono text-base font-black tracking-tight text-(--destination-secondary) sm:text-lg">
                {current.feelsLike ?? "—"}
                <span className="text-xs font-semibold text-slate-400">°C</span>
              </div>
            </div>

            {/* Humidity */}
            <div className="group flex flex-col justify-between py-1 transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5">
                <Droplets
                  size={14}
                  strokeWidth={2.4}
                  className="text-(--destination-primary) transition-transform duration-300 group-hover:scale-125"
                  aria-hidden="true"
                />

                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-(--destination-secondary)">
                  Humidity
                </span>
              </div>

              <div className="mt-2 font-mono text-base font-black tracking-tight text-(--destination-secondary) sm:text-lg">
                {current.humidity ?? "—"}
                <span className="text-xs font-semibold text-slate-400">%</span>
              </div>
            </div>

            {/* Wind Flow Animation */}
            <div className="group flex flex-col justify-between py-1 transition-transform duration-200 hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5">
                <Wind
                  size={14}
                  strokeWidth={2.4}
                  className="text-[#cd261a] transition-all duration-300 motion-safe:animate-[pulse_2.5s_ease-in-out_infinite] group-hover:translate-x-1.5"
                  aria-hidden="true"
                />

                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-(--destination-secondary)">
                  Wind
                </span>
              </div>

              <div className="mt-2 font-mono text-base font-black tracking-tight text-(--destination-secondary) sm:text-lg">
                {current.windSpeed ?? "—"}{" "}
                <span className="text-[10px] font-bold uppercase tracking-normal text-slate-400">
                  km/h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6">
        <WeatherForecast forecast={forecast} />
      </div>
    </section>
  );
}
