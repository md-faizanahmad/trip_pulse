import Breadcrumb from "@/shared/Breadcrumb";

type PhotosPageHeaderProps = {
  destination: string;
  photoCount?: number;
};

export default function PhotosPageHeader({
  destination,
  photoCount,
}: PhotosPageHeaderProps) {
  const name = decodeURIComponent(destination).replace(/-/g, " ");

  return (
    <header className="mx-auto w-full max-w-7xl px-4 pb-6 pt-8 sm:px-6 sm:pb-8 sm:pt-10 lg:px-8">
      <Breadcrumb
        items={[
          {
            label: "Dubai",
            href: "/destinations/dubai",
          },
          {
            label: "Photos",
          },
        ]}
      />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--destination-primary)">
        Destination photos
      </p>

      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold capitalize tracking-tight text-(--destination-text) sm:text-4xl lg:text-5xl">
            {name}
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-(--destination-secondary) sm:text-base">
            Explore places, streets, landmarks, and moments from {name}.
          </p>
        </div>

        {photoCount !== undefined && (
          <span className="text-sm font-medium text-(--destination-secondary)">
            {photoCount} photos
          </span>
        )}
      </div>
    </header>
  );
}
