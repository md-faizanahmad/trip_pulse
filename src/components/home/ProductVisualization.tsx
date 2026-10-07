import DestinationPin from "./intro/DestinationPin";
import ProductInfoCard from "./intro/ProductInfoCard";
import DestinationPinIcon from "./intro/DestinationPinIcon";
import {
  destinations,
  productInfoCards,
} from "@/data/productVisualization.data";

export default function ProductVisualization() {
  return (
    <div className="relative h-75 w-full max-w-82.5 perspective-[1000px] sm:h-82.5 sm:max-w-90">
      {/* 3D destination surface */}
      <div className="absolute inset-5 transform-[rotateX(58deg)_rotateZ(-8deg)] border border-zinc-200 bg-zinc-50/70">
        <div className="absolute inset-0 opacity-40">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[28px_28px]" />
        </div>

        {/* Route network */}
        <div className="absolute inset-0">
          <span className="absolute left-[11%] top-[74%] h-px w-[42%] rotate-[-32deg] border-t border-dashed border-(--destination-primary)/25" />
          <span className="absolute left-[36%] top-[23%] h-px w-[37%] rotate-[8deg] border-t border-dashed border-(--destination-primary)/20" />
          <span className="absolute left-[43%] top-[45%] h-px w-[43%] rotate-28 border-t border-dashed border-(--destination-primary)/25" />
          <span className="absolute left-[39%] top-[43%] h-px w-[38%] rotate-[-30deg] border-t border-dashed border-(--destination-primary)/20" />
        </div>
      </div>

      {/* Global destinations */}
      {destinations.map((destination) => (
        <DestinationPin key={destination.name} {...destination} />
      ))}

      {/* Active destination */}
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-15 w-15 items-center justify-center">
          <span className="absolute -inset-1.5 animate-ping rounded-full border border-(--destination-primary)/15" />

          <div className="relative flex h-11 w-11 items-center justify-center ">
            <DestinationPinIcon />
          </div>
        </div>

        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
          Dubai
        </div>
      </div>

      {/* Product information */}
      {productInfoCards.map((card) => (
        <ProductInfoCard key={card.label} {...card} />
      ))}
    </div>
  );
}
