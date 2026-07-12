import SubpageHero from "@/components/SubpageHero";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Rezerwacja – Zarezerwuj pobyt | Ranczo 44",
  description: "Zarezerwuj pobyt w Ranczo 44 w Beskidzie Niskim. Wybierz termin, domek i wyślij zapytanie. Odpowiemy w ciągu 24 godzin.",
};

export default function RezerwacjaPage() {
  return (
    <main className="min-h-screen bg-ranczo-charcoal">
      <SubpageHero
        title="Rezerwacja"
        subtitle="Ranczo 44 · Zarezerwuj swój pobyt"
        imageSrc="/photos_ranczo_44/image00063.jpeg"
      />
      <BookingForm />
    </main>
  );
}
