"use client";

import { useLocalTime } from "@/hooks/useLocalTime";
import { useTimezone } from "@/hooks/useTimezone";
import { formatUtcOffset } from "@/utils/timezone";

type LocalTimeProps = {
  latitude: number;
  longitude: number;
};

export default function LocalTime({ latitude, longitude }: LocalTimeProps) {
  const {
    timezone,
    status: timezoneStatus,
    error: timezoneError,
  } = useTimezone(latitude, longitude);

  const localTime = useLocalTime(timezone?.timezone ?? null);

  return (
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
  );
}
