import About from "@/components/About";
import SubpageHero from "@/components/SubpageHero";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "O nas – Poznaj Ranczo 44 | Beskid Niski",
  description: "Poznaj historię Ranczo 44. Ania, Rafał i Adaś zapraszają do kameralnego ośrodka w Beskidzie Niskim – z kominkiem, końmi i dziką naturą.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <SubpageHero
        title="O nas"
        subtitle="Ranczo 44 · Nasza historia"
        imageSrc="/photos_ranczo_44/_MG_1076.jpeg"
      />
      <About />
      <BookingForm />
    </main>
  );
}
