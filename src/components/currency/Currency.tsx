"use client";

import CurrencyConverter from "@/components/currency/CurrencyConverter";
import CurrencyOverview from "@/components/currency/CurrencyOverview";
import { useCurrency } from "@/hooks/useCurrency";

type CurrencyProps = {
  currencyName: string;
  currencyCode: string;
  currencySymbol: string;
  baseCurrency: string;
};

export default function Currency({
  currencyName,
  currencyCode,
  currencySymbol,
  baseCurrency,
}: CurrencyProps) {
  const { currency, status } = useCurrency(baseCurrency, currencyCode);

  const rate = currency?.rate ?? null;
  const date = currency?.date ?? null;

  return (
    <section className="space-y-8">
      <CurrencyOverview
        currencyName={currencyName}
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        baseCurrency={baseCurrency}
        rate={rate}
        date={date}
      />

      <CurrencyConverter
        defaultFromCurrency={baseCurrency}
        defaultToCurrency={currencyCode}
      />

      {status === "error" && (
        <p className="text-sm text-zinc-500">
          Exchange rate is currently unavailable.
        </p>
      )}
    </section>
  );
}
