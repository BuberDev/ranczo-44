import Gallery from "@/components/Gallery";
import SubpageHero from "@/components/SubpageHero";

export const metadata = {
  title: "Galeria zdjęć – Ranczo 44 | Beskid Niski",
  description: "Zobacz piękno Ranczo 44 na zdjęciach. Domki, basen, bania, konie, Beskid Niski i chwile, które zostają na zawsze.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-ranczo-charcoal">
      <SubpageHero
        title="Galeria"
        subtitle="Ranczo 44 · Piękno Beskidu Niskiego"
        imageSrc="/photos_ranczo_44/image00080.jpeg"
      />
      <Gallery />
    </main>
  );
}
