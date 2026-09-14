export default function DesktopVideo() {
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

      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
    </>
  );
}
