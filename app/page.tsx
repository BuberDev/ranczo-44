import Hero from "@/components/Hero";
import About from "@/components/About";
import ParallaxDivider from "@/components/ParallaxDivider";
import Reviews from "@/components/Reviews";
import Cabins from "@/components/Cabins";
import Attractions from "@/components/Attractions";
import Celebrations from "@/components/Celebrations";
import Gallery from "@/components/Gallery";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Ranczo 44 – Domki, śluby i wydarzenia w Beskidzie Niskim",
  description: "Kameralne domki z kominkiem, śluby i wydarzenia w naturze, konie, podgrzewany basen oraz cedrowa balia. Poznaj Ranczo 44 w Uściu Gorlickim.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ParallaxDivider />
      <Cabins />
      <Attractions />
      <Celebrations />
      <Gallery />
      <Reviews />
      <BookingForm />
    </main>
  );
}
