"use client";

import { useState } from "react";
import type { CurrencyRate } from "@/types/currency";
import { availableCurrencies } from "@/utils/currency";

type CurrencyConverterProps = {
  defaultFromCurrency: string;
  defaultToCurrency: string;
  currency: CurrencyRate | null;
  status: "idle" | "loading" | "success" | "error";
  error: string;
};

export default function CurrencyConverter({
  defaultFromCurrency,
  defaultToCurrency,
  currency,
  status,
  error,
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState(defaultFromCurrency);
  const [toCurrency, setToCurrency] = useState(defaultToCurrency);

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
    <section className="border-t border-zinc-100 pt-6">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Currency Converter
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Quickly check what your money is worth.
        </p>
      </div>

      <div className="max-w-3xl rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4">
          <label className="block w-full sm:w-36">
            <span className="mb-1.5 block text-xs font-bold text-zinc-600">
              Amount
            </span>

            <div className="flex h-11 items-center rounded-md border border-zinc-200 bg-zinc-50 px-3 transition focus-within:border-zinc-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-zinc-100">
              <span className="mr-2 text-sm font-bold text-zinc-400">#</span>

              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-zinc-900 outline-none"
                placeholder="1"
                aria-label="Amount"
              />
            </div>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="min-w-0 flex-1">
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">
                From
              </span>

              <select
                value={fromCurrency}
                onChange={(event) => setFromCurrency(event.target.value)}
                className="h-11 w-full cursor-pointer rounded-md border border-zinc-200 bg-zinc-50 px-3 text-sm font-semibold text-zinc-900 outline-none transition hover:border-zinc-300 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-100"
              >
                {availableCurrencies.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.symbol} {item.name} · {item.code}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={handleSwap}
              className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-zinc-200 bg-white text-base font-bold text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 sm:self-end"
              aria-label="Swap currencies"
              title="Swap currencies"
            >
              ⇄
            </button>

            <label className="min-w-0 flex-1">
              <span className="mb-1.5 block text-xs font-bold text-zinc-600">
                To
              </span>

              <select
                value={toCurrency}
                onChange={(event) => setToCurrency(event.target.value)}
                className="h-11 w-full cursor-pointer rounded-md border border-zinc-200 bg-zinc-50 px-3 text-sm font-semibold text-zinc-900 outline-none transition hover:border-zinc-300 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-100"
              >
                {availableCurrencies.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.symbol} {item.name} · {item.code}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="rounded-md bg-zinc-900 px-4 py-4 text-white">
            {status === "loading" && (
              <p className="text-sm font-medium text-zinc-300">
                Loading exchange rate...
              </p>
            )}

            {status === "error" && (
              <p className="text-sm font-medium text-red-300">{error}</p>
            )}

            {status === "success" && convertedAmount !== null && currency && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Converted Amount
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight">
                    {currency.quote} {convertedAmount.toFixed(2)}
                  </p>
                </div>

                <p className="text-xs font-medium text-zinc-400">
                  1 {currency.base} = {currency.rate.toFixed(2)}{" "}
                  {currency.quote}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
