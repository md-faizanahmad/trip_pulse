import About from "@/components/about/About";
import Background from "@/components/background/Background";
import DestinationSearch from "@/components/destinations/DestinationSearch";

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-screen">
        <Background />
        <DestinationSearch />
      </section>

      <About />
    </>
  );
}
