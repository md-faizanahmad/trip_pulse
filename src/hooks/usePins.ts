"use client";

import { AttractionPinInput, LocationPinInput } from "@/types/pins";
import { useCallback, useEffect, useRef, useState } from "react";

type PinsResponse = {
  locations: LocationPinInput[];
  attractions: AttractionPinInput[];
};

type UsePinsResult = {
  locations: LocationPinInput[];
  attractions: AttractionPinInput[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function usePins(): UsePinsResult {
  const [locations, setLocations] = useState<LocationPinInput[]>([]);
  const [attractions, setAttractions] = useState<AttractionPinInput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchPins = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pins", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please log in to view your list.");
        }

        throw new Error("Unable to load your list.");
      }

      const data: PinsResponse = await response.json();

      setLocations(data.locations);
      setAttractions(data.attractions);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Failed to load pins:", error);

      setError(
        error instanceof Error ? error.message : "Unable to load your list.",
      );
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPins() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/pins", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Please log in to view your list.");
          }

          throw new Error("Unable to load your list.");
        }

        const data: PinsResponse = await response.json();

        if (controller.signal.aborted) {
          return;
        }

        setLocations(data.locations);
        setAttractions(data.attractions);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to load pins:", error);

        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : "Unable to load your list.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPins();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    locations,
    attractions,
    isLoading,
    error,
    refetch: fetchPins,
  };
}
