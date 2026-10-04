export default function PhotoCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative h-90 w-[82%] shrink-0 snap-center animate-pulse overflow-hidden rounded-2xl bg-zinc-200 sm:w-[70%] md:h-97.5 md:w-auto md:shrink md:snap-align-none"
    >
      {/* Photo number placeholder */}
      <div className="absolute left-4 top-4 h-9 w-9 rounded-full bg-zinc-300" />

      {/* Photo details placeholder */}
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-5 sm:p-6">
        <div className="h-3 w-32 rounded bg-zinc-300" />
        <div className="h-4 w-4/5 rounded bg-zinc-300" />
        <div className="h-3 w-28 rounded bg-zinc-300" />
      </div>
    </div>
  );
}
