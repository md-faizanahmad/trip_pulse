type CurrencyOverviewProps = {
  currencyName: string;
  currencyCode: string;
  currencySymbol: string;
  baseCurrency: string;
  rate: number | null;
  date: string | null;
};

export default function CurrencyOverview({
  currencyName,
  currencyCode,
  currencySymbol,
  baseCurrency,
  rate,
  date,
}: CurrencyOverviewProps) {
  return (
    <section className="w-full border-b border-zinc-200 bg-white p-4 sm:p-6">
      {/* Header with status marker */}
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 bg-[#008EEB]" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950">
          Local Currency
        </h2>
      </div>

      {/* Main Grid: Identity & Exchange Rate */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Currency Identity Card */}
        <div className="flex items-center gap-3.5 border border-zinc-200 bg-zinc-50/50 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-zinc-200 bg-white font-mono text-xl font-bold text-zinc-950">
            {currencySymbol}
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Currency
            </span>
            <div className="mt-0.5 flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-bold tracking-tight text-zinc-950">
                {currencyName}
              </h3>
              <span className="border border-zinc-900 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                {currencyCode}
              </span>
            </div>
          </div>
        </div>

        {/* Exchange Rate Card */}
        <div className="flex flex-col justify-between border border-zinc-200 bg-zinc-50/50 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Exchange Rate
            </span>
            {date && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-tight text-zinc-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 shrink-0 text-zinc-400"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="4" rx="0" />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
                <span>{date}</span>
              </span>
            )}
          </div>

          <div className="mt-2 flex items-baseline gap-2 font-mono">
            <span className="text-sm font-bold text-zinc-600">
              1 {baseCurrency}
            </span>
            <span className="font-bold text-zinc-400">=</span>
            <div className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">
              {rate !== null ? (
                <>
                  <span className="font-extrabold text-zinc-950">
                    {currencySymbol}
                    {rate.toFixed(2)}
                  </span>{" "}
                  <span className="text-xs font-bold text-zinc-500">
                    {currencyCode}
                  </span>
                </>
              ) : (
                <span className="font-bold text-zinc-400">—</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
