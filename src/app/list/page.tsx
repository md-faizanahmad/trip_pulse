"use client";

import PinsList from "@/components/pins/list/PinsList";
import { usePins } from "@/hooks/usePins";
import Breadcrumb from "@/shared/Breadcrumb";

export default function ListPage() {
  const { locations, attractions, isLoading, error } = usePins();

  return (
    <main className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="ms-8">
        <Breadcrumb destination="Your List" />
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
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
