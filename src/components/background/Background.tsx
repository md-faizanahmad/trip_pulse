import Desktop from "./Desktop";
import Mobile from "./Mobile";

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
      <div className="relative block h-full w-full md:hidden">
        <Mobile overlayClassName={overlayClassName} />
      </div>

      <div className="relative hidden h-full w-full md:block">
        <Desktop overlayClassName={overlayClassName} />
      </div>
    </div>
  );
}
