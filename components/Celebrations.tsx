import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fence, Heart, PartyPopper } from "lucide-react";

const occasions = [
  {
    icon: Heart,
    title: "Śluby i sesje plenerowe",
    description: "Natura, konie i beskidzkie widoki jako autentyczna oprawa dnia.",
  },
  {
    icon: PartyPopper,
    title: "Urodziny i spotkania",
    description: "Kameralne przyjęcia, ognisko i wspólny czas bez miejskiego pośpiechu.",
  },
  {
    icon: Fence,
    title: "Warsztaty i grupy",
    description: "Pobyt połączony z atrakcjami, naturą i kontaktem ze zwierzętami.",
  },
];

export default function Celebrations() {
  return (
    <section className="relative overflow-hidden bg-ranczo-cream py-24 md:py-32">
      <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-ranczo-sand/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="grid h-[520px] grid-cols-[1.15fr_0.85fr] grid-rows-2 gap-3 sm:h-[640px] sm:gap-4">
          <div className="relative row-span-2 overflow-hidden rounded-[1.75rem]">
            <Image
              src="/events/wedding-session/bride-and-groom-with-horse-in-countryside.jpeg"
              alt="Para młoda z koniem na Ranczo 44"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 58vw, 32vw"
            />
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <Image
              src="/events/wedding-session/romantic-outdoor-wedding-dinner-at-sunset.png"
              alt="Kameralne przyjęcie plenerowe o zachodzie słońca"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 42vw, 23vw"
            />
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <Image
              src="/events/wedding-session/joyful-newlyweds-running-through-meadow.jpeg"
              alt="Nowożeńcy na beskidzkiej łące"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 42vw, 23vw"
            />
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-ranczo-terracotta">
            Wydarzenia na Ranczo
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-ranczo-charcoal md:text-5xl lg:text-6xl">
            Ważne chwile potrzebują{" "}
            <span className="italic font-normal text-ranczo-green">
              prawdziwej scenerii
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ranczo-charcoal/68">
            Ranczo 44 to nie tylko nocleg. To kameralna przestrzeń na ślub,
            rodzinne świętowanie, spotkanie grupowe albo dzień zbudowany wokół
            natury i koni.
          </p>

          <div className="mt-8 space-y-5">
            {occasions.map((occasion) => (
              <div key={occasion.title} className="flex gap-4">
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ranczo-terracotta shadow-sm ring-1 ring-ranczo-charcoal/8">
                  <occasion.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ranczo-charcoal">
                    {occasion.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ranczo-charcoal/62">
                    {occasion.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/wydarzenia"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ranczo-terracotta px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#b6562f] hover:shadow-lg"
            >
              Zobacz możliwości
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/wydarzenia#zapytanie-event"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-ranczo-charcoal/20 px-7 py-3.5 font-semibold text-ranczo-charcoal transition-colors hover:border-ranczo-green hover:text-ranczo-green"
            >
              Zapytaj o swój termin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
