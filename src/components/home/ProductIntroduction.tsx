import {
  Coins,
  CloudSun,
  Compass,
  GitCompare,
  Images,
  Landmark,
  Lightbulb,
  MapPinned,
} from "lucide-react";
import productIntroduction from "@/data/product-introduction.json";

const icons = [Compass, Lightbulb, GitCompare, MapPinned];

export default function ProductIntroduction() {
  return (
    <section className="overflow-hidden border-t border-zinc-200 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          {/* Content */}
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--destination-primary)">
              {productIntroduction.eyebrow}
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-(--destination-text) sm:text-3xl">
              {productIntroduction.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-(--destination-secondary) sm:text-base">
              {productIntroduction.description}
            </p>

            {/* Mobile Product Visualization */}
            <div className="mt-10 flex justify-center lg:hidden">
              <ProductVisualization />
            </div>

            {/* Mobile Timeline */}
            <div className="relative mt-10 lg:hidden">
              <div className="absolute bottom-5 left-5 top-5 w-px bg-zinc-200">
                <div className="h-1/2 w-full animate-[pulse_2.5s_ease-in-out_infinite] bg-(--destination-primary)" />
              </div>

              <div className="space-y-8">
                {productIntroduction.items.map((item, index) => {
                  const Icon = icons[index];

                  return (
                    <div
                      key={item.number}
                      className="group relative flex gap-5"
                    >
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border border-zinc-200 bg-white text-(--destination-primary) transition-all duration-300 group-hover:-translate-y-1 group-hover:border-(--destination-primary)">
                        <Icon
                          className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6"
                          strokeWidth={1.8}
                        />
                      </div>

                      <div className="pt-0.5">
                        <span className="text-xs font-semibold text-zinc-400">
                          {item.number}
                        </span>

                        <h3 className="mt-1 text-base font-semibold text-(--destination-text)">
                          {item.title}
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-(--destination-secondary)">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Timeline */}
            <div className="relative mt-12 hidden lg:block">
              <div className="absolute left-5 right-5 top-5 h-px bg-zinc-200">
                <div className="h-full w-1/3 animate-[pulse_3s_ease-in-out_infinite] bg-(--destination-primary)" />
              </div>

              <div className="grid grid-cols-4">
                {productIntroduction.items.map((item, index) => {
                  const Icon = icons[index];

                  return (
                    <div key={item.number} className="group relative">
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-zinc-200 bg-white text-(--destination-primary) transition-all duration-300 group-hover:-translate-y-1 group-hover:border-(--destination-primary)">
                        <Icon
                          className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6"
                          strokeWidth={1.8}
                        />
                      </div>

                      <span className="mt-5 block text-xs font-semibold text-zinc-400">
                        {item.number}
                      </span>

                      <h3 className="mt-2 text-base font-semibold text-(--destination-text)">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-47.5 text-sm leading-6 text-(--destination-secondary)">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Product Visualization */}
          <div className="hidden lg:flex lg:h-90 lg:items-center lg:justify-center">
            <ProductVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductVisualization() {
  return (
    <div className="relative h-75 w-full max-w-82.5 perspective-[1000px] sm:h-82.5 sm:max-w-90">
      {/* 3D destination surface */}
      <div className="absolute inset-5 transform-[rotateX(58deg)_rotateZ(-8deg)] border border-zinc-200 bg-zinc-50/70">
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[28px_28px]" />
        </div>

        <svg
          viewBox="0 0 320 250"
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          <path
            d="M35 190 C90 155 90 95 145 115 S215 180 280 65"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 7"
            className="text-(--destination-primary)/35"
          />

          <circle
            cx="35"
            cy="190"
            r="5"
            className="fill-(--destination-primary)"
          />

          <circle
            cx="145"
            cy="115"
            r="5"
            className="fill-(--destination-primary)"
          />

          <circle
            cx="280"
            cy="65"
            r="5"
            className="fill-(--destination-primary)"
          />

          <circle r="3" className="fill-(--destination-primary)">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M35 190 C90 155 90 95 145 115 S215 180 280 65"
            />
          </circle>
        </svg>
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
      <span className="absolute left-16 top-16 h-2 w-2 animate-pulse bg-(--destination-primary)" />
      <span className="absolute bottom-24 right-16 h-1.5 w-1.5 animate-pulse bg-(--destination-primary)/60" />
    </div>
  );
}
