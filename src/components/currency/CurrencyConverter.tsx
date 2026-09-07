"use client";

import { useState } from "react";
import { useCurrency } from "@/hooks/useCurrency";
import { availableCurrencies } from "@/utils/currency";

type CurrencyConverterProps = {
  defaultFromCurrency: string;
  defaultToCurrency: string;
};

export default function CurrencyConverter({
  defaultFromCurrency,
  defaultToCurrency,
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState(defaultFromCurrency);
  const [toCurrency, setToCurrency] = useState(defaultToCurrency);

  const { currency, status, error } = useCurrency(fromCurrency, toCurrency);

  const numericAmount = Number(amount);

  const convertedAmount =
    currency && Number.isFinite(numericAmount) && numericAmount >= 0
      ? numericAmount * currency.rate
      : null;

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <section className="space-y-4 p-4 sm:p-5 border-t border-zinc-100 pt-6">
      <div className="min-w-0 ">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Currency Converter
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Convert an amount between currencies.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="w-full sm:w-28">
          <span className="mb-1.5 block text-xs font-medium text-zinc-600">
            Amount
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            placeholder="1"
          />
        </label>

        <label className="flex-1">
          <span className="mb-1.5 block text-xs font-medium text-zinc-600">
            From
          </span>

          <select
            value={fromCurrency}
            onChange={(event) => setFromCurrency(event.target.value)}
            className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
          >
            {availableCurrencies.map((item) => (
              <option key={item.code} value={item.code}>
                {item.symbol} {item.name} ({item.code})
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={handleSwap}
          className="flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-md border border-zinc-200 bg-white text-lg text-zinc-600 transition hover: hover:text-zinc-900"
          aria-label="Swap currencies"
          title="Swap currencies"
        >
          ⇄
        </button>

        <label className="flex-1">
          <span className="mb-1.5 block text-xs font-medium text-zinc-600">
            To
          </span>

          <select
            value={toCurrency}
            onChange={(event) => setToCurrency(event.target.value)}
            className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
          >
            {availableCurrencies.map((item) => (
              <option key={item.code} value={item.code}>
                {item.symbol} {item.name} ({item.code})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-md  px-4 py-3">
        {status === "loading" && (
          <p className="text-sm text-zinc-500">Loading exchange rate...</p>
        )}

        {status === "error" && <p className="text-sm text-red-600">{error}</p>}

        {status === "success" && convertedAmount !== null && currency && (
          <div className="flex flex-row gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500">
                Converted Amount
              </p>

              <p className="mt-0.5 text-xl font-semibold text-zinc-900">
                {convertedAmount.toFixed(2)} {currency.quote}
              </p>
              <p className="text-xs text-zinc-500">
                1 {currency.base} = {currency.rate.toFixed(2)} {currency.quote}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
