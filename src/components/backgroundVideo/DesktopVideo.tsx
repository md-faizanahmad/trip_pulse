import Image from "next/image";

type DesktopVideoProps = {
  overlayClassName?: string;
};

export default function DesktopVideo({
  overlayClassName = "bg-black/70",
}: DesktopVideoProps) {
  return (
    <>
      <Image
        src="/desktop-bg.png"
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
    </>
  );
}
