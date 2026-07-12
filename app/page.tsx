import Hero from "@/components/Hero";
import About from "@/components/About";
import ParallaxDivider from "@/components/ParallaxDivider";
import Reviews from "@/components/Reviews";
import Cabins from "@/components/Cabins";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ParallaxDivider />
      <Reviews />
      <Cabins />
    </main>
  );
}
