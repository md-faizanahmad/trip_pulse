import Image from "next/image";

type MobileVideoProps = {
  overlayClassName?: string;
};

export default function MobileVideo({
  overlayClassName = "bg-black/70",
}: MobileVideoProps) {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <Image
        src="/mobile-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />

      <div
        className={`pointer-events-none absolute inset-0 ${overlayClassName}`}
        aria-hidden="true"
      />
    </div>
  );
}
