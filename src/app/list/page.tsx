"use client";

import Link from "next/link";
import PinsList from "@/components/pins/list/PinsList";
import { usePins } from "@/hooks/usePins";
import Breadcrumb from "@/shared/Breadcrumb";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function ListPage() {
  const { user } = useAuth();
  const { locations, attractions, isLoading, error } = usePins();

  return (
    <main className="min-h-[calc(100vh-4rem)]  py-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {!user ? (
          <div className="mt-15 flex min-h-[40vh] flex-col items-center justify-center px-4 py-8 text-center sm:px-6">
            <div className="mb-5">
              <Image
                src="/pin.png"
                alt=""
                width={56}
                height={56}
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
              Sign in to view your list
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Log in to save, manage, and access your pinned destinations and
              attractions.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-(--destination-primary) px-6 text-sm font-medium text-white transition-colors hover:bg-(--destination-secondary) active:scale-95"
            >
              Log In
            </Link>
          </div>
        ) : (
          <>
            {/* 
              Negative margins pull the breadcrumb out just enough to offset 
              its internal padding, aligning its text perfectly with the content below.
            */}
            <div className="-mx-4 mb-4 sm:-mx-6">
              <Breadcrumb destination="Your List" />
            </div>

            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Saved Pins
              </h1>
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
