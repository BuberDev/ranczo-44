import Gallery from "@/components/Gallery";

export const metadata = {
  title: "Galeria | Ranczo 44",
  description: "Zobacz zdjęcia z Ranczo 44. Nasze domki, okolica i zwierzęta.",
};

export default function GalleryPage() {
  return (
    <main className="pt-24 min-h-screen bg-stone-100">
      <Gallery />
    </main>
  );
}
