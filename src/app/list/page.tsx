"use client";

import PinsList from "@/components/pins/list/PinsList";
import { usePins } from "@/hooks/usePins";

export default function ListPage() {
  const { locations, attractions, isLoading, error } = usePins();

  return (
    <main className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-(--destination-primary)">
            Your List
          </span>

          <h1 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-zinc-950 sm:text-3xl">
            Saved Places
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
            Your saved destinations and attractions in one place.
          </p>
        </div>

        <PinsList
          locations={locations}
          attractions={attractions}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </main>
  );
}
