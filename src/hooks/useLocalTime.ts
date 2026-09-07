"use client";

import { useEffect, useState } from "react";

export function useLocalTime(timezone: string | null) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!timezone) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [timezone]);

  if (!timezone) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(currentTime);
}
