"use client";

import { useCallback, useEffect, useState } from "react";

type Restaurant = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: Record<string, string>;
};

type RestaurantsStatus = "idle" | "loading" | "success" | "error";

type UseRestaurantsResult = {
  restaurants: Restaurant[];
  status: RestaurantsStatus;
  error: string | null;
  retry: () => void;
};

export function useRestaurants(
  latitude: number | null,
  longitude: number | null,
): UseRestaurantsResult {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [status, setStatus] = useState<RestaurantsStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      return;
    }

    const controller = new AbortController();

    async function loadRestaurants() {
      setStatus("loading");
      setError(null);

      try {
        const response = await fetch(
          `/api/restaurants?latitude=${latitude}&longitude=${longitude}`,
          { signal: controller.signal },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to fetch restaurants.");
        }

        setRestaurants(data.restaurants ?? []);
        setStatus("success");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setRestaurants([]);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch restaurants.",
        );
        setStatus("error");
      }
    }

    void loadRestaurants();

    return () => controller.abort();
  }, [latitude, longitude, retryCount]);

  return {
    restaurants,
    status,
    error,
    retry,
  };
}
