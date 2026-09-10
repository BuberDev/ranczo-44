import Cabins from "@/components/Cabins";
import SubpageHero from "@/components/SubpageHero";
import BookingForm from "@/components/BookingForm";
import CabinMedia from "@/components/CabinMedia";

export const metadata = {
  title: "Domki – Komfortowy wypoczynek | Ranczo 44",
  description: "Drewniane domki z kominkiem w Beskidzie Niskim. Każdy domek to inny klimat, ta sama dzika natura. Sprawdź dostępność i zarezerwuj pobyt.",
};

export default function CabinsPage() {
  return (
    <main className="min-h-screen">
      <SubpageHero
        title="Nasze Domki"
        subtitle="Ranczo 44 · Komfortowy wypoczynek"
        imageSrc="/cabins/cottage-4/cottage-4-cabin-exterior-with-horse.jpg"
      />
      <Cabins showHeader={false} />
      <CabinMedia />
      <BookingForm />
    </main>
  );
}
