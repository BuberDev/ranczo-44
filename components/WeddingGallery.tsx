"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand, Heart } from "lucide-react";
import ImageLightbox, { type LightboxImage } from "@/components/ImageLightbox";

const weddingImages: Array<LightboxImage & { className: string }> = [
  {
    src: "/events/wedding-session/bride-and-groom-with-horse-in-countryside.jpeg",
    alt: "Para młoda z koniem na tle zielonych wzgórz Ranczo 44",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/events/wedding-session/bride-and-groom-on-vintage-wedding-wagon.jpeg",
    alt: "Para młoda na rustykalnym wozie ślubnym",
    className: "md:row-span-2",
  },
  {
    src: "/events/wedding-session/joyful-newlyweds-running-through-meadow.jpeg",
    alt: "Nowożeńcy biegnący przez łąkę",
    className: "md:col-span-2",
  },
  {
    src: "/events/wedding-session/newlyweds-watching-horses-in-pasture.jpeg",
    alt: "Nowożeńcy obserwujący konie na pastwisku",
    className: "",
  },
  {
    src: "/events/wedding-session/romantic-outdoor-wedding-dinner-at-sunset.png",
    alt: "Romantyczna kolacja weselna przy zachodzie słońca",
    className: "md:row-span-2",
  },
  {
    src: "/events/wedding-session/romantic-forest-wedding-portrait.jpeg",
    alt: "Leśny portret ślubny na Ranczo 44",
    className: "md:col-span-2",
  },
  {
    src: "/events/wedding-session/newlyweds-by-ranch-fence-and-saddle.jpeg",
    alt: "Para młoda przy ogrodzeniu i siodle",
    className: "",
  },
  {
    src: "/events/wedding-session/bride-and-groom-by-rustic-wedding-wagon.jpeg",
    alt: "Para młoda obok rustykalnego wozu",
    className: "",
  },
  {
    src: "/events/wedding-session/rustic-wedding-table-with-mountain-view.png",
    alt: "Rustykalny stół weselny z widokiem na góry",
    className: "md:col-span-2",
  },
];

export default function WeddingGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section
        id="sluby-plenerowe"
        className="relative scroll-mt-20 overflow-hidden bg-[#fffaf2] py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,_rgba(201,101,57,0.10),_transparent_28%),radial-gradient(circle_at_92%_80%,_rgba(132,163,107,0.13),_transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-12 grid items-end gap-8 md:grid-cols-[1.15fr_0.85fr] md:mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-ranczo-terracotta">
                <Heart size={16} />
                Śluby w naturze
              </span>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl font-bold leading-tight text-ranczo-charcoal md:text-5xl">
                Sceneria, która nie potrzebuje dekoracji
              </h2>
            </div>
            <p className="max-w-lg leading-relaxed text-ranczo-charcoal/60 md:justify-self-end">
              Łąki, konie, las i zachód słońca tworzą naturalne tło dla kameralnej
              ceremonii, sesji poślubnej i kolacji pod gołym niebem.
            </p>
          </div>

          <div className="grid auto-rows-[190px] grid-cols-2 gap-3 md:auto-rows-[230px] md:grid-cols-4 md:gap-4">
            {weddingImages.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.24) }}
                onClick={() => setLightboxIndex(index)}
                aria-label={`Powiększ zdjęcie: ${image.alt}`}
                className={`group relative overflow-hidden rounded-2xl bg-ranczo-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta focus-visible:ring-offset-4 ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ranczo-charcoal/45 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-black/35 text-white opacity-0 backdrop-blur-md transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand size={16} />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <ImageLightbox
        images={weddingImages}
        activeIndex={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
