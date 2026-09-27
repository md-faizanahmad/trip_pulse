import Image from "next/image";

type MobileProps = {
  overlayClassName?: string;
};

export default function Mobile({
  overlayClassName = "bg-black/70",
}: MobileProps) {
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
