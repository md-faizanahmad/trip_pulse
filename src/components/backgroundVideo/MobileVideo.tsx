type MobileVideoProps = {
  overlayClassName?: string;
};

export default function MobileVideo({
  overlayClassName = "bg-black/70",
}: MobileVideoProps) {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <video
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/trip_pulse_video.mp4" type="video/mp4" />
      </video>

      <div
        className={`pointer-events-none absolute inset-0 ${overlayClassName}`}
        aria-hidden="true"
      />
    </div>
  );
}
