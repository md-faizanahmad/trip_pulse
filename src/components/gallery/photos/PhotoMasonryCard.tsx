import Image from "next/image";
import { Camera } from "lucide-react";
import type { DestinationPhoto } from "@/types/destination-photo";

type PhotoMasonryCardProps = {
  photo: DestinationPhoto;
  index: number;
};

export default function PhotoMasonryCard({
  photo,
  index,
}: PhotoMasonryCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl bg-zinc-100">
      <Image
        src={photo.imageUrl}
        alt={photo.description || "Destination photography"}
        width={1200}
        height={900}
        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
        className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Desktop hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />

      {/* Photo number */}
      {/* <span className="absolute left-3 top-3 flex h-8 min-w-8 items-center justify-center rounded-full border border-white/30 bg-black/25 px-2 text-[11px] font-medium text-white opacity-100 backdrop-blur-md md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
        {String(index + 1).padStart(2, "0")}
      </span> */}

      {/* Photo details */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-100 md:translate-y-2 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <p className="mb-1.5 flex items-center gap-1.5 text-[11px] text-white/75">
          <Camera size={13} aria-hidden="true" />
          Destination photography
        </p>

        {photo.description && (
          <p className="line-clamp-2 text-xs font-medium leading-relaxed">
            {photo.description}
          </p>
        )}

        <a
          href={photo.photographerUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View photographer ${photo.photographerName}`}
          className="pointer-events-auto mt-2 inline-block text-[11px] text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
        >
          Photo by {photo.photographerName}
        </a>
      </div>
    </article>
  );
}
