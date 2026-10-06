import About from "@/components/about/About";
import Background from "@/components/background/Background";
import DestinationSearch from "@/components/destinations/DestinationSearch";
import ProductIntroduction from "@/components/home/ProductIntroduction";

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-screen">
        <Background />
        <DestinationSearch />
      </section>
      <ProductIntroduction />
      <About />
    </>
  );
}
