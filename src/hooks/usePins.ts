"use client";

import { useCallback, useEffect, useState } from "react";

import type { AttractionPin, LocationPin } from "@/types/pins";

type PinsResponse = {
  locations: LocationPin[];
  attractions: AttractionPin[];
};

type UsePinsResult = {
  locations: LocationPin[];
  attractions: AttractionPin[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function usePins(): UsePinsResult {
  const [locations, setLocations] = useState<LocationPin[]>([]);
  const [attractions, setAttractions] = useState<AttractionPin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPins = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pins", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        signal,
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Please log in to view your list.");
          return;
        }

        throw new Error("Unable to load your list.");
      }

      const data: PinsResponse = await response.json();

      if (signal?.aborted) {
        return;
      }

      setLocations(data.locations);
      setAttractions(data.attractions);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      if (!signal?.aborted) {
        console.error("Failed to load pins:", error);

        setError(
          error instanceof Error ? error.message : "Unable to load your list.",
        );
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();

    const loadPins = async () => {
      await fetchPins(controller.signal);
    };

    void loadPins();

    return () => {
      controller.abort();
    };
  }, [fetchPins]);

  const refetch = useCallback(async () => {
    await fetchPins();
  }, [fetchPins]);

  return {
    locations,
    attractions,
    isLoading,
    error,
    refetch,
  };
}
