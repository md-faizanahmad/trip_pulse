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
    <div className={`absolute -z-10 inset-0  overflow-hidden ${className}`}>
      <div className="block md:hidden">
        <MobileVideo overlayClassName={overlayClassName} />
      </div>

      <div className="hidden md:block">
        <DesktopVideo overlayClassName={overlayClassName} />
      </div>
    </div>
  );
}
