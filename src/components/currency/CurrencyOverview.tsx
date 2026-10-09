import React from "react";
import SectionTitle from "../common/SectionTitle";

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
    <section className="w-full  p-5  sm:p-6">
      {/* Identity Section */}

      <SectionTitle
        iconContent={
          <span className="text-xl font-medium" aria-hidden="true">
            {currencySymbol}
          </span>
        }
        iconVariant="circle"
        title={currencyName}
        description={`Local Currency · ${currencyCode}`}
      />

      {/* Exchange Rate Card */}
      <div className="mt-6  p-4 sm:p-5 hover:bg-(--destination-primary)/5 cursor-pointer">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Current Exchange Rate
          </span>

          {date && (
            <span className="flex items-center gap-1.5 text-xs text-zinc-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Updated {date}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-3 sm:mt-4">
          <span className="text-lg font-medium text-zinc-500 sm:text-xl">
            1 {baseCurrency}
          </span>

          <svg
            className="h-4 w-4 text-zinc-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>

          {rate !== null ? (
            <div className="flex items-baseline gap-1.5">
              {/* Branded Output Rate */}
              <span className="text-3xl font-semibold tracking-tight text-(--destination-primary) sm:text-4xl">
                {currencySymbol}
                {rate.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-sm font-medium text-zinc-500">
                {currencyCode}
              </span>
            </div>
          ) : (
            <span className="text-3xl font-medium text-zinc-300">—</span>
          )}
        </div>
      </div>
    </section>
  );
}
