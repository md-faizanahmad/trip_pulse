export type CountryTheme = {
  className: string;
};

const DEFAULT_COUNTRY_THEME: CountryTheme = {
  className: "",
};

const COUNTRY_THEMES: Record<string, CountryTheme> = {
  IN: { className: "theme-in" },
  JP: { className: "theme-jp" },
  FR: { className: "theme-fr" },
  DE: { className: "theme-de" },
  IT: { className: "theme-it" },
  ES: { className: "theme-es" },
  GB: { className: "theme-gb" },
  US: { className: "theme-us" },
  BR: { className: "theme-br" },
  AU: { className: "theme-au" },
  CA: { className: "theme-ca" },
  AE: { className: "theme-ae" },
  TR: { className: "theme-tr" },
  GR: { className: "theme-gr" },
  MX: { className: "theme-mx" },
  ZA: { className: "theme-za" },
};

export function getCountryTheme(countryCode: string | null): CountryTheme {
  if (!countryCode) {
    return DEFAULT_COUNTRY_THEME;
  }

  return COUNTRY_THEMES[countryCode.toUpperCase()] ?? DEFAULT_COUNTRY_THEME;
}
