"use client";

import { useEffect, useState } from "react";
import type { Timezone, TimezoneResponse } from "@/types/timezone";

type TimezoneStatus = "idle" | "loading" | "success" | "error";

export function useTimezone(latitude: number, longitude: number) {
  const [timezone, setTimezone] = useState<Timezone | null>(null);
  const [status, setStatus] = useState<TimezoneStatus>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTimezone() {
      setStatus("loading");
      setTimezone(null);
      setError("");

      try {
        const params = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
        });

        const response = await fetch(`/api/timezone?${params.toString()}`, {
          signal: controller.signal,
        });

        const data: TimezoneResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to load timezone.");
        }

        if (!data.timezone) {
          throw new Error("Timezone information is unavailable.");
        }

        setTimezone(data.timezone);
        setStatus("success");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Failed to load timezone.",
        );
        setStatus("error");
      }
    }

    fetchTimezone();

    return () => {
      controller.abort();
    };
  }, [latitude, longitude]);

  return {
    timezone,
    status,
    error,
  };
}
