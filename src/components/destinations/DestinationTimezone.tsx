"use client";

import { useEffect, useState } from "react";
import { useTimezone } from "@/hooks/useTimezone";

type DestinationTimezoneProps = {
  latitude: number;
  longitude: number;
};

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
      <section className="mt-8">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-20 rounded bg-zinc-200" />
          <div className="h-6 w-28 rounded bg-zinc-200" />
          <div className="h-3 w-36 rounded bg-zinc-100" />
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="mt-8">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

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
    <section className="mt-8 ms-5">
      <div>
        <p className="text-sm font-medium text-zinc-500">Local Time</p>

        <p className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
          {localTime}
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          {timezone.timezone} · {formatUtcOffset(timezone.gmtOffset)}
        </p>
      </div>
    </section>
  );
}
