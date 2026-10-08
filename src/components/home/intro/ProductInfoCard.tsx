import type { LucideIcon } from "lucide-react";

type ProductInfoCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  position: string;
  animation: string;
};

export default function ProductInfoCard({
  label,
  value,
  icon: Icon,
  position,
  animation,
}: ProductInfoCardProps) {
  return (
    <div className={`absolute ${position} z-30 ${animation}`}>
      <div className="group flex flex-col items-center">
        {/* Floating node */}
        <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-(--destination-primary)/15 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-(--destination-primary)/35 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
          <Icon
            className="h-4 w-4 text-(--destination-primary)"
            strokeWidth={1.7}
          />
        </div>

        {/* Label */}
        <div className="mt-2 whitespace-nowrap text-center">
          <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-400">
            {label}
          </p>

          <p className="mt-0.5 text-[10px] font-semibold text-(--destination-text)">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
