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
    <div
      className={`absolute ${position} z-30 flex items-center gap-2 border border-zinc-200 bg-white px-3 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.06)] ${animation}`}
    >
      <Icon
        className="h-4 w-4 shrink-0 text-(--destination-primary)"
        strokeWidth={1.7}
      />

      <div>
        <p className="text-[9px] uppercase tracking-wider text-zinc-400">
          {label}
        </p>

        <p className="text-xs font-semibold text-(--destination-text)">
          {value}
        </p>
      </div>
    </div>
  );
}
