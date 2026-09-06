import { formatWeatherDate, getWeatherCondition } from "@/utils/weather";
import type { WeatherForecast as WeatherForecastType } from "@/types/weather";

type WeatherForecastProps = {
  forecast: WeatherForecastType[];
};

export default function WeatherForecast({ forecast }: WeatherForecastProps) {
  if (forecast.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-zinc-900">7-Day Forecast</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {forecast.map((day) => (
          <div key={day.date} className="rounded-md border border-zinc-200 p-4">
            <p className="text-sm font-medium text-zinc-900">
              {formatWeatherDate(day.date)}
            </p>

            <p className="mt-2 text-sm text-zinc-600">
              {getWeatherCondition(day.weatherCode)}
            </p>

            <p className="mt-3 text-sm text-zinc-500">
              High:{" "}
              <span className="font-medium text-zinc-900">
                {day.temperatureMax ?? "—"}°C
              </span>
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Low:{" "}
              <span className="font-medium text-zinc-900">
                {day.temperatureMin ?? "—"}°C
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
