import Image from "next/image";
import { Camera } from "lucide-react";
import type { DestinationPhoto } from "@/types/destination-photo";

type PhotoCardProps = {
  photo: DestinationPhoto;
  index: number;
  isActive?: boolean;
};

export default function PhotoCard({
  photo,
  index,
  isActive = true,
}: PhotoCardProps) {
  return (
    <article
      className={`group cursor-pointer relative h-90 w-[82%] shrink-0 snap-center overflow-hidden rounded-2xl transition-all duration-500 sm:w-[70%] md:h-97.5 md:w-auto md:shrink ${
        isActive
          ? "scale-100 opacity-100 blur-0"
          : "scale-[0.94] opacity-65 blur-[1.5px]"
      }`}
    >
      <Image
        src={photo.imageUrl}
        alt={photo.description || "Destination photography"}
        fill
        sizes="(max-width: 767px) 82vw, (max-width: 1023px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Improve text contrast over the image */}
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-black/10" />

      {/* Photo index */}
      <span className="absolute left-4 top-4 flex h-9 min-w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 px-2 text-xs font-medium text-white backdrop-blur-md">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className=" cursor-pointer
    absolute inset-x-0 bottom-0 p-5 text-white sm:p-6
    translate-y-3 opacity-100
    transition-all duration-300 ease-out
    md:translate-y-3 md:opacity-0
    md:group-hover:translate-y-0 md:group-hover:opacity-100
    md:group-focus-within:translate-y-0
    md:group-focus-within:opacity-100
  "
      >
        <p className="mb-2 flex items-center gap-2 text-xs text-white/75">
          <Camera size={14} aria-hidden="true" />
          Destination photography
        </p>

        <p className="line-clamp-2 text-sm font-medium leading-relaxed">
          {photo.description || "Discover this destination"}
        </p>

        <a
          href={photo.photographerUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View photographer ${photo.photographerName}`}
          className="
      mt-3 inline-block text-xs text-white/70
      underline decoration-white/30 underline-offset-4
      transition-colors hover:text-white
    "
        >
          Photo by {photo.photographerName}
        </a>
      </div>
    </article>
  );
}
