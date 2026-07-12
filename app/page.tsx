import Hero from "@/components/Hero";
import About from "@/components/About";
import ParallaxDivider from "@/components/ParallaxDivider";
import Cabins from "@/components/Cabins";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ParallaxDivider />
      <Cabins />
    </main>
  );
}
