import productIntroduction from "@/data/product-introduction.json";

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

        <div className="mt-10 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
          {productIntroduction.items.map((item) => (
            <div
              key={item.number}
              className="border-b border-r border-zinc-200 p-5 sm:p-6"
            >
              <span className="text-sm font-semibold text-(--destination-primary)">
                {item.number}
              </span>

              <h3 className="mt-8 text-base font-semibold text-(--destination-text)">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-(--destination-secondary)">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
