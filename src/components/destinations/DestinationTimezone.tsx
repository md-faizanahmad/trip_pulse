"use client";

import { useEffect, useState } from "react";
import { useTimezone } from "@/hooks/useTimezone";

type DestinationTimezoneProps = {
  latitude: number;
  longitude: number;
};

function formatLocalTime(timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

function formatUtcOffset(offset: number | null) {
  if (offset === null) {
    return "—";
  }

  const sign = offset >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(offset);
  const hours = Math.floor(absoluteOffset);
  const minutes = Math.round((absoluteOffset - hours) * 60);

  return `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}

export default function DestinationTimezone({
  latitude,
  longitude,
}: DestinationTimezoneProps) {
  const { timezone, status, error } = useTimezone(latitude, longitude);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  if (status === "loading") {
    return (
      <section className="mt-10">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-28 rounded bg-zinc-200" />
          <div className="h-8 w-32 rounded bg-zinc-200" />
          <div className="h-4 w-40 rounded bg-zinc-100" />
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="mt-10">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  console.log("Timezone data:", timezone);
  if (!timezone) {
    return null;
  }

  const localTime = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone.timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(currentTime);

  return (
    <section className="mt-10">
      <div>
        <p className="text-sm font-medium text-zinc-500">Local Time</p>

        <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
          {localTime}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
          <span>{timezone.timezone}</span>

          <span>{formatUtcOffset(timezone.gmtOffset)}</span>
        </div>
      </div>
    </section>
  );
}
