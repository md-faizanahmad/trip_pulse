import type { DestinationPhoto } from "@/types/destination-photo";
import PhotoMasonryCard from "./PhotoMasonryCard";

type PhotoMasonryProps = {
  photos: DestinationPhoto[];
};

export default function PhotoMasonry({ photos }: PhotoMasonryProps) {
  return (
    <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
      {photos.map((photo, index) => (
        <div key={photo.id} className="mb-3 break-inside-avoid sm:mb-4">
          <PhotoMasonryCard photo={photo} index={index} />
        </div>
      ))}
    </div>
  );
}
