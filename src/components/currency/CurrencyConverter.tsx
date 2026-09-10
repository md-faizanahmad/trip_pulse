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
    <section className="w-full border-b border-zinc-200 bg-white p-4 sm:p-6">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 bg-[#008EEB]" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950">
          Currency Converter
        </h2>
      </div>
      <p className="mt-1 text-xs font-medium text-zinc-500">
        Convert an amount between local and global currencies.
      </p>

      {/* Input / Control Row */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-[130px_1fr_auto_1fr] sm:items-end sm:gap-2">
        {/* Amount */}
        <label className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Amount
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="mt-1.5 h-11 w-full border border-zinc-200 bg-white px-3 font-mono text-sm font-bold text-zinc-950 outline-none transition-colors focus:border-zinc-950"
            placeholder="1"
          />
        </label>

        {/* From Select */}
        <label className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            From
          </span>
          <select
            value={fromCurrency}
            onChange={(event) => setFromCurrency(event.target.value)}
            className="mt-1.5 h-11 w-full border border-zinc-200 bg-white px-3 text-xs font-bold uppercase tracking-wide text-zinc-950 outline-none transition-colors focus:border-zinc-950"
          >
            {availableCurrencies.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} — {item.name} ({item.symbol})
              </option>
            ))}
          </select>
        </label>

        {/* Swap Button */}
        <button
          type="button"
          onClick={handleSwap}
          className="flex h-11 w-full items-center justify-center border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors hover:border-zinc-950 hover:bg-zinc-950 hover:text-white active:scale-95 sm:w-11"
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
            className="h-4 w-4 rotate-90 sm:rotate-0"
            aria-hidden="true"
          >
            <path d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* To Select */}
        <label className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            To
          </span>
          <select
            value={toCurrency}
            onChange={(event) => setToCurrency(event.target.value)}
            className="mt-1.5 h-11 w-full border border-zinc-200 bg-white px-3 text-xs font-bold uppercase tracking-wide text-zinc-950 outline-none transition-colors focus:border-zinc-950"
          >
            {availableCurrencies.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} — {item.name} ({item.symbol})
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Result Display Box */}
      <div className="mt-4 border border-zinc-200 bg-zinc-50/50 p-4">
        {status === "loading" && (
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-400">
            <span className="h-1.5 w-1.5 animate-ping bg-[#008EEB]" />
            Updating rate...
          </div>
        )}

        {status === "error" && (
          <p className="text-xs font-bold text-red-600">{error}</p>
        )}

        {status === "success" && convertedAmount !== null && currency && (
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Converted Amount
              </span>
              <div className="mt-1 font-mono text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                {convertedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-sm font-bold text-zinc-500">
                  {currency.quote}
                </span>
              </div>
            </div>

            <div className="font-mono text-xs font-bold text-zinc-500">
              1 {currency.base} = {currency.rate.toFixed(4)} {currency.quote}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
