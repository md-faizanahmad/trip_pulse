"use client";

import { useState } from "react";
import { useCurrency } from "@/hooks/useCurrency";

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
    <section className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Currency Converter
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700">
            Amount
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="Enter amount"
          />
        </label>

        <div className="flex gap-2 sm:pb-0">
          <label className="flex-1 sm:w-28">
            <span className="mb-1.5 block text-sm font-medium text-zinc-700">
              From
            </span>

            <input
              value={fromCurrency}
              onChange={(event) =>
                setFromCurrency(event.target.value.toUpperCase())
              }
              maxLength={3}
              className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm uppercase outline-none focus:border-zinc-400"
              placeholder="USD"
            />
          </label>

          <button
            type="button"
            onClick={handleSwap}
            className="self-end rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            aria-label="Swap currencies"
          >
            ⇄
          </button>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-zinc-700">
            To
          </span>

          <input
            value={toCurrency}
            onChange={(event) =>
              setToCurrency(event.target.value.toUpperCase())
            }
            maxLength={3}
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm uppercase outline-none focus:border-zinc-400"
            placeholder="INR"
          />
        </label>
      </div>

      <div className="rounded-md bg-zinc-50 p-4">
        {status === "loading" && (
          <p className="text-sm text-zinc-500">Loading exchange rate...</p>
        )}

        {status === "error" && <p className="text-sm text-red-600">{error}</p>}

        {status === "success" && convertedAmount !== null && currency && (
          <div>
            <p className="text-xs font-medium text-zinc-500">
              Converted Amount
            </p>

            <p className="mt-1 text-xl font-semibold text-zinc-900">
              {convertedAmount.toFixed(2)} {currency.quote}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              1 {currency.base} = {currency.rate.toFixed(2)} {currency.quote}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
