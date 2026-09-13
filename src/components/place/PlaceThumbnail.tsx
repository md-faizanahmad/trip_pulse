"use client";

import Image from "next/image";
import { useState } from "react";

type PlaceThumbnailProps = {
  src: string | null | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function PlaceThumbnail({
  src,
  alt,
  width,
  height,
  className = "",
}: PlaceThumbnailProps) {
  const [isLoading, setIsLoading] = useState(Boolean(src));
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 ${className}`}
        style={{ width, height }}
        aria-label={`No image available for ${alt}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-8 w-8 text-slate-300"
          aria-hidden="true"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${className}`}
      style={{ width, height }}
    >
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse bg-slate-200"
          aria-hidden="true"
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`h-full w-full object-cover transition-opacity duration-200 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
