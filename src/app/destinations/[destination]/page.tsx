import Currency from "@/components/currency/Currency";
import DestinationPlace from "@/components/destinations/DestinationPlace";
import DestinationWeather from "@/components/destinations/DestinationWeather";
import Places from "@/components/place/Places";
import Transport from "@/components/transport/Transport";
import Breadcrumb from "@/shared/Breadcrumb";
import type { Destination } from "@/types/destination";
import { getCurrencyByCountryCode } from "@/utils/currency";

type DestinationPageProps = {
  params: Promise<{
    destination: string;
  }>;
  searchParams: Promise<{
    osmType?: string;
    osmId?: string;
  }>;
};

type DestinationErrorProps = {
  destination: string;
  message: string;
};

function DestinationError({ destination, message }: DestinationErrorProps) {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumb destination={destination} />

        <p className="text-sm text-red-600">{message}</p>
      </div>
    </main>
  );
}

export default async function DestinationPage({
  params,
  searchParams,
}: DestinationPageProps) {
  const { destination } = await params;
  const { osmType, osmId } = await searchParams;

  const name = decodeURIComponent(destination);

  if (!osmType || !osmId) {
    return (
      <DestinationError
        destination={name}
        message="Destination information is unavailable."
      />
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!baseUrl) {
    return (
      <DestinationError
        destination={name}
        message="Application configuration is unavailable."
      />
    );
  }

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
      <DestinationError
        destination={name}
        message="Unable to load destination information right now."
      />
    );
  }

  const data: { destination?: Destination } = await response.json();

  if (!data.destination) {
    return (
      <DestinationError
        destination={name}
        message="Destination information is unavailable."
      />
    );
  }

  const selectedDestination = data.destination;

  const destinationCurrency = getCurrencyByCountryCode(
    selectedDestination.countryCode,
  );

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-8">
        <Breadcrumb destination={selectedDestination.name} />

        <div className="mt-6 sm:mt-8">
          <DestinationPlace destination={selectedDestination} />
        </div>

        <DestinationWeather
          latitude={selectedDestination.latitude}
          longitude={selectedDestination.longitude}
        />

        {destinationCurrency && (
          <div className="mt-8 sm:mt-10">
            <Currency
              currencyName={destinationCurrency.name}
              currencyCode={destinationCurrency.code}
              currencySymbol={destinationCurrency.symbol}
              baseCurrency="USD"
            />
          </div>
        )}

        <Places
          latitude={selectedDestination.latitude}
          longitude={selectedDestination.longitude}
        />
        <Transport
          latitude={selectedDestination.latitude}
          longitude={selectedDestination.longitude}
        />
      </div>
    </main>
  );
}
