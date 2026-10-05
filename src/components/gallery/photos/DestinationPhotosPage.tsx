"use client";

import PhotosPageHeader from "@/components/gallery/photos/PhotosPageHeader";
import PhotoMasonry from "@/components/gallery/photos/PhotoMasonry";
import { useDestinationPhotos } from "@/hooks/useDestinationPhotos";

type DestinationPhotosPageProps = {
  destination: string;
};

export default function DestinationPhotosPage({
  destination,
}: DestinationPhotosPageProps) {
  const gallery = useDestinationPhotos(destination);

  return (
    <section className="mx-auto w-full max-w-7xl">
      <PhotosPageHeader
        destination={destination}
        photoCount={gallery.photos.length}
      />

      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        {gallery.status === "loading" && (
          <div className="py-16 text-center text-sm text-(--destination-secondary)">
            Loading photos...
          </div>
        )}

        {gallery.status === "error" && (
          <div className="py-16 text-center">
            <p className="text-sm text-(--destination-secondary)">
              {gallery.error ?? "Unable to load destination photos right now."}
            </p>

            <button
              type="button"
              onClick={gallery.retry}
              className="mt-3 text-sm font-semibold text-(--destination-primary) underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        )}

        {gallery.status === "empty" && (
          <div className="py-16 text-center text-sm text-(--destination-secondary)">
            No photos found for this destination.
          </div>
        )}

        {(gallery.status === "success" || gallery.photos.length > 0) && (
          <PhotoMasonry photos={gallery.photos} />
        )}
      </div>
    </section>
  );
}
