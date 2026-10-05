"use client";

import { useEffect, useRef, useState } from "react";
import type { DestinationPhoto } from "@/types/destination-photo";
import PhotoMasonryCard from "./PhotoMasonryCard";

type PhotoMasonryProps = {
  photos: DestinationPhoto[];
};

export default function PhotoMasonry({ photos }: PhotoMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visiblePhotos, setVisiblePhotos] = useState<Set<string>>(new Set());

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisiblePhotos((current) => {
          const next = new Set(current);

          entries.forEach((entry) => {
            const photoId = entry.target.getAttribute("data-photo-id");

            if (!photoId) {
              return;
            }

            if (entry.isIntersecting) {
              next.add(photoId);
            } else {
              next.delete(photoId);
            }
          });

          return next;
        });
      },
      {
        threshold: 0.2,
      },
    );

    const items = container.querySelectorAll("[data-photo-id]");

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [photos]);

  return (
    <div
      ref={containerRef}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      {photos.map((photo) => (
        <div
          key={photo.id}
          data-photo-id={photo.id}
          className="w-[78vw] shrink-0 snap-center sm:w-auto"
        >
          <PhotoMasonryCard
            photo={photo}
            isVisible={visiblePhotos.has(photo.id)}
          />
        </div>
      ))}
    </div>
  );
}
