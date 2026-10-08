"use client";

import { useState } from "react";
import { useCurrency } from "@/hooks/useCurrency";
import { availableCurrencies } from "@/utils/currency";
import { CurrencyRate } from "@/types/currency";

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
    <section className="w-full  p-5  sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-zinc-900 sm:text-lg">
          Currency Converter
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Convert an amount between local and global currencies.
        </p>
      </div>

      {/* Input / Control Grid */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3 ">
        {/* Amount */}
        <label className="flex flex-col sm:max-w-35">
          <span className="mb-1.5 text-xs font-medium text-zinc-600">
            Amount
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="h-11 w-full cursor-pointer rounded-sm border border-zinc-200 bg-(--destination-surface) px-3 text-sm text-(--destination-secondary) shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-(--destination-primary) focus:ring-1 focus:ring-(--destination-primary)"
            placeholder="1"
          />
        </label>

        {/* From Select */}
        <label className="flex flex-1 flex-col">
          <span className="mb-1.5 text-xs font-medium text-zinc-600">From</span>
          <select
            value={fromCurrency}
            onChange={(event) => setFromCurrency(event.target.value)}
            className="h-11 w-full cursor-pointer rounded-sm border border-zinc-200  px-3 text-sm text-zinc-900 shadow-sm outline-none transition-all focus:border-(--destination-primary) focus:ring-1 focus:ring-(--destination-primary)"
          >
            {availableCurrencies.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} — {item.name}
              </option>
            ))}
          </select>
        </label>

        {/* Swap Button */}
        <div className="flex justify-center sm:block sm:pb-0.5">
          <button
            type="button"
            onClick={handleSwap}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-(--destination-secondary) text-(--destination-surface) shadow-sm transition-all hover:border-(--destination-primary)/30 hover:bg-(--destination-primary)/5 hover:text-(--destination-primary) active:scale-95 sm:h-10 sm:w-10"
            aria-label="Swap currencies"
            title="Swap currencies"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 rotate-90 transition-transform sm:rotate-0"
              aria-hidden="true"
            >
              <path d="M16 3h5v5" />
              <path d="M8 3H3v5" />
              <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
              <path d="m15 9 6-6" />
            </svg>
          </button>
        </div>

        {/* To Select */}
        <label className="flex flex-1 flex-col">
          <span className="mb-1.5 text-xs font-medium text-zinc-600">To</span>
          <select
            value={toCurrency}
            onChange={(event) => setToCurrency(event.target.value)}
            className="h-11 w-full rounded-sm border border-zinc-200  px-3 text-sm text-zinc-900 shadow-sm outline-none transition-all focus:border-(--destination-primary) focus:ring-1 focus:ring-(--destination-primary)"
          >
            {availableCurrencies.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} — {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Result Display Box */}
      <div className="mt-6 flex min-h-25 flex-col justify-center  p-4 sm:p-5">
        {status === "loading" && (
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-(--destination-primary)" />
            Fetching latest rates...
          </div>
        )}

        {status === "error" && (
          <p className="text-sm font-medium text-red-500">{error}</p>
        )}

        {status === "success" && convertedAmount !== null && currency && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wide text-zinc-500">
              Converted Amount
            </span>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl font-semibold tracking-tight text-(--destination-primary) sm:text-4xl">
                {convertedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-sm font-medium text-zinc-500">
                {currency.quote}
              </span>
            </div>

            <div className="mt-2 text-xs font-medium text-zinc-400">
              1 {currency.base} = {currency.rate.toFixed(4)} {currency.quote}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
