"use client";

import { useEffect, useReducer } from "react";
import type { TransportResponse, Transport } from "@/types/transport";

type TransportStatus = "idle" | "loading" | "success" | "error";

type TransportState = {
  transport: Transport | null;
  status: TransportStatus;
  error: string;
};

type TransportAction =
  | { type: "FETCH_STARTED" }
  | { type: "FETCH_SUCCESS"; transport: Transport }
  | { type: "FETCH_ERROR"; error: string }
  | { type: "FETCH_RESET" };

const initialState: TransportState = {
  transport: null,
  status: "idle",
  error: "",
};

function transportReducer(
  state: TransportState,
  action: TransportAction,
): TransportState {
  switch (action.type) {
    case "FETCH_STARTED":
      return {
        transport: null,
        status: "loading",
        error: "",
      };

    case "FETCH_SUCCESS":
      return {
        transport: action.transport,
        status: "success",
        error: "",
      };

    case "FETCH_ERROR":
      return {
        transport: null,
        status: "error",
        error: action.error,
      };

    case "FETCH_RESET":
      return initialState;

    default:
      return state;
  }
}

export function useTransport(
  latitude: number | null,
  longitude: number | null,
) {
  const [state, dispatch] = useReducer(transportReducer, initialState);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      dispatch({ type: "FETCH_RESET" });
      return;
    }

    const transportLatitude = latitude;
    const transportLongitude = longitude;
    const controller = new AbortController();

    async function fetchTransport() {
      dispatch({ type: "FETCH_STARTED" });

      try {
        const response = await fetch(
          `/api/transport?latitude=${encodeURIComponent(transportLatitude)}&longitude=${encodeURIComponent(transportLongitude)}`,
          {
            signal: controller.signal,
          },
        );

        const data: TransportResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ?? "Failed to fetch transport information.",
          );
        }

        if (!data.transport) {
          throw new Error("Transport information is unavailable.");
        }

        dispatch({
          type: "FETCH_SUCCESS",
          transport: data.transport,
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
              : "Failed to fetch transport information.",
        });
      }
    }

    fetchTransport();

    return () => controller.abort();
  }, [latitude, longitude]);

  return {
    transport: state.transport,
    status: state.status,
    error: state.error,
  };
}
