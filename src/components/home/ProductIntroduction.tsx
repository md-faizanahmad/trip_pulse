import { Compass, GitCompare, Lightbulb, MapPinned } from "lucide-react";
import productIntroduction from "@/data/product-introduction.json";

const icons = [Compass, Lightbulb, GitCompare, MapPinned];

export default function ProductIntroduction() {
  return (
    <section className="border-t border-zinc-200 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
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
        </div>

        {/* Desktop */}
        <div className="relative mt-12 hidden lg:block">
          <div className="absolute left-0 right-0 top-5 h-px overflow-hidden bg-zinc-200">
            <div className="h-full w-1/3 animate-[pulse_3s_ease-in-out_infinite] bg-(--destination-primary)" />
          </div>

          <div className="grid grid-cols-4">
            {productIntroduction.items.map((item, index) => {
              const Icon = icons[index];

              return (
                <div key={item.number} className="group relative pr-8">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-zinc-200 bg-white text-(--destination-primary) transition-all duration-300 group-hover:-translate-y-1 group-hover:border-(--destination-primary)">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <span className="mt-5 block text-xs font-semibold text-zinc-400">
                    {item.number}
                  </span>

                  <h3 className="mt-2 text-base font-semibold text-(--destination-text)">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-52.5 text-sm leading-6 text-(--destination-secondary)">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="relative mt-10 lg:hidden">
          <div className="absolute bottom-5 left-5 top-5 w-px overflow-hidden bg-zinc-200">
            <div className="h-1/3 w-full animate-[pulse_3s_ease-in-out_infinite] bg-(--destination-primary)" />
          </div>

          <div className="space-y-8">
            {productIntroduction.items.map((item, index) => {
              const Icon = icons[index];

              return (
                <div key={item.number} className="group relative flex gap-5">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border border-zinc-200 bg-white text-(--destination-primary) transition-all duration-300 group-hover:-translate-y-1 group-hover:border-(--destination-primary)">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>

                  <div className="pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-400">
                        {item.number}
                      </span>

                      <span className="h-px w-5 bg-zinc-200" />
                    </div>

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
      </div>
    </section>
  );
}
