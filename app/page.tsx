import Hero from "@/components/Hero";
import About from "@/components/About";
import ParallaxDivider from "@/components/ParallaxDivider";
import Reviews from "@/components/Reviews";
import Cabins from "@/components/Cabins";
import Attractions from "@/components/Attractions";
import Gallery from "@/components/Gallery";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Ranczo 44 – Domki w Beskidzie Niskim | Uście Gorlickie",
  description: "Ranczo 44 to kameralny ośrodek wypoczynkowy w sercu Beskidu Niskiego. Drewniane domki z kominkiem, podgrzewany basen, cedrowa bania, konie i czyste górskie powietrze.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ParallaxDivider />
      <Cabins />
      <Attractions />
      <Gallery />
      <Reviews />
      <BookingForm />
    </main>
  );
}
