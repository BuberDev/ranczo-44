"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Expand } from "lucide-react";
import ImageLightbox, { type LightboxImage } from "@/components/ImageLightbox";

type GalleryCategory = "all" | "cabins" | "weddings" | "ranch";

interface GalleryImage extends LightboxImage {
  category: Exclude<GalleryCategory, "all">;
  label: string;
  span?: string;
}

const categories: Array<{ id: GalleryCategory; label: string }> = [
  { id: "all", label: "Wszystko" },
  { id: "cabins", label: "Domki" },
  { id: "weddings", label: "Śluby" },
  { id: "ranch", label: "Ranczo i natura" },
];

const galleryImages: GalleryImage[] = [
  {
    src: "/cabins/cottage-4/cottage-4-ranch-view-with-horses.jpg",
    alt: "Domek nr 4 i konie na zielonym pastwisku",
    category: "cabins",
    label: "Domek 4",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/events/wedding-session/bride-and-groom-with-horse-in-countryside.jpeg",
    alt: "Para młoda z koniem na tle Beskidu Niskiego",
    category: "weddings",
    label: "Ślub w naturze",
  },
  {
    src: "/cabins/cottage-2/cottage-2-horses-by-the-porch.jpg",
    alt: "Konie stojące tuż przy werandzie Domku nr 2",
    category: "cabins",
    label: "Domek 2",
  },
  {
    src: "/Obiekt/wooden-shelf-with-handmade-mugs.jpg",
    alt: "Drewniana półka z ręcznie robionymi kubkami w domku",
    category: "ranch",
    label: "Ranczo 44",
    span: "md:col-span-2",
  },
  {
    src: "/events/wedding-session/joyful-newlyweds-running-through-meadow.jpeg",
    alt: "Nowożeńcy biegnący przez łąkę",
    category: "weddings",
    label: "Ślub w naturze",
    span: "md:col-span-2",
  },
  {
    src: "/cabins/cottage-4/cottage-4-living-room-with-stone-fireplace.jpg",
    alt: "Salon Domku nr 4 z kamiennym kominkiem",
    category: "cabins",
    label: "Domek 4",
  },
  {
    src: "/Konie/pinto-horse-trotting-with-flowing-mane.jpg",
    alt: "Koń na Ranczo 44",
    category: "ranch",
    label: "Konie",
  },
  {
    src: "/events/wedding-session/romantic-outdoor-wedding-dinner-at-sunset.png",
    alt: "Kolacja weselna przy zachodzie słońca",
    category: "weddings",
    label: "Przyjęcie plenerowe",
    span: "md:row-span-2",
  },
  {
    src: "/cabins/cottage-2/cottage-2-cozy-stone-fireplace.jpeg",
    alt: "Rozpalony kamienny kominek w Domku nr 2",
    category: "cabins",
    label: "Domek 2",
  },
  {
    src: "/attractions/pool-ranczo-44.jpg",
    alt: "Basen na terenie Ranczo 44 w otoczeniu pastwisk",
    category: "ranch",
    label: "Basen na Ranczu",
  },
  {
    src: "/events/wedding-session/bride-and-groom-on-vintage-wedding-wagon.jpeg",
    alt: "Para młoda na rustykalnym wozie",
    category: "weddings",
    label: "Sesja poślubna",
  },
  {
    src: "/cabins/cottage-4/cottage-4-covered-terrace-seating.jpg",
    alt: "Zadaszony taras Domku nr 4",
    category: "cabins",
    label: "Domek 4",
  },
  {
    src: "/Obiekt/horses-grazing-below-ranch-house.jpg",
    alt: "Panorama Ranczo 44 w Beskidzie Niskim",
    category: "ranch",
    label: "Beskid Niski",
    span: "md:col-span-2",
  },
  {
    src: "/events/wedding-session/romantic-forest-wedding-portrait.jpeg",
    alt: "Romantyczny portret ślubny w lesie",
    category: "weddings",
    label: "Sesja poślubna",
  },
  {
    src: "/cabins/cottage-2/cottage-2-bedroom-with-wooden-walls.jpeg",
    alt: "Sypialnia z drewnianymi ścianami w Domku nr 2",
    category: "cabins",
    label: "Domek 2",
  },
  {
    src: "/Konie/pinto-horse-grazing-in-golden-mountain-meadow.jpg",
    alt: "Konie na łące Ranczo 44",
    category: "ranch",
    label: "Konie",
  },
];

export default function Gallery({ showHeader = true }: { showHeader?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleImages = useMemo(
    () =>
      activeCategory === "all"
        ? galleryImages
        : galleryImages.filter((image) => image.category === activeCategory),
    [activeCategory]
  );

  const changeCategory = (category: GalleryCategory) => {
    setActiveCategory(category);
    setLightboxIndex(null);
  };

  return (
    <>
      <section
        id="galeria"
        className="relative overflow-hidden bg-gradient-to-br from-white via-ranczo-cream to-[#ebe7dc] py-24 md:py-32"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,_rgba(132,163,107,0.14),_transparent_34%),radial-gradient(circle_at_88%_18%,_rgba(201,101,57,0.08),_transparent_28%)]" />
        <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={showHeader ? "mb-12 text-center md:mb-16" : "mb-10 text-center md:mb-12"}
          >
            {showHeader ? (
              <>
                <span className="text-sm font-medium uppercase tracking-[0.3em] text-ranczo-terracotta">
                  Galeria
                </span>
                <h2 className="mt-4 font-serif text-4xl font-bold text-ranczo-charcoal md:text-5xl lg:text-6xl">
                  Chwile z Rancza
                </h2>
              </>
            ) : null}
            <div
              className={showHeader ? "mx-auto mt-4 h-px w-16 bg-ranczo-terracotta" : "mx-auto h-px w-16 bg-ranczo-terracotta"}
            />
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ranczo-charcoal/60">
              Zobacz domki, konie, otoczenie oraz kameralne uroczystości w naturalnej
              scenerii Beskidu Niskiego.
            </p>
          </motion.div>

          <div
            role="group"
            aria-label="Filtruj galerię"
            className="mb-8 flex snap-x gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
          >
            {categories.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => changeCategory(category.id)}
                  className={`shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta focus-visible:ring-offset-2 ${
                    isActive
                      ? "border-ranczo-green bg-ranczo-green text-white shadow-md"
                      : "border-ranczo-green/15 bg-white/80 text-ranczo-charcoal/60 hover:border-ranczo-green/30 hover:text-ranczo-charcoal"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[210px] md:grid-cols-4 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {visibleImages.map((image, index) => (
                <motion.button
                  layout
                  key={image.src}
                  type="button"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.18) }}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Powiększ zdjęcie: ${image.alt}`}
                  className={`group relative overflow-hidden rounded-2xl bg-ranczo-charcoal shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta focus-visible:ring-offset-4 ${
                    image.span ?? ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <span className="absolute inset-0 bg-ranczo-charcoal/0 transition-colors duration-300 group-hover:bg-ranczo-charcoal/10" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ranczo-charcoal/72 via-ranczo-charcoal/18 to-transparent" />
                  <span className="absolute bottom-4 left-4 max-w-[calc(100%-4.5rem)] text-left text-[10px] font-semibold uppercase tracking-[0.24em] text-ranczo-sand drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:text-[11px]">
                    {image.label}
                  </span>
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white opacity-70 backdrop-blur-md transition-all group-hover:bg-black/45 group-hover:opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <Expand size={16} />
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <ImageLightbox
        images={visibleImages}
        activeIndex={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
