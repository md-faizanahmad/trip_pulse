import type { Destination } from "@/types/destination";

export type SearchStatus = "idle" | "loading" | "success" | "error";
export type SearchState = {
  destinations: Destination[];
  status: SearchStatus;
  error: string;
};

type SearchAction =
  | { type: "SEARCH_STARTED" }
  | { type: "SEARCH_SUCCESS"; destinations: Destination[] }
  | { type: "SEARCH_ERROR"; error: string }
  | { type: "SEARCH_RESET" };

export const initialState: SearchState = {
  destinations: [],
  status: "idle",
  error: "",
};

export function searchReducer(
  state: SearchState,
  action: SearchAction,
): SearchState {
  switch (action.type) {
    case "SEARCH_STARTED":
      return {
        ...state,
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
