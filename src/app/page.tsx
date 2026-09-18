import About from "@/components/about/About";
import BackgroundVideo from "@/components/backgroundVideo/BackgroundVideo";
import DestinationSearch from "@/components/destinations/DestinationSearch";

export default function Home() {
  return (
    <div className="relative isolate min-h-full">
      <BackgroundVideo />
      <DestinationSearch />
      <About />
    </div>
  );
}
