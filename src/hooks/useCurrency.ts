"use client";

import { useEffect, useReducer } from "react";
import type { CurrencyResponse } from "@/types/currency";
import {
  currencyReducer,
  initialCurrencyState,
} from "@/reducers/currencyReducer";

export function useCurrency(from: string | null, to: string | null) {
  const [state, dispatch] = useReducer(currencyReducer, initialCurrencyState);

  useEffect(() => {
    if (!from || !to) {
      dispatch({ type: "FETCH_RESET" });
      return;
    }
    const fromCurrency = from;
    const toCurrency = to;
    const controller = new AbortController();

    async function fetchCurrency() {
      dispatch({ type: "FETCH_STARTED" });

      try {
        const response = await fetch(
          `/api/currency?from=${encodeURIComponent(
            fromCurrency,
          )}&to=${encodeURIComponent(toCurrency)}`,
          {
            signal: controller.signal,
          },
        );

        const data: CurrencyResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to fetch currency rate.");
        }

        if (!data.base || !data.quote || typeof data.rate !== "number") {
          throw new Error("Currency rate data is unavailable.");
        }

        dispatch({
          type: "FETCH_SUCCESS",
          data: {
            base: data.base,
            quote: data.quote,
            rate: data.rate,
            date: data.date ?? null,
          },
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
              : "Failed to fetch currency rate.",
        });
      }
    }

    fetchCurrency();

    return () => {
      controller.abort();
    };
  }, [from, to]);

  return {
    currency: state.data,
    status: state.status,
    error: state.error,
  };
}
