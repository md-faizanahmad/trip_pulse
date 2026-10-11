"use client";

import Image from "next/image";
import { useState } from "react";
import { Phone, X } from "lucide-react";
import { getCountryCallingCode } from "@/utils/country";

type CountryInfoProps = {
  country: string | null;
  countryCode: string | null;
};

export default function CountryInfo({
  country,
  countryCode,
}: CountryInfoProps) {
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const callingCode = getCountryCallingCode(countryCode);
  const normalizedCode = countryCode?.toLowerCase();

  if (!country && !countryCode) {
    return null;
  }

  const flagUrl = normalizedCode
    ? `https://flagcdn.com/${normalizedCode}.svg`
    : null;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
        {flagUrl && (
          <button
            type="button"
            onClick={() => setIsFlagOpen(true)}
            aria-label={`View ${country ?? countryCode} flag`}
            className="shrink-0 rounded border border-zinc-300 bg-white p-0.5 transition hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
          >
            <Image
              src={flagUrl}
              alt=""
              width={32}
              height={22}
              className="h-5.5 w-8 object-contain"
              aria-hidden="true"
            />
          </button>
        )}

        {country && <span>{country}</span>}

        {countryCode && (
          <span className="text-zinc-400">· {countryCode.toUpperCase()}</span>
        )}

        {callingCode && (
          <span className="inline-flex items-center gap-1 font-medium text-zinc-600">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{callingCode}</span>
          </span>
        )}
      </div>

      {isFlagOpen && flagUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsFlagOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${country ?? countryCode} flag preview`}
            className="relative w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsFlagOpen(false)}
              aria-label="Close flag preview"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="mb-5 pr-10 text-sm font-semibold text-zinc-800">
              {country ?? countryCode} Flag
            </p>

            <div className="flex min-h-36 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <Image
                src={flagUrl}
                alt={`${country ?? countryCode} flag`}
                width={240}
                height={160}
                className="h-auto max-h-40 w-full max-w-60 object-contain"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
