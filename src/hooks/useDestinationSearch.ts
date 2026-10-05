"use client";

import { useEffect, useReducer, useState } from "react";
import type { SearchResponse } from "@/types/destination";
import { validateDestinationQuery } from "@/validation/validation";
import {
  initialState,
  searchReducer,
} from "@/reducers/destinationSearchReducer";

export function useDestinationSearch(query: string) {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const searchQuery = query.trim();
    const validationError = validateDestinationQuery(searchQuery);

    if (validationError) {
      dispatch({ type: "SEARCH_RESET" });
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      dispatch({ type: "SEARCH_STARTED" });

      try {
        const response = await fetch(
          `/api/destinations?q=${encodeURIComponent(searchQuery)}`,
          {
            signal: controller.signal,
          },
        );

        const data: SearchResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to search destinations.");
        }

        dispatch({
          type: "SEARCH_SUCCESS",
          destinations: data.destinations ?? [],
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        dispatch({
          type: "SEARCH_ERROR",
          error:
            error instanceof Error
              ? error.message
              : "Failed to search destinations.",
        });
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query, retryKey]);

  function retry() {
    setRetryKey((current) => current + 1);
  }

  return {
    destinations: state.destinations,
    status: state.status,
    error: state.error,
    retry,
  };
}
