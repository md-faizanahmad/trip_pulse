import CurrencyConverter from "@/components/currency/CurrencyConverter";
import CurrencyOverview from "@/components/currency/CurrencyOverview";

type CurrencyProps = {
  currencyName: string;
  currencyCode: string;
  currencySymbol: string;
  baseCurrency: string;
  rate: number | null;
  date: string | null;
};

export default function Currency({
  currencyName,
  currencyCode,
  currencySymbol,
  baseCurrency,
  rate,
  date,
}: CurrencyProps) {
  return (
    <section className="space-y-8">
      <CurrencyOverview
        currencyName={currencyName}
        currencyCode={currencyCode}
        currencySymbol={currencySymbol}
        baseCurrency={baseCurrency}
        rate={rate}
        date={date}
      />

      <CurrencyConverter
        defaultFromCurrency={baseCurrency}
        defaultToCurrency={currencyCode}
      />
    </section>
  );
}
