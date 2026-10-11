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
  SG: { className: "theme-sg" },

  // Asia
  CN: { className: "theme-cn" },
  TH: { className: "theme-th" },
  ID: { className: "theme-id" },
  MY: { className: "theme-my" },
  KR: { className: "theme-kr" },
  VN: { className: "theme-vn" },

  // Europe
  CH: { className: "theme-ch" },
  NL: { className: "theme-nl" },
  PT: { className: "theme-pt" },
  AT: { className: "theme-at" },
  IE: { className: "theme-ie" },

  // Middle East and Africa
  EG: { className: "theme-eg" },
  MA: { className: "theme-ma" },
  SA: { className: "theme-sa" },
  KE: { className: "theme-ke" },
  TZ: { className: "theme-tz" },
  MU: { className: "theme-mu" },

  // South America
  AR: { className: "theme-ar" },
  CO: { className: "theme-co" },
  PE: { className: "theme-pe" },

  // Oceania
  NZ: { className: "theme-nz" },
};

export function getCountryTheme(countryCode: string | null): CountryTheme {
  if (!countryCode) {
    return DEFAULT_COUNTRY_THEME;
  }

  return COUNTRY_THEMES[countryCode.toUpperCase()] ?? DEFAULT_COUNTRY_THEME;
}
