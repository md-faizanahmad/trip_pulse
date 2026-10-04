"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  DestinationPhoto,
  DestinationPhotosErrorResponse,
  DestinationPhotosResponse,
} from "@/types/destination-photo";

type GalleryState =
  | { status: "idle" | "loading" }
  | { status: "success"; photos: DestinationPhoto[] }
  | { status: "empty" }
  | {
      status: "error";
      message: string;
      retryable: boolean;
    };

export function useDestinationPhotos(destination: string) {
  const [state, setState] = useState<GalleryState>({
    status: "idle",
  });

  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setRetryCount((count) => count + 1);
  }, []);

  useEffect(() => {
    const query = destination.trim();
    if (!query) return;

    const controller = new AbortController();

    async function fetchPhotos() {
      setState({ status: "loading" });

      try {
        const params = new URLSearchParams({
          destination: query,
        });

        const response = await fetch(
          `/api/destination-photos?${params.toString()}`,
          { signal: controller.signal },
        );

        const data: unknown = await response.json();
        if (!response.ok) {
          const errorData = data as DestinationPhotosErrorResponse;

          setState({
            status: "error",
            message:
              errorData.error?.message ?? "Unable to load destination photos.",
            retryable: errorData.error?.retryable ?? true,
          });

          return;
        }

        const result = data as DestinationPhotosResponse;

        if (!Array.isArray(result.photos)) {
          setState({
            status: "error",
            message: "Received an invalid photo response.",
            retryable: true,
          });

          return;
        }

        setState(
          result.photos.length > 0
            ? { status: "success", photos: result.photos }
            : { status: "empty" },
        );
      } catch {
        if (!controller.signal.aborted) {
          setState({
            status: "error",
            message: "Unable to load destination photos. Please try again.",
            retryable: true,
          });
        }
      }
    }
    void fetchPhotos();
    return () => controller.abort();
  }, [destination, retryCount]);

  if (!destination.trim()) {
    return {
      status: "idle" as const,
      retry,
    };
  }

  return {
    ...state,
    retry,
  };
}
