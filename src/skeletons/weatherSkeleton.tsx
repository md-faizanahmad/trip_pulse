export default function WeatherSkeleton() {
  return (
    <section className="mt-10">
      <div
        className="rounded-2xl bg-zinc-50/80 p-6 sm:p-8"
        aria-label="Loading weather"
        aria-busy="true"
      >
        <div className="grid animate-pulse gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:items-center">
          <div>
            <div className="h-5 w-32 rounded bg-zinc-200" />

            <div className="mt-6 flex items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-zinc-200" />

              <div className="space-y-2">
                <div className="h-8 w-24 rounded bg-zinc-200" />
                <div className="h-4 w-28 rounded bg-zinc-100" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-4 w-20 rounded bg-zinc-200" />
            <div className="h-7 w-28 rounded bg-zinc-200" />
            <div className="h-3 w-40 rounded bg-zinc-100" />
          </div>

          <div className="grid grid-cols-2 gap-5 sm:col-span-2 lg:col-span-1">
            <div className="h-12 rounded bg-zinc-100" />
            <div className="h-12 rounded bg-zinc-100" />
            <div className="h-12 rounded bg-zinc-100" />
          </div>
        </div>
      </div>
    </section>
  );
}
