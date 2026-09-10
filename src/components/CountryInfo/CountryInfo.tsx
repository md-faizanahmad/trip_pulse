import { getCountryCallingCode, getCountryFlag } from "@/utils/country";

type CountryInfoProps = {
  country: string | null;
  countryCode: string | null;
};

export default function CountryInfo({
  country,
  countryCode,
}: CountryInfoProps) {
  const flag = getCountryFlag(countryCode);
  const callingCode = getCountryCallingCode(countryCode);

  if (!country && !countryCode) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-zinc-600">
      {flag && (
        <span aria-hidden="true" className="text-base">
          {flag}
        </span>
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
