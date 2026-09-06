import { Destination, SearchResponse } from "@/types/destination";
import { useState } from "react";

export function useDestinationSearch() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchDestinations(query: string) {
    const searchQuery = query.trim();

    if (!searchQuery) {
      setDestinations([]);
      setError("Please enter a destination.");
      return;
    }

    setIsLoading(true);
    setError("");
    setDestinations([]);

    try {
      const response = await fetch(
        `/api/destinations?q=${encodeURIComponent(searchQuery)}`,
      );

      const data: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to search destinations.");
      }

      setDestinations(data.destinations ?? []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to search destinations.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    destinations,
    isLoading,
    error,
    searchDestinations,
  };
}
