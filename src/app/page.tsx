import About from "@/components/about/About";
import Background from "@/components/background/Background";
import DestinationSearch from "@/components/destinations/DestinationSearch";

export default function Home() {
  return (
    <div className="relative isolate min-h-full">
      <Background />
      <DestinationSearch />
      <About />
    </div>
  );
}
