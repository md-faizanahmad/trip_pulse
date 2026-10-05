"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useDestinationPhotos } from "@/hooks/useDestinationPhotos";
import PhotoCard from "@/components/gallery/PhotoCard";
import PhotoCardSkeleton from "@/components/gallery/PhotoCardSkeleton";
import MobilePhotoCarousel from "@/components/gallery/MobilePhotoCarousel";

type DestinationGalleryProps = {
  destination: string;
};

const PHOTO_COUNT = 4;

export default function DestinationGallery({
  destination,
}: DestinationGalleryProps) {
  const gallery = useDestinationPhotos(destination);

  const photos =
    gallery.status === "success" ? gallery.photos.slice(0, PHOTO_COUNT) : [];

  if (!destination.trim()) return null;

  const photosPath = `/destinations/$
        {encodeURIComponent(destination.trim().toLowerCase())}/photos`;

  return (
    <section
      aria-labelledby="destination-gallery-heading"
      className="mt-10 sm:mt-12"
    >
      <div className="mb-6 sm:mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--destination-secondary)">
          Visual inspiration
        </p>

        <h2
          id="destination-gallery-heading"
          className="text-2xl font-semibold tracking-tight text-(--destination-primary) sm:text-3xl"
        >
          Moments in {destination}
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
          A glimpse of the places, streets, and scenery waiting to be explored.
        </p>
      </div>

      {gallery.status === "loading" && (
        <>
          <div className="gallery-scroll -mx-4 flex gap-3 overflow-hidden px-4 md:hidden">
            {Array.from({ length: PHOTO_COUNT }, (_, index) => (
              <PhotoCardSkeleton key={index} />
            ))}
          </div>

          <div className="hidden grid-cols-2 gap-4 md:grid lg:grid-cols-4">
            {Array.from({ length: PHOTO_COUNT }, (_, index) => (
              <PhotoCardSkeleton key={index} />
            ))}
          </div>
        </>
      )}

      {gallery.status === "success" && (
        <>
          <MobilePhotoCarousel photos={photos} />

          <div className="hidden grid-cols-2 gap-4 md:grid lg:grid-cols-4">
            {photos.map((photo, index) => (
              <PhotoCard key={photo.id} photo={photo} index={index} />
            ))}
          </div>
        </>
      )}

      {gallery.status === "empty" && (
        <p className="rounded-2xl bg-zinc-50 px-5 py-10 text-center text-sm text-zinc-500">
          No photos are available for this destination yet.
        </p>
      )}

      {gallery.status === "error" && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-zinc-50 p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-zinc-600">{gallery.message}</p>

          {gallery.retryable && (
            <button
              type="button"
              onClick={gallery.retry}
              className="shrink-0 text-sm font-semibold text-(--destination-primary) underline underline-offset-4"
            >
              Try again
            </button>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Link
          href={photosPath}
          className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2.5 text-sm font-medium text-(--destination-primary) transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          Explore all photos
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
