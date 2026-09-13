type BackgroundVideoProps = {
  className?: string;
};

export default function BackgroundVideo({
  className = "",
}: BackgroundVideoProps) {
  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
    >
      <source src="/trip_pulse_video.mp4" type="video/mp4" />
    </video>
  );
}
