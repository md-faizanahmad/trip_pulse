import { getWeatherCondition, getWeatherIcon } from "@/utils/weather";

type WeatherStatusProps = {
  weatherCode: number;
  temperature: number | null;
};

export default function WeatherStatus({
  weatherCode,
  temperature,
}: WeatherStatusProps) {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 bg-(--destination-primary)"
            aria-hidden="true"
          />

          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950">
            Current Weather
          </h2>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <span
            className="shrink-0 text-4xl select-none"
            role="img"
            aria-label={getWeatherCondition(weatherCode)}
          >
            {getWeatherIcon(weatherCode)}
          </span>

          <div className="flex flex-col">
            <span className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              {temperature ?? "—"}°C
            </span>

            <span className="mt-0.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
              {getWeatherCondition(weatherCode)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
