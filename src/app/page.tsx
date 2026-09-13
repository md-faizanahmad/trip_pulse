import BackgroundVideo from "@/components/backgroundVideo/BackgroundVideo";
import DestinationSearch from "@/components/destinations/DestinationSearch";

export default function Home() {
  return (
    <main className="flex-1 relative overflow-hidden">
      <BackgroundVideo />
      <DestinationSearch />
    </main>
  );
}
