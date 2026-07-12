import Cabins from "@/components/Cabins";

export const metadata = {
  title: "Domki | Ranczo 44",
  description: "Zobacz nasze komfortowe domki w Beskidzie Niskim.",
};

export default function CabinsPage() {
  return (
    <main className="pt-24 min-h-screen bg-ranczo-cream">
      <Cabins />
    </main>
  );
}
