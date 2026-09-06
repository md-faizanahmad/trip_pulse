"use client";

import { useEffect, useReducer } from "react";
import type { WeatherResponse } from "@/types/weather";

type WeatherStatus = "idle" | "loading" | "success" | "error";

type WeatherState = {
  data: WeatherResponse | null;
  status: WeatherStatus;
  error: string;
};

type WeatherAction =
  | { type: "FETCH_STARTED" }
  | { type: "FETCH_SUCCESS"; data: WeatherResponse }
  | { type: "FETCH_ERROR"; error: string }
  | { type: "FETCH_RESET" };

const initialState: WeatherState = {
  data: null,
  status: "idle",
  error: "",
};

function weatherReducer(
  state: WeatherState,
  action: WeatherAction,
): WeatherState {
  switch (action.type) {
    case "FETCH_STARTED":
      return {
        data: null,
        status: "loading",
        error: "",
      };

    case "FETCH_SUCCESS":
      return {
        data: action.data,
        status: "success",
        error: "",
      };

    case "FETCH_ERROR":
      return {
        data: null,
        status: "error",
        error: action.error,
      };

    case "FETCH_RESET":
      return initialState;

    default:
      return state;
  }
}

export function useWeather(latitude: number | null, longitude: number | null) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      dispatch({ type: "FETCH_RESET" });
      return;
    }

    const controller = new AbortController();

    async function fetchWeather() {
      dispatch({ type: "FETCH_STARTED" });

      try {
        const response = await fetch(
          `/api/weather?latitude=${latitude}&longitude=${longitude}`,
          {
            signal: controller.signal,
          },
        );

        const data: WeatherResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to fetch weather.");
        }

        dispatch({
          type: "FETCH_SUCCESS",
          data,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        dispatch({
          type: "FETCH_ERROR",
          error:
            error instanceof Error ? error.message : "Failed to fetch weather.",
        });
      }
    }

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, [latitude, longitude]);

  return {
    weather: state.data,
    status: state.status,
    error: state.error,
  };
}
