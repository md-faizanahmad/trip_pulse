import type { Destination } from "@/types/destination";

type DestinationPlaceProps = {
  destination: Destination;
};

export default function DestinationPlace({
  destination,
}: DestinationPlaceProps) {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
        {destination.name}
      </h1>

      <p className="mt-2 text-sm text-zinc-600">{destination.displayName}</p>
    </section>
  );
}
