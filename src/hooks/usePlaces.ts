"use client";

import { useEffect, useReducer } from "react";
import type { PlacesResponse, Place } from "@/types/places";

type PlacesStatus = "idle" | "loading" | "success" | "error";

type PlacesState = {
  places: Place[];
  status: PlacesStatus;
  error: string;
};

type PlacesAction =
  | { type: "FETCH_STARTED" }
  | { type: "FETCH_SUCCESS"; places: Place[] }
  | { type: "FETCH_ERROR"; error: string }
  | { type: "FETCH_RESET" };

const initialState: PlacesState = {
  places: [],
  status: "idle",
  error: "",
};

function placesReducer(state: PlacesState, action: PlacesAction): PlacesState {
  switch (action.type) {
    case "FETCH_STARTED":
      return {
        places: [],
        status: "loading",
        error: "",
      };

    case "FETCH_SUCCESS":
      return {
        places: action.places,
        status: "success",
        error: "",
      };

    case "FETCH_ERROR":
      return {
        places: [],
        status: "error",
        error: action.error,
      };

    case "FETCH_RESET":
      return initialState;

    default:
      return state;
  }
}

export function usePlaces(latitude: number | null, longitude: number | null) {
  const [state, dispatch] = useReducer(placesReducer, initialState);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      dispatch({ type: "FETCH_RESET" });
      return;
    }

    const controller = new AbortController();
    const placeLatitude = latitude;
    const placeLongitude = longitude;

    async function fetchPlaces() {
      dispatch({ type: "FETCH_STARTED" });

      try {
        const response = await fetch(
          `/api/places?latitude=${encodeURIComponent(placeLatitude)}&longitude=${encodeURIComponent(placeLongitude)}`,
          {
            signal: controller.signal,
          },
        );

        const data: PlacesResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to fetch nearby attractions.");
        }

        dispatch({
          type: "FETCH_SUCCESS",
          places: data.places ?? [],
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        dispatch({
          type: "FETCH_ERROR",
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch nearby attractions.",
        });
      }
    }

    fetchPlaces();

    return () => controller.abort();
  }, [latitude, longitude]);

  return {
    places: state.places,
    status: state.status,
    error: state.error,
  };
}
