import { Droplets, Thermometer, Wind } from "lucide-react";

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
    <div className="flex shrink-0 flex-col gap-4 md:w-80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 bg-(--destination-primary)"
            aria-hidden="true"
          />

          <h2 className="font-mono text-[11px] font-black uppercase tracking-widest text-(--destination-secondary)">
            Live Atmosphere
          </h2>
        </div>

        <span className="font-mono text-[9px] font-bold tracking-wider text-slate-400">
          TELEMETRY
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="group flex flex-col justify-between py-1 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-center gap-1.5">
            <Thermometer
              size={14}
              strokeWidth={2.4}
              className="text-[#09ac14] transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />

            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-(--destination-secondary)">
              Feels
            </span>
          </div>

          <div className="mt-2 font-mono text-base font-black tracking-tight text-(--destination-secondary) sm:text-lg">
            {feelsLike ?? "—"}
            <span className="text-xs font-semibold text-slate-400">°C</span>
          </div>
        </div>

        <div className="group flex flex-col justify-between py-1 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-center gap-1.5">
            <Droplets
              size={14}
              strokeWidth={2.4}
              className="text-(--destination-primary) transition-transform duration-300 group-hover:scale-125"
              aria-hidden="true"
            />

            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-(--destination-secondary)">
              Humidity
            </span>
          </div>

          <div className="mt-2 font-mono text-base font-black tracking-tight text-(--destination-secondary) sm:text-lg">
            {humidity ?? "—"}
            <span className="text-xs font-semibold text-slate-400">%</span>
          </div>
        </div>

        <div className="group flex flex-col justify-between py-1 transition-transform duration-200 hover:-translate-y-0.5">
          <div className="flex items-center gap-1.5">
            <Wind
              size={14}
              strokeWidth={2.4}
              className="text-[#cd261a] transition-all duration-300 motion-safe:animate-[pulse_2.5s_ease-in-out_infinite] group-hover:translate-x-1.5"
              aria-hidden="true"
            />

            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-(--destination-secondary)">
              Wind
            </span>
          </div>

          <div className="mt-2 font-mono text-base font-black tracking-tight text-(--destination-secondary) sm:text-lg">
            {windSpeed ?? "—"}{" "}
            <span className="text-[10px] font-bold uppercase tracking-normal text-slate-400">
              km/h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
