import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Attractions from "@/components/Attractions";
import Cabins from "@/components/Cabins";
import ParallaxDivider from "@/components/ParallaxDivider";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ParallaxDivider />
        <Attractions />
        <Cabins />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
