import {
  formatWeatherDate,
  getWeatherCondition,
  getWeatherIcon,
} from "@/utils/weather";
import type { WeatherForecast as WeatherForecastType } from "@/types/weather";

type WeatherForecastProps = {
  forecast: WeatherForecastType[];
};

export default function WeatherForecast({ forecast }: WeatherForecastProps) {
  if (forecast.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
          7-Day Forecast
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          A quick look at the weather ahead.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="group rounded-2xl bg-zinc-50/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-100/80"
            style={{
              animationDelay: `${index * 60}ms`,
            }}
          >
            <p className="text-sm font-medium text-zinc-900">
              {formatWeatherDate(day.date)}
            </p>

            <div className="mt-5 flex items-center justify-center">
              <span
                className="text-4xl transition-transform duration-300 group-hover:scale-110"
                role="img"
                aria-label={getWeatherCondition(day.weatherCode)}
              >
                {getWeatherIcon(day.weatherCode)}
              </span>
            </div>

            <p className="mt-4 text-center text-sm text-zinc-600">
              {getWeatherCondition(day.weatherCode)}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3 text-sm">
              <div>
                <p className="text-xs text-zinc-400">High</p>
                <p className="mt-1 font-semibold text-zinc-900">
                  {day.temperatureMax ?? "—"}°C
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-zinc-400">Low</p>
                <p className="mt-1 font-medium text-zinc-500">
                  {day.temperatureMin ?? "—"}°C
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
