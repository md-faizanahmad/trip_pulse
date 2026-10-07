import { Coins, CloudSun, Images, Landmark, MapPinned } from "lucide-react";

export default function ProductVisualization() {
  return (
    <div className="relative h-75 w-full max-w-82.5 perspective-[1000px] sm:h-82.5 sm:max-w-90">
      {/* 3D destination surface */}
      <div className="absolute inset-5 transform-[rotateX(58deg)_rotateZ(-8deg)] border border-zinc-200 bg-zinc-50/70">
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[28px_28px]" />
        </div>

        {/* Route */}
        <div className="absolute inset-0">
          <div className="absolute left-[11%] top-[75%] h-px w-[42%] rotate-[-32deg] border-t border-dashed border-(--destination-primary)/35" />
          <div className="absolute left-[43%] top-[45%] h-px w-[43%] rotate-28 border-t border-dashed border-(--destination-primary)/35" />

          <span className="absolute left-[9%] top-[73%] h-2.5 w-2.5 rounded-full bg-(--destination-primary)" />
          <span className="absolute left-[43%] top-[43%] h-2.5 w-2.5 rounded-full bg-(--destination-primary)" />
          <span className="absolute right-[10%] top-[23%] h-2.5 w-2.5 rounded-full bg-(--destination-primary)" />

          <span className="absolute left-[9%] top-[73%] h-1.5 w-1.5 animate-ping rounded-full bg-(--destination-primary)" />
        </div>
      </div>

      {/* Destination */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-16 w-16 items-center justify-center border border-(--destination-primary)/30 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          <MapPinned
            className="h-7 w-7 text-(--destination-primary)"
            strokeWidth={1.5}
          />
        </div>

        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
          Dubai
        </div>
      </div>

      {/* Attractions */}
      <div className="absolute left-0 top-3 z-30 flex items-center gap-2 border border-zinc-200 bg-white px-3 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.06)] animate-[bounce_4.2s_ease-in-out_infinite]">
        <Landmark
          className="h-4 w-4 text-(--destination-primary)"
          strokeWidth={1.7}
        />

        <div>
          <p className="text-[9px] uppercase tracking-wider text-zinc-400">
            Places
          </p>
          <p className="text-xs font-semibold text-(--destination-text)">
            Attractions
          </p>
        </div>
      </div>

      {/* Weather */}
      <div className="absolute right-0 top-2 z-30 flex items-center gap-2 border border-zinc-200 bg-white px-3 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.06)] animate-[bounce_4s_ease-in-out_infinite]">
        <CloudSun
          className="h-4 w-4 text-(--destination-primary)"
          strokeWidth={1.7}
        />

        <div>
          <p className="text-[9px] uppercase tracking-wider text-zinc-400">
            Weather
          </p>
          <p className="text-xs font-semibold text-(--destination-text)">
            28°C
          </p>
        </div>
      </div>

      {/* Photos */}
      <div className="absolute bottom-6 left-0 z-30 flex items-center gap-2 border border-zinc-200 bg-white px-3 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.06)] animate-[bounce_5s_ease-in-out_infinite]">
        <Images
          className="h-4 w-4 text-(--destination-primary)"
          strokeWidth={1.7}
        />

        <div>
          <p className="text-[9px] uppercase tracking-wider text-zinc-400">
            Explore
          </p>
          <p className="text-xs font-semibold text-(--destination-text)">
            Photos
          </p>
        </div>
      </div>

      {/* Currency */}
      <div className="absolute bottom-1 right-0 z-30 flex items-center gap-2 border border-zinc-200 bg-white px-3 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.06)] animate-[bounce_4.5s_ease-in-out_infinite]">
        <Coins
          className="h-4 w-4 text-(--destination-primary)"
          strokeWidth={1.7}
        />

        <div>
          <p className="text-[9px] uppercase tracking-wider text-zinc-400">
            Currency
          </p>
          <p className="text-xs font-semibold text-(--destination-text)">AED</p>
        </div>
      </div>

      {/* Small map nodes */}
      <span className="absolute left-16 top-26 rounded-full  h-1.5 w-1.5 animate-pulse bg-(--destination-primary)" />
      <span className="absolute bottom-24 right-16 rounded-full h-1.5 w-1.5 animate-pulse bg-(--destination-primary)/60" />
    </div>
  );
}
