"use client";

import { useEffect, useReducer } from "react";
import type { Destination, SearchResponse } from "@/types/destination";
import { validateDestinationQuery } from "@/validation/validation";

type SearchStatus = "idle" | "loading" | "success" | "error";

type SearchState = {
  destinations: Destination[];
  status: SearchStatus;
  error: string;
};

type SearchAction =
  | { type: "SEARCH_STARTED" }
  | { type: "SEARCH_SUCCESS"; destinations: Destination[] }
  | { type: "SEARCH_ERROR"; error: string }
  | { type: "SEARCH_RESET" };

const initialState: SearchState = {
  destinations: [],
  status: "idle",
  error: "",
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SEARCH_STARTED":
      return {
        destinations: [],
        status: "loading",
        error: "",
      };

    case "SEARCH_SUCCESS":
      return {
        destinations: action.destinations,
        status: "success",
        error: "",
      };

    case "SEARCH_ERROR":
      return {
        destinations: [],
        status: "error",
        error: action.error,
      };

    case "SEARCH_RESET":
      return initialState;

    default:
      return state;
  }
}

export function useDestinationSearch(query: string) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

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
  }, [query]);

  return {
    destinations: state.destinations,
    status: state.status,
    error: state.error,
  };
}
