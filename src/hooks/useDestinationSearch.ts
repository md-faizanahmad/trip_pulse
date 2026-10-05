"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DestinationPhotosError,
  fetchDestinationPhotos,
} from "@/services/destination-photos/destination-photos";
import type { DestinationPhoto } from "@/types/destination-photo";

type DestinationPhotosStatus =
  | "idle"
  | "loading"
  | "success"
  | "empty"
  | "error";

type DestinationPhotosState = {
  photos: DestinationPhoto[];
  page: number;
  hasNextPage: boolean;
  status: DestinationPhotosStatus;
  isLoadingMore: boolean;
  error: string | null;
};

const initialState: DestinationPhotosState = {
  photos: [],
  page: 1,
  hasNextPage: false,
  status: "idle",
  isLoadingMore: false,
  error: null,
};

export function useDestinationPhotos(destination: string) {
  const [state, setState] = useState<DestinationPhotosState>(initialState);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const value = destination.trim();

    if (!value) {
      setState(initialState);
      return;
    }

    const controller = new AbortController();

    setState({
      ...initialState,
      status: "loading",
    });

    async function loadPhotos() {
      try {
        const result = await fetchDestinationPhotos({
          destination: value,
          page: 1,
          signal: controller.signal,
        });

        setState({
          photos: result.photos,
          page: result.pagination.page,
          hasNextPage: result.pagination.hasNextPage,
          status: result.photos.length > 0 ? "success" : "empty",
          isLoadingMore: false,
          error: null,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState({
          ...initialState,
          status: "error",
          error:
            error instanceof DestinationPhotosError
              ? error.message
              : "Unable to load destination photos right now.",
        });
      }
    }

    void loadPhotos();

    return () => {
      controller.abort();
    };
  }, [destination, retryKey]);

  const loadMore = useCallback(async () => {
    const value = destination.trim();

    if (
      !value ||
      state.status !== "success" ||
      state.isLoadingMore ||
      !state.hasNextPage
    ) {
      return;
    }

    setState((current) => ({
      ...current,
      isLoadingMore: true,
      error: null,
    }));

    try {
      const result = await fetchDestinationPhotos({
        destination: value,
        page: state.page + 1,
      });

      setState((current) => ({
        ...current,
        photos: [...current.photos, ...result.photos],
        page: result.pagination.page,
        hasNextPage: result.pagination.hasNextPage,
        isLoadingMore: false,
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        isLoadingMore: false,
        error:
          error instanceof DestinationPhotosError
            ? error.message
            : "Unable to load more photos right now.",
      }));
    }
  }, [
    destination,
    state.hasNextPage,
    state.isLoadingMore,
    state.page,
    state.status,
  ]);

  const retry = useCallback(() => {
    setRetryKey((current) => current + 1);
  }, []);

  return {
    photos: state.photos,
    status: state.status,
    error: state.error,
    page: state.page,
    hasNextPage: state.hasNextPage,
    isLoadingMore: state.isLoadingMore,
    loadMore,
    retry,
  };
}
