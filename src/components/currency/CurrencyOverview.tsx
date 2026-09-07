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
    <section className="rounded-lg  p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xl font-bold text-zinc-900">
          {currencySymbol}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Local Currency
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900">
              {currencyName}
            </h2>

            <span className="rounded bg-zinc-900 px-2 py-0.5 text-xs font-bold tracking-wide text-white">
              {currencyCode}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-md bg-zinc-50 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Exchange Rate
        </p>

        <p className="mt-1 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          1 {baseCurrency}
          <span className="mx-2 text-zinc-400">=</span>
          {rate !== null ? (
            <>
              <span className="text-zinc-950">
                {currencySymbol}
                {rate.toFixed(2)}
              </span>{" "}
              <span className="text-base font-bold text-zinc-700">
                {currencyCode}
              </span>
            </>
          ) : (
            "—"
          )}
        </p>

        {date && (
          <p className="mt-1.5 text-xs font-medium text-zinc-500">
            Rate date: {date}
          </p>
        )}
      </div>
    </section>
  );
}
