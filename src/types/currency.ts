export type CurrencyRate = {
  base: string;
  quote: string;
  rate: number;
  date: string | null;
};

export type CurrencyResponse = {
  base?: string;
  quote?: string;
  rate?: number;
  date?: string | null;
  error?: string;
};
