import { Droplets, Thermometer, Waves, Wind } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

type WeatherConditionsProps = {
  feelsLike: number | null;
  humidity: number | null;
  windSpeed: number | null;
};

export default function WeatherConditions({
  feelsLike,
  humidity,
  windSpeed,
}: WeatherConditionsProps) {
  return (
    <div className="flex shrink-0 flex-col md:w-80">
      <SectionTitle icon={Waves} title="Current Condition" className="mb-4" />

      <div className="grid grid-cols-3 divide-x divide-zinc-200 border-y border-zinc-200">
        <div className="flex min-w-0 flex-col gap-2 py-3 pr-3">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Thermometer size={15} strokeWidth={1.8} aria-hidden="true" />

            <span className="truncate text-[11px] font-medium">Feels like</span>
          </div>

          <p className="text-lg font-semibold tracking-tight text-zinc-950">
            {feelsLike ?? "—"}
            <span className="ml-0.5 text-xs font-medium text-zinc-400">°C</span>
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-2 px-3 py-3">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Droplets size={15} strokeWidth={1.8} aria-hidden="true" />

            <span className="truncate text-[11px] font-medium">Humidity</span>
          </div>

          <p className="text-lg font-semibold tracking-tight text-zinc-950">
            {humidity ?? "—"}
            <span className="ml-0.5 text-xs font-medium text-zinc-400">%</span>
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-2 pl-3 py-3">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Wind size={15} strokeWidth={1.8} aria-hidden="true" />

            <span className="truncate text-[11px] font-medium">Wind</span>
          </div>

          <p className="text-lg font-semibold tracking-tight text-zinc-950">
            {windSpeed ?? "—"}
            <span className="ml-0.5 text-xs font-medium text-zinc-400">
              km/h
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
