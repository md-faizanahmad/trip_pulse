import DesktopVideo from "./DesktopVideo";
import MobileVideo from "./MobileVideo";

type BackgroundVideoProps = {
  className?: string;
  overlayClassName?: string;
};

export default function BackgroundVideo({
  className = "",
  overlayClassName = "bg-black/70",
}: BackgroundVideoProps) {
  return (
    <div
      className={`absolute inset-0 -z-10 h-full w-full overflow-hidden ${className}`}
    >
      <div className="h-full w-full md:hidden">
        <MobileVideo overlayClassName={overlayClassName} />
      </div>

      <div className="hidden h-full w-full md:block">
        <DesktopVideo overlayClassName={overlayClassName} />
      </div>
    </div>
  );
}
