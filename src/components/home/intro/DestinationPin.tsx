import { MapPinned } from "lucide-react";

type DestinationPinProps = {
  name: string;
  position: string;
  size: "sm" | "md" | "lg";
  color: string;
  background: string;
};

const sizeStyles = {
  sm: {
    wrapper: "h-6 w-6",
    icon: "h-3 w-3",
  },
  md: {
    wrapper: "h-7 w-7",
    icon: "h-3.5 w-3.5",
  },
  lg: {
    wrapper: "h-8 w-8",
    icon: "h-4 w-4",
  },
};

export default function DestinationPin({
  name,
  position,
  size,
  color,
  // backgrousnd,
}: DestinationPinProps) {
  const styles = sizeStyles[size];

  return (
    <div className={`absolute ${position} z-20`}>
      <div className="group relative">
        <div
          className={`flex ${styles.wrapper} items-center justify-center rounded-full cursor-pointer transition-transform duration-300 group-hover:-translate-y-1`}
        >
          <MapPinned className={`${styles.icon} ${color}`} strokeWidth={1.8} />
        </div>

        <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-widest text-zinc-400">
          {name}
        </span>
      </div>
    </div>
  );
}
