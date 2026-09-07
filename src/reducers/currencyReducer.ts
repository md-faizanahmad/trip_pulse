import type { CurrencyRate } from "@/types/currency";

export type CurrencyStatus = "idle" | "loading" | "success" | "error";

export type CurrencyState = {
  data: CurrencyRate | null;
  status: CurrencyStatus;
  error: string;
};

export type CurrencyAction =
  | { type: "FETCH_STARTED" }
  | { type: "FETCH_SUCCESS"; data: CurrencyRate }
  | { type: "FETCH_ERROR"; error: string }
  | { type: "FETCH_RESET" };

export const initialCurrencyState: CurrencyState = {
  data: null,
  status: "idle",
  error: "",
};

export function currencyReducer(
  state: CurrencyState,
  action: CurrencyAction,
): CurrencyState {
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
      return initialCurrencyState;

    default:
      return state;
  }
}
