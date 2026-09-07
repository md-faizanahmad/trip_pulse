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
  const { currency, status, error } = useCurrency(baseCurrency, currencyCode);

  return (
    <section className="space-y-8">
      <CurrencyOverview
        currencyName={currencyName}
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        baseCurrency={baseCurrency}
        rate={currency?.rate ?? null}
        date={currency?.date ?? null}
      />

      <CurrencyConverter
        defaultFromCurrency={baseCurrency}
        defaultToCurrency={currencyCode}
        currency={currency}
        status={status}
        error={error}
      />
    </section>
  );
}
