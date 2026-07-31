import SubpageHero from "@/components/SubpageHero";
import Events from "@/components/Events";
import EventInquiryForm from "@/components/EventInquiryForm";
import WeddingGallery from "@/components/WeddingGallery";

export const metadata = {
  title: "Wydarzenia i Eventy Plenerowe | Ranczo 44",
  description:
    "Śluby plenerowe, imprezy okolicznościowe i warsztaty z końmi w malowniczej scenerii Beskidu Niskiego. Zorganizuj wyjątkowe wydarzenie na Ranczo 44.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-ranczo-charcoal">
      <SubpageHero
        title="Wydarzenia"
        subtitle="Ranczo 44 · Eventy plenerowe"
        imageSrc="/events/wedding-session/bride-and-groom-by-rustic-wedding-wagon.jpeg"
        nextSectionTone="dark"
      />
      <Events showHeader={false} />
      <WeddingGallery />
      <EventInquiryForm />
    </main>
  );
}
