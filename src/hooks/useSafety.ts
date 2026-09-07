"use client";

import { useEffect, useReducer } from "react";
import type { EmergencyNumbers, SafetyResponse } from "@/types/safety";

type SafetyStatus = "idle" | "loading" | "success" | "error";

type SafetyState = {
  emergency: EmergencyNumbers | null;
  status: SafetyStatus;
  error: string;
};

type SafetyAction =
  | { type: "FETCH_STARTED" }
  | { type: "FETCH_SUCCESS"; emergency: EmergencyNumbers }
  | { type: "FETCH_ERROR"; error: string }
  | { type: "FETCH_RESET" };

const initialState: SafetyState = {
  emergency: null,
  status: "idle",
  error: "",
};

function safetyReducer(state: SafetyState, action: SafetyAction): SafetyState {
  switch (action.type) {
    case "FETCH_STARTED":
      return {
        emergency: null,
        status: "loading",
        error: "",
      };

    case "FETCH_SUCCESS":
      return {
        emergency: action.emergency,
        status: "success",
        error: "",
      };

    case "FETCH_ERROR":
      return {
        emergency: null,
        status: "error",
        error: action.error,
      };

    case "FETCH_RESET":
      return initialState;

    default:
      return state;
  }
}

export function useSafety(countryCode: string | null) {
  const [state, dispatch] = useReducer(safetyReducer, initialState);

  useEffect(() => {
    if (!countryCode) {
      dispatch({ type: "FETCH_RESET" });
      return;
    }

    const safetyCountryCode = countryCode;
    const controller = new AbortController();

    async function fetchSafety() {
      dispatch({ type: "FETCH_STARTED" });

      try {
        const response = await fetch(
          `/api/safety?countryCode=${encodeURIComponent(safetyCountryCode)}`,
          {
            signal: controller.signal,
          },
        );

        const data: SafetyResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ?? "Failed to fetch emergency information.",
          );
        }

        if (!data.emergency) {
          throw new Error("Emergency information is unavailable.");
        }

        dispatch({
          type: "FETCH_SUCCESS",
          emergency: data.emergency,
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
              : "Failed to fetch emergency information.",
        });
      }
    }

    fetchSafety();

    return () => controller.abort();
  }, [countryCode]);

  return {
    emergency: state.emergency,
    status: state.status,
    error: state.error,
  };
}
