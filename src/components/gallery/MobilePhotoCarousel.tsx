"use client";

import { useRef, useState } from "react";
import PhotoCard from "@/components/gallery/PhotoCard";
import type { DestinationPhoto } from "@/types/destination-photo";

type MobilePhotoCarouselProps = {
  photos: DestinationPhoto[];
};

export default function MobilePhotoCarousel({
  photos,
}: MobilePhotoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>("[data-mobile-card]");

    const center =
      container.getBoundingClientRect().left + container.clientWidth / 2;

    let nearestIndex = 0;
    let nearestDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(center - (rect.left + rect.width / 2));

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  }

  function goToPhoto(index: number) {
    const cards =
      containerRef.current?.querySelectorAll<HTMLElement>("[data-mobile-card]");

    cards?.[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    setActiveIndex(index);
  }

  return (
    <div className="md:hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="gallery-scroll -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            data-mobile-card
            className={`w-[82%] shrink-0 snap-center transition-all duration-300 ${
              activeIndex === index
                ? "scale-100 opacity-100 blur-0"
                : "scale-[0.96] opacity-70 blur-[1px]"
            }`}
          >
            <PhotoCard photo={photo} index={index} />
          </div>
        ))}
      </div>

      {photos.length > 1 && (
        <div className="mt-1 flex justify-center gap-2">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => goToPhoto(index)}
              aria-label={`Go to photo ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === index
                  ? "w-6 bg-(--destination-secondary)"
                  : "w-1.5 bg-zinc-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
