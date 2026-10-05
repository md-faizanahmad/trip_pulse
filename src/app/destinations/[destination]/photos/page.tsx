import DestinationPhotosPage from "@/components/gallery/photos/DestinationPhotosPage";

type PhotosPageProps = {
  params: Promise<{
    destination: string;
  }>;
};

export default async function PhotosPage({ params }: PhotosPageProps) {
  const { destination } = await params;

  return (
    <main className="min-h-screen bg-(--destination-background)">
      <DestinationPhotosPage destination={destination} />
    </main>
  );
}
