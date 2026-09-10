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
        <span className="font-medium text-zinc-600">· {callingCode}</span>
      )}
    </div>
  );
}
