import SubpageHero from "@/components/SubpageHero";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Rezerwacja – Zarezerwuj pobyt | Ranczo 44",
  description: "Zarezerwuj pobyt w Ranczo 44 w Beskidzie Niskim. Wybierz termin i domek, a następnie wyślij zapytanie o dostępność.",
};

export default function RezerwacjaPage() {
  return (
    <main className="min-h-screen bg-ranczo-charcoal">
      <SubpageHero
        title="Rezerwacja"
        subtitle="Ranczo 44 · Zarezerwuj swój pobyt"
        imageSrc="/photos_ranczo_44/wooden-cabin-porch-in-winter.jpeg"
        nextSectionTone="dark"
      />
      <BookingForm showHeader={false} />
    </main>
  );
}
