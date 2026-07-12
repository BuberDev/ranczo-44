import About from "@/components/About";

export const metadata = {
  title: "O nas | Ranczo 44",
  description: "Poznaj historię Ranczo 44. Dowiedz się więcej o Ani, Rafale i Adasiu.",
};

export default function AboutPage() {
  return (
    <main className="pt-24 min-h-screen bg-ranczo-cream">
      <About />
    </main>
  );
}
