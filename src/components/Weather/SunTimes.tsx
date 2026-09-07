"use client";

import { useWeather } from "@/hooks/useWeather";

type SunTimesProps = {
  latitude: number;
  longitude: number;
};

function formatSunTime(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export default function SunTimes({ latitude, longitude }: SunTimesProps) {
  const { weather, status } = useWeather(latitude, longitude);

  if (status === "loading") {
    return (
      <div
        className="mb-3 grid grid-cols-2 gap-3 animate-pulse"
        aria-label="Loading sunrise and sunset"
        aria-busy="true"
      >
        <div className="h-12 rounded-md bg-zinc-100" />
        <div className="h-12 rounded-md bg-zinc-100" />
      </div>
    );
  }

  if (status === "error" || !weather?.sunTimes) {
    return null;
  }

  return (
    <div className="mb-3 grid grid-cols-2 gap-3">
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden="true">
          ☀️
        </span>

        <div>
          <p className="text-[11px] font-medium text-zinc-500">Sunrise</p>
          <p className="text-sm font-semibold text-zinc-900">
            {formatSunTime(weather.sunTimes.sunrise)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden="true">
          🌅
        </span>

        <div>
          <p className="text-[11px] font-medium text-zinc-500">Sunset</p>
          <p className="text-sm font-semibold text-zinc-900">
            {formatSunTime(weather.sunTimes.sunset)}
          </p>
        </div>
      </div>
    </div>
  );
}
