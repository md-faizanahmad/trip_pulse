export type CurrencyInfo = {
  code: string;
  name: string;
  symbol: string;
};

const currenciesByCountry: Record<string, CurrencyInfo> = {
  IN: {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
  },
  US: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
  },
  GB: {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
  },
  JP: {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
  },
  AE: {
    code: "AED",
    name: "UAE Dirham",
    symbol: "د.إ",
  },
  FR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },
  DE: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },
  IT: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },
  ES: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },
};

export const availableCurrencies: CurrencyInfo[] = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
  },
  {
    code: "AED",
    name: "UAE Dirham",
    symbol: "د.إ",
  },
];

export function getCurrencyByCountryCode(
  countryCode: string | null,
): CurrencyInfo | null {
  if (!countryCode) {
    return null;
  }

  return currenciesByCountry[countryCode.toUpperCase()] ?? null;
}
