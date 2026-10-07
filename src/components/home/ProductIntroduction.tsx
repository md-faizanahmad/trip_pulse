import { Compass, GitCompare, Lightbulb, MapPinned } from "lucide-react";
import productIntroduction from "@/data/product-introduction.json";
import ProductVisualization from "./ProductVisualization";

const icons = [Compass, Lightbulb, GitCompare, MapPinned];

export default function ProductIntroduction() {
  return (
    <section className="overflow-hidden border-t border-zinc-200 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:gap-16">
          {/* Introduction */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--destination-primary)">
              {productIntroduction.eyebrow}
            </p>

            <h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-(--destination-text) sm:text-3xl lg:text-4xl">
              {productIntroduction.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-(--destination-secondary) sm:text-base sm:leading-7">
              {productIntroduction.description}
            </p>

            {/* Mobile Product Visualization */}
            <div className="mt-10 flex justify-center lg:hidden">
              <ProductVisualization />
            </div>

            {/* Mobile Timeline */}
            <div className="relative mt-12 lg:hidden">
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

                        <p className="mt-1.5 max-w-lg text-sm leading-6 text-(--destination-secondary)">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Timeline */}
            <div className="relative mt-14 hidden lg:block">
              <div className="absolute left-5 right-5 top-5 h-px bg-zinc-200">
                <div className="h-full w-1/2 animate-[pulse_3s_ease-in-out_infinite] bg-(--destination-primary)" />
              </div>

              <div className="grid grid-cols-4 gap-8">
                {productIntroduction.items.map((item, index) => {
                  const Icon = icons[index];

                  return (
                    <div key={item.number} className="group relative">
                      <div className="relative cursor-pointer z-10 flex h-10 w-10 items-center justify-center border border-zinc-200 bg-white text-(--destination-primary) transition-all duration-300 group-hover:-translate-y-1 group-hover:border-(--destination-primary)">
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

                      <p className="mt-2 max-w-xs text-sm leading-6 text-(--destination-secondary)">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Product Visualization */}
          <div className="hidden min-h-90 items-center justify-center lg:flex">
            <ProductVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}
