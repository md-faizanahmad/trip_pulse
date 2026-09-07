"use client";

type DestinationErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DestinationError({ reset }: DestinationErrorProps) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-3xl">
          ⚠️
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-900">
          Something went wrong
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
          We couldn&apos;t load this destination right now. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl  px-5 text-sm font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
