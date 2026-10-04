export default function PhotoCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[280px] w-[82%] shrink-0 snap-center animate-pulse rounded-2xl bg-zinc-200 sm:h-[320px] sm:w-[70%] md:h-[300px] md:w-auto"
    >
      <div className="absolute left-4 top-4 h-8 w-8 rounded-full bg-zinc-300" />

      <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
        <div className="h-3 w-32 rounded bg-zinc-300" />
        <div className="h-4 w-4/5 rounded bg-zinc-300" />
        <div className="h-3 w-28 rounded bg-zinc-300" />
      </div>
    </div>
  );
}
