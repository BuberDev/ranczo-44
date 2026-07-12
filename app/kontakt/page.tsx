import Contact from "@/components/Contact";
import SubpageHero from "@/components/SubpageHero";

export const metadata = {
  title: "Kontakt i Rezerwacja | Ranczo 44",
  description: "Skontaktuj się z nami lub zarezerwuj pobyt w Ranczo 44 w Beskidzie Niskim. Jesteśmy do Twojej dyspozycji.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <SubpageHero
        title="Kontakt"
        subtitle="Ranczo 44 · Jesteśmy dla Ciebie"
        imageSrc="/photos_ranczo_44/image00086.jpeg"
      />
      <Contact />
    </main>
  );
}
