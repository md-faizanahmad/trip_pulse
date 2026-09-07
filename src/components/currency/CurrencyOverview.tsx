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
    <section className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Local Currency
        </p>

        <div className="mt-2 flex items-baseline gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
            {currencyName}
          </h2>

          <span className="text-sm font-medium text-zinc-500">
            {currencyCode}
          </span>

          <span className="text-lg font-medium text-zinc-700">
            {currencySymbol}
          </span>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Exchange Rate
        </p>

        <p className="mt-2 text-lg font-semibold text-zinc-900">
          1 {baseCurrency} ={" "}
          {rate !== null ? `${currencySymbol}${rate.toFixed(2)}` : "—"}{" "}
          {currencyCode}
        </p>

        {date && (
          <p className="mt-1 text-xs text-zinc-500">Rate date: {date}</p>
        )}
      </div>
    </section>
  );
}
