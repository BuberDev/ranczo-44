import Attractions from "@/components/Attractions";
import ParallaxDivider from "@/components/ParallaxDivider";

export const metadata = {
  title: "Atrakcje | Ranczo 44",
  description: "Poznaj nasze atrakcje: podgrzewany basen, cedrową banię i konie.",
};

export default function AttractionsPage() {
  return (
    <main className="pt-24 min-h-screen bg-ranczo-charcoal">
      <Attractions />
      <ParallaxDivider />
    </main>
  );
}
