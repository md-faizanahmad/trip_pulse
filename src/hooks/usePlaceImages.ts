"use client";

import { useEffect, useState } from "react";
import type { Place } from "@/types/places";

type PlaceImages = Record<string, string | null>;

const MAX_IMAGE_PLACES = 5;

export function usePlaceImages(places: Place[]) {
  const [images, setImages] = useState<PlaceImages>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const imagePlaces = places.slice(0, MAX_IMAGE_PLACES);

    if (imagePlaces.length === 0) {
      return;
    }

    const controller = new AbortController();

    async function fetchImages() {
      setLoading(true);

      try {
        const results = await Promise.all(
          imagePlaces.map(async (place) => {
            try {
              const response = await fetch(
                `/api/images?query=${encodeURIComponent(place.name)}`,
                {
                  signal: controller.signal,
                },
              );

              if (!response.ok) {
                return [place.id, null] as const;
              }

              const data: { imageUrl?: string | null } = await response.json();

              return [place.id, data.imageUrl ?? null] as const;
            } catch (error) {
              if (
                error instanceof DOMException &&
                error.name === "AbortError"
              ) {
                return null;
              }

              return [place.id, null] as const;
            }
          }),
        );

        if (controller.signal.aborted) {
          return;
        }

        const nextImages: PlaceImages = {};

        for (const result of results) {
          if (result !== null) {
            nextImages[result[0]] = result[1];
          }
        }

        setImages(nextImages);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchImages();

    return () => {
      controller.abort();
    };
  }, [places]);

  return {
    images,
    loading,
  };
}
