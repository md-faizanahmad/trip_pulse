import DestinationPlace from "@/components/destinations/DestinationPlace";
import DestinationWeather from "@/components/destinations/DestinationWeather";
import Breadcrumb from "@/shared/Breadcrumb";
import type { Destination } from "@/types/destination";

type DestinationPageProps = {
  params: Promise<{
    destination: string;
  }>;
  searchParams: Promise<{
    osmType?: string;
    osmId?: string;
  }>;
};

export default async function DestinationPage({
  params,
  searchParams,
}: DestinationPageProps) {
  const { destination } = await params;
  const { osmType, osmId } = await searchParams;

  const name = decodeURIComponent(destination);

  if (!osmType || !osmId) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumb destination={name} />

          <p className="text-sm text-red-600">
            Destination information is unavailable.
          </p>
        </div>
      </main>
    );
  }

  const baseUrl = "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/destinations/${encodeURIComponent(
      name,
    )}?osmType=${encodeURIComponent(osmType)}&osmId=${encodeURIComponent(
      osmId,
    )}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumb destination={name} />

          <p className="text-sm text-red-600">
            Unable to load destination information right now.
          </p>
        </div>
      </main>
    );
  }

  const data: { destination?: Destination } = await response.json();

  if (!data.destination) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumb destination={name} />

          <p className="text-sm text-red-600">
            Destination information is unavailable.
          </p>
        </div>
      </main>
    );
  }

  const selectedDestination = data.destination;

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Breadcrumb destination={selectedDestination.name} />

        <DestinationPlace destination={selectedDestination} />

        <DestinationWeather
          latitude={selectedDestination.latitude}
          longitude={selectedDestination.longitude}
        />
      </div>
    </main>
  );
}
