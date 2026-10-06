import Image from "next/image";
import type { DestinationPhoto } from "@/types/destination-photo";

type PhotoMasonryCardProps = {
  photo: DestinationPhoto;
  isVisible: boolean;
};

export default function PhotoMasonryCard({
  photo,
  isVisible,
}: PhotoMasonryCardProps) {
  return (
    <article
      className={`overflow-hidden cursor-pointer rounded-xl transition-all duration-500 ${
        isVisible
          ? "scale-100 opacity-100 blur-0"
          : "scale-[0.98] opacity-70 blur-[3px]"
      }`}
    >
      <Image
        src={photo.imageUrl}
        alt={photo.description || "Destination photography"}
        width={1200}
        height={1500}
        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
        className="h-auto w-full object-cover"
      />
    </article>
  );
}
