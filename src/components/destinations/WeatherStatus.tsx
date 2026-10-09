import { getWeatherCondition, getWeatherIcon } from "@/utils/weather";
import { Thermometer } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

type WeatherStatusProps = {
  weatherCode: number | null;
  temperature: number | null;
};

export default function WeatherStatus({
  weatherCode,
  temperature,
}: WeatherStatusProps) {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <SectionTitle icon={Thermometer} title="Current Weather" />

        <div className="mt-4 flex items-center gap-4">
          <span
            className="shrink-0 text-4xl select-none"
            role="img"
            aria-label={
              weatherCode !== null
                ? getWeatherCondition(weatherCode)
                : "Weather unavailable"
            }
          >
            {weatherCode !== null ? getWeatherIcon(weatherCode) : "—"}
          </span>

          <div className="flex flex-col">
            <span className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              {temperature ?? "—"}°C
            </span>

            <span className="mt-0.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
              {weatherCode !== null
                ? getWeatherCondition(weatherCode)
                : "Unavailable"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
