import PhotosPageHeader from "@/components/gallery/photos/PhotosPageHeader";

type PhotosPageProps = {
  params: Promise<{
    destination: string;
  }>;
};

export default async function PhotosPage({ params }: PhotosPageProps) {
  const { destination } = await params;

  return (
    <main className="min-h-screen bg-(--destination-background)">
      <PhotosPageHeader destination={destination} />
    </main>
  );
}
