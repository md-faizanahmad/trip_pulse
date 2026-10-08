import Link from "next/link";
import { MapPinned } from "lucide-react";

type DestinationPinProps = {
  name: string;
  href: string;
  position: string;
  size: "sm" | "md" | "lg";
  color: string;
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
  href,
  position,
  size,
  color,
}: DestinationPinProps) {
  const styles = sizeStyles[size];

  return (
    <div className={`absolute ${position} z-20`}>
      <Link
        href={href}
        aria-label={`Explore ${name}`}
        className="group relative flex flex-col items-center outline-none"
      >
        <div
          className={`flex ${styles.wrapper} items-center justify-center rounded-full transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-focus-visible:-translate-y-1 group-focus-visible:scale-110`}
        >
          <MapPinned
            className={`${styles.icon} ${color} transition-all duration-300 group-hover:drop-shadow-[0_3px_6px_rgba(0,0,0,0.18)]`}
            strokeWidth={1.8}
          />
        </div>

        <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-widest text-zinc-400 transition-colors duration-300 group-hover:text-(--destination-primary) group-focus-visible:text-(--destination-primary)">
          {name}
        </span>
      </Link>
    </div>
  );
}
