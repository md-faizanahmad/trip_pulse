"use client";

import Link from "next/link";
import PinsList from "@/components/pins/list/PinsList";
import { usePins } from "@/hooks/usePins";
import Breadcrumb from "@/shared/Breadcrumb";
import { useAuth } from "@/hooks/useAuth";

export default function ListPage() {
  const { user } = useAuth();
  const { locations, attractions, isLoading, error } = usePins();

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50/30 py-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {!user ? (
          <div className="mt-10 flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-50 text-zinc-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Sign in to view your list
            </h2>

            <p className="mt-2 max-w-md text-sm text-zinc-500">
              Log in to save, manage, and access your pinned destinations and
              attractions.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-(--destination-primary) px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-(--destination-secondary) active:scale-95"
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
