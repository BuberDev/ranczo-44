import Attractions from "@/components/Attractions";
import SubpageHero from "@/components/SubpageHero";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Atrakcje – Basen, Bania, Konie | Ranczo 44",
  description: "Podgrzewany basen zewnętrzny, cedrowa bania, jazda konna, ognisko i pełna natura. Sprawdź, co czeka na Ciebie w Ranczo 44 w Beskidzie Niskim.",
};

export default function AttractionsPage() {
  return (
    <main className="min-h-screen bg-ranczo-charcoal">
      <SubpageHero
        title="Atrakcje"
        subtitle="Ranczo 44 · Przygoda czeka"
        imageSrc="/photos_ranczo_44/_MG_1121.jpeg"
      />
      <Attractions />
      <BookingForm />
    </main>
  );
}
