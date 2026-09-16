import Image from "next/image";

import { getCountryCallingCode } from "@/utils/country";

type CountryInfoProps = {
  country: string | null;
  countryCode: string | null;
};

export default function CountryInfo({
  country,
  countryCode,
}: CountryInfoProps) {
  const callingCode = getCountryCallingCode(countryCode);

  if (!country && !countryCode) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-zinc-600">
      {countryCode && (
        <Image
          src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
          alt=""
          width={24}
          height={16}
          className="h-4 w-6 object-cover"
          aria-hidden="true"
        />
      )}

      {country && <span>{country}</span>}

      {countryCode && (
        <span className="text-zinc-400">· {countryCode.toUpperCase()}</span>
      )}

      {callingCode && (
        <span className="inline-flex items-center gap-1 font-medium text-zinc-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
          </svg>

          <span>{callingCode}</span>
        </span>
      )}
    </div>
  );
}
