type DesktopVideoProps = {
  overlayClassName?: string;
};

export default function DesktopVideo({
  overlayClassName = "bg-black/70",
}: DesktopVideoProps) {
  return (
    <>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/trip_pulse_video.mp4" type="video/mp4" />
      </video>

      <div
        className={`absolute inset-0 pointer-events-none ${overlayClassName}`}
        aria-hidden="true"
      />
    </>
  );
}
