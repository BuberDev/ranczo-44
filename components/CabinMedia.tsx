"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, Flame, Mountain, Trees } from "lucide-react";
import ImageLightbox, { type LightboxImage } from "@/components/ImageLightbox";

interface CabinCollection {
  id: "cottage-4" | "cottage-2";
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  images: LightboxImage[];
}

const cabinCollections: CabinCollection[] = [
  {
    id: "cottage-4",
    tabLabel: "Domek 4",
    eyebrow: "Kowbojski charakter",
    title: "Domek nr 4",
    description:
      "Ciepłe drewno, kamienny kominek i zadaszony taras tworzą wnętrze, które dobrze wygląda o każdej porze roku. Za oknem — łąka i konie.",
    highlights: ["Kamienny kominek", "Zadaszony taras", "Widok na pastwisko"],
    images: [
      {
        src: "/cabins/cottage-4/cottage-4-ranch-view-with-horses.jpg",
        alt: "Domek nr 4 z widokiem na konie pasące się przed werandą",
      },
      {
        src: "/cabins/cottage-4/cottage-4-living-room-with-stone-fireplace.jpg",
        alt: "Salon Domku nr 4 z kamiennym kominkiem",
      },
      {
        src: "/cabins/cottage-4/cottage-4-cozy-living-room-sofa.jpg",
        alt: "Przytulny salon Domku nr 4 z sofą",
      },
      {
        src: "/cabins/cottage-4/cottage-4-rustic-dining-nook.jpg",
        alt: "Rustykalny kącik jadalniany w Domku nr 4",
      },
      {
        src: "/cabins/cottage-4/cottage-4-rustic-double-bedroom.jpg",
        alt: "Dwuosobowa sypialnia w Domku nr 4",
      },
      {
        src: "/cabins/cottage-4/cottage-4-rustic-bathroom-vanity.jpg",
        alt: "Drewniana szafka z umywalką w łazience Domku nr 4",
      },
      {
        src: "/cabins/cottage-4/cottage-4-covered-terrace-seating.jpg",
        alt: "Zadaszony taras Domku nr 4 z miejscem do odpoczynku",
      },
      {
        src: "/cabins/cottage-4/cottage-4-wood-burning-stove-close-up.jpg",
        alt: "Rozpalony piec opalany drewnem w Domku nr 4",
      },
      {
        src: "/cabins/cottage-4/cottage-4-wooden-cabin-exterior.jpg",
        alt: "Drewniany Domek nr 4 widziany od strony pastwiska",
      },
    ],
  },
  {
    id: "cottage-2",
    tabLabel: "Domek 2",
    eyebrow: "Leśny spokój",
    title: "Domek nr 2",
    description:
      "Kameralny domek otoczony zielenią, z własnym tarasem, kominkiem i naturalnymi detalami. Konie często podchodzą tu niemal pod samą werandę.",
    highlights: ["Prywatny taras", "Kominek z kamienia", "Konie tuż obok"],
    images: [
      {
        src: "/cabins/cottage-2/cottage-2-cabin-exterior-with-horses.jpg",
        alt: "Domek nr 2 z końmi stojącymi przed werandą",
      },
      {
        src: "/cabins/cottage-2/cottage-2-horses-by-the-porch.jpg",
        alt: "Konie przy werandzie Domku nr 2",
      },
      {
        src: "/cabins/cottage-2/cottage-2-cozy-stone-fireplace.jpeg",
        alt: "Rozpalony kamienny kominek w Domku nr 2",
      },
      {
        src: "/cabins/cottage-2/cottage-2-private-wooden-terrace.jpg",
        alt: "Prywatny drewniany taras Domku nr 2",
      },
      {
        src: "/cabins/cottage-2/cottage-2-bedroom-with-wooden-walls.jpeg",
        alt: "Sypialnia z drewnianymi ścianami w Domku nr 2",
      },
      {
        src: "/cabins/cottage-2/cottage-2-rustic-bedroom.jpeg",
        alt: "Rustykalna sypialnia w Domku nr 2",
      },
      {
        src: "/cabins/cottage-2/cottage-2-wooden-bunk-bed.jpeg",
        alt: "Drewniane łóżko piętrowe w Domku nr 2",
      },
      {
        src: "/cabins/cottage-2/cottage-2-cozy-reading-corner.jpeg",
        alt: "Przytulny fotel do czytania w Domku nr 2",
      },
      {
        src: "/cabins/cottage-2/cottage-2-rustic-entryway.jpeg",
        alt: "Drewniany wiatrołap Domku nr 2",
      },
      {
        src: "/cabins/cottage-2/cottage-2-bathroom-and-dining-area.jpeg",
        alt: "Widok z łazienki na część jadalnianą Domku nr 2",
      },
      {
        src: "/cabins/cottage-2/cottage-2-rustic-cabin-with-porch-swing.jpg",
        alt: "Domek nr 2 z drewnianą huśtawką na werandzie",
      },
    ],
  },
];

const videoTours = [
  {
    title: "Spacer po wnętrzu",
    description: "Zobacz układ pomieszczeń i detale Domku nr 4.",
    src: "/videos/cottage-4-interior-tour.mp4",
    poster: "/videos/cottage-4-interior-tour-poster.jpg",
  },
  {
    title: "Domek i jego otoczenie",
    description: "Krótki spacer od wnętrza po basen, pastwisko i konie.",
    src: "/videos/cottage-4-ranch-tour.mp4",
    poster: "/videos/cottage-4-ranch-tour-poster.jpg",
  },
];

