"use client";

import PinsList from "@/components/pins/list/PinsList";
import { usePins } from "@/hooks/usePins";
import Breadcrumb from "@/shared/Breadcrumb";
import { useAuth } from "@/hooks/useAuth";

export default function ListPage() {
  const { user } = useAuth();
  const { locations, attractions, isLoading, error } = usePins();

  return (
    <main className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="ms-8">
        <Breadcrumb destination="Your List" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        {!user ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Please log in
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Sign in to save and access your destinations and attractions.
            </p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </main>
  );
}
