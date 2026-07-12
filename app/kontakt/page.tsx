import Contact from "@/components/Contact";

export const metadata = {
  title: "Kontakt | Ranczo 44",
  description: "Skontaktuj się z nami i zarezerwuj swój pobyt w Beskidzie Niskim.",
};

export default function ContactPage() {
  return (
    <main className="pt-24 min-h-screen bg-ranczo-cream">
      <Contact />
    </main>
  );
}