export default function CabinMedia() {
  const [activeCabinId, setActiveCabinId] = useState<CabinCollection["id"]>("cottage-4");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeCabin = useMemo(
    () => cabinCollections.find((cabin) => cabin.id === activeCabinId) ?? cabinCollections[0],
    [activeCabinId]
  );
  const selectedImage = activeCabin.images[selectedImageIndex] ?? activeCabin.images[0];

  const selectCabin = (id: CabinCollection["id"]) => {
    setActiveCabinId(id);
    setSelectedImageIndex(0);
    setLightboxIndex(null);
  };

  return (
    <>
      <section
        id="galeria-domkow"
        className="relative scroll-mt-20 overflow-hidden bg-[#fffdf8] py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_12%,_rgba(132,163,107,0.13),_transparent_28%),radial-gradient(circle_at_100%_65%,_rgba(201,101,57,0.09),_transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-ranczo-terracotta">
              Zajrzyj do środka
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold text-ranczo-charcoal md:text-5xl">
              Wybierz klimat dla siebie
            </h2>
            <p className="mt-5 leading-relaxed text-ranczo-charcoal/60">
              Obejrzyj wnętrza, tarasy i najbliższe otoczenie dwóch domków.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Galerie domków"
            className="mx-auto mb-8 flex w-fit rounded-full border border-ranczo-green/15 bg-white p-1.5 shadow-sm"
          >
            {cabinCollections.map((cabin) => {
              const isActive = cabin.id === activeCabinId;
              return (
                <button
                  key={cabin.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`gallery-panel-${cabin.id}`}
                  id={`gallery-tab-${cabin.id}`}
                  onClick={() => selectCabin(cabin.id)}
                  className={`min-w-28 rounded-full px-5 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta ${
                    isActive
                      ? "bg-ranczo-green text-white shadow-md"
                      : "text-ranczo-charcoal/60 hover:text-ranczo-charcoal"
                  }`}
                >
                  {cabin.tabLabel}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCabin.id}
              id={`gallery-panel-${activeCabin.id}`}
              role="tabpanel"
              aria-labelledby={`gallery-tab-${activeCabin.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)] lg:gap-14"
            >
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(selectedImageIndex)}
                  aria-label={`Powiększ zdjęcie: ${selectedImage.alt}`}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl bg-ranczo-charcoal shadow-2xl shadow-ranczo-charcoal/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta focus-visible:ring-offset-4 md:aspect-[16/10]"
                >
                  <Image
                    src={selectedImage.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="scale-110 object-cover opacity-25 blur-2xl"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                  />
                  <Image
                    key={selectedImage.src}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    quality={90}
                  />
                  <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                    <Expand size={15} />
                    Powiększ
                  </span>
                </button>

                <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
                  {activeCabin.images.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      aria-label={`Pokaż zdjęcie ${index + 1}: ${image.alt}`}
                      aria-pressed={selectedImageIndex === index}
                      className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta md:w-24 ${
                        selectedImageIndex === index
                          ? "ring-2 ring-ranczo-terracotta ring-offset-2"
                          : "opacity-65 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-ranczo-terracotta">
                  {activeCabin.eyebrow}
                </span>
                <h3 className="mt-3 font-serif text-4xl font-bold text-ranczo-charcoal">
                  {activeCabin.title}
                </h3>
                <p className="mt-5 leading-relaxed text-ranczo-charcoal/65">
                  {activeCabin.description}
                </p>
                <ul className="mt-7 space-y-3">
                  {activeCabin.highlights.map((highlight, index) => {
                    const Icon = [Flame, Trees, Mountain][index];
                    return (
                      <li
                        key={highlight}
                        className="flex items-center gap-3 rounded-2xl border border-ranczo-green/10 bg-white/80 px-4 py-3 text-sm font-medium text-ranczo-charcoal/70"
                      >
                        <Icon className="h-5 w-5 shrink-0 text-ranczo-terracotta" />
                        {highlight}
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="#rezerwacja"
                  className="mt-8 inline-flex rounded-full bg-ranczo-terracotta px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ranczo-terracotta/85 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta focus-visible:ring-offset-4"
                >
                  Zapytaj o ten domek
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section
        id="filmy-domku-4"
        className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#102d20] via-ranczo-charcoal to-[#254d36] py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_rgba(201,101,57,0.13),_transparent_30%),radial-gradient(circle_at_90%_75%,_rgba(132,163,107,0.14),_transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-ranczo-terracotta">
              Poczuj przestrzeń
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl">
              Domek nr 4 na filmie
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/60">
              Zdjęcia pokazują detale. Filmy pozwalają zobaczyć prawdziwy układ wnętrza
              i to, jak blisko domku są basen, pastwisko oraz konie.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {videoTours.map((video) => (
              <figure
                key={video.src}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/15"
              >
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={video.poster}
                  aria-label={`${video.title} — Domek nr 4`}
                  className="aspect-[9/16] max-h-[620px] w-full bg-black object-cover"
                >
                  <source src={video.src} type="video/mp4" />
                  Twoja przeglądarka nie obsługuje odtwarzania wideo.
                </video>
                <figcaption className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-white">{video.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{video.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ImageLightbox
        images={activeCabin.images}
        activeIndex={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
