import Image from "next/image";

type BackgroundProps = {
  className?: string;
  overlayClassName?: string;
};

export default function Background({
  className = "",
  overlayClassName = "bg-black/70",
}: BackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Mobile background */}
      <Image
        src="/mobile-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover md:hidden"
        aria-hidden="true"
      />

      {/* Desktop background */}
      <Image
        src="/desktop-bg.png"
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 100vw, 0px"
        className="hidden object-cover md:block"
        aria-hidden="true"
      />

      {/* Shared overlay */}
      <div
        className={`pointer-events-none absolute inset-0 ${overlayClassName}`}
        aria-hidden="true"
      />
    </div>
  );
}
