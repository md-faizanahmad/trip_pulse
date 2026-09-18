export default function ListPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="text-center">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-(--destination-primary)">
          Your List
        </span>

        <h1 className="mt-2 text-xl font-extrabold uppercase tracking-tight text-zinc-950 sm:text-2xl">
          Coming Soon
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-xs font-medium leading-relaxed text-zinc-500">
          Your saved destinations and trips will appear here.
        </p>
      </div>
    </main>
  );
}
