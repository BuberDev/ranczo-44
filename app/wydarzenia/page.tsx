import SubpageHero from "@/components/SubpageHero";
import Events from "@/components/Events";
import EventInquiryForm from "@/components/EventInquiryForm";

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
        imageSrc="/photos_ranczo_44/image00063.jpeg"
      />
      <Events />
      <EventInquiryForm />
    </main>
  );
}
