"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type DestinationPhoto = {
  id: string;
  description: string | null;
  imageUrl: string;
  thumbnailUrl: string;
  photoUrl: string;
  photographerName: string;
  photographerUrl: string;
};

type DestinationGalleryProps = {
  destination: string;
};

type GalleryState = "loading" | "success" | "empty" | "error";

export default function DestinationGallery({
  destination,
}: DestinationGalleryProps) {
  const [photos, setPhotos] = useState<DestinationPhoto[]>([]);
  const [status, setStatus] = useState<GalleryState>("loading");

  useEffect(() => {
    if (!destination.trim()) {
      return;
    }

    const controller = new AbortController();

    async function fetchPhotos() {
      setStatus("loading");

      try {
        const params = new URLSearchParams({
          destination: destination.trim(),
        });

        const response = await fetch(
          `/api/destination-photos?${params.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch destination photos.");
        }

        const data: { photos: DestinationPhoto[] } = await response.json();

        if (!Array.isArray(data.photos) || data.photos.length === 0) {
          setPhotos([]);
          setStatus("empty");
          return;
        }

        setPhotos(data.photos);
        setStatus("success");
      } catch {
        if (!controller.signal.aborted) {
          setStatus("error");
        }
      }
    }

    void fetchPhotos();

    return () => controller.abort();
  }, [destination]);

  return (
    <section
      aria-labelledby="destination-gallery-heading"
      className="mt-8 sm:mt-10"
    >
      <div className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-(--destination-secondary)">
          Discover the destination
        </p>

        <h2
          id="destination-gallery-heading"
          className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl"
        >
          Photos of {destination}
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Get a glimpse of what makes this place special.
        </p>
      </div>

      {status === "loading" && (
        <div
          aria-label="Loading destination photos"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="aspect-[4/3] animate-pulse rounded-xl bg-zinc-200"
            />
          ))}
        </div>
      )}

      {status === "success" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <article key={photo.id} className="min-w-0">
              <a
                href={photo.photoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View photo of ${destination} by ${photo.photographerName} on Unsplash`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--destination-secondary)"
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.description || `${destination} travel photo`}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>

              <p className="mt-2 truncate text-xs text-zinc-500">
                Photo by{" "}
                <a
                  href={photo.photographerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-zinc-700 underline underline-offset-2"
                >
                  {photo.photographerName}
                </a>{" "}
                on{" "}
                <a
                  href={photo.photoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-zinc-700 underline underline-offset-2"
                >
                  Unsplash
                </a>
              </p>
            </article>
          ))}
        </div>
      )}

      {status === "empty" && (
        <p className="py-8 text-center text-sm text-zinc-500">
          No photos found for this destination.
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="py-8 text-center text-sm text-zinc-500">
          Unable to load destination photos. Please try again later.
        </p>
      )}
    </section>
  );
}
