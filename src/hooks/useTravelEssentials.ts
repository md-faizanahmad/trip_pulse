"use client";

import { useCallback, useEffect, useState } from "react";
import type { TravelEssentials } from "@/services/essentials.service";

type TravelEssentialsStatus = "idle" | "loading" | "success" | "error";

type UseTravelEssentialsResult = {
  essentials: TravelEssentials;
  status: TravelEssentialsStatus;
  error: string | null;
  retry: () => void;
};

const EMPTY_ESSENTIALS: TravelEssentials = {
  bank: [],
  atm: [],
  fuel: [],
};

export function useTravelEssentials(
  latitude: number | null,
  longitude: number | null,
): UseTravelEssentialsResult {
  const [essentials, setEssentials] =
    useState<TravelEssentials>(EMPTY_ESSENTIALS);
  const [status, setStatus] = useState<TravelEssentialsStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  const hasCoordinates =
    latitude !== null &&
    longitude !== null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude);

  useEffect(() => {
    if (!hasCoordinates) return;

    const controller = new AbortController();

    async function loadEssentials() {
      setStatus("loading");
      setError(null);

      try {
        const params = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
        });

        const response = await fetch(`/api/essentials?${params}`, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to fetch travel essentials.");
        }

        setEssentials(data.essentials ?? EMPTY_ESSENTIALS);
        setStatus("success");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setEssentials(EMPTY_ESSENTIALS);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch travel essentials.",
        );
        setStatus("error");
      }
    }

    void loadEssentials();

    return () => controller.abort();
  }, [latitude, longitude, hasCoordinates, retryCount]);

  if (!hasCoordinates) {
    return {
      essentials: EMPTY_ESSENTIALS,
      status: "idle",
      error: null,
      retry,
    };
  }

  return { essentials, status, error, retry };
}
