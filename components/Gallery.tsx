"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
  { src: "/photos_ranczo_44/IMG_4324.JPG", alt: "Wnętrze domku Ranczo 44", span: "col-span-2 row-span-2" },
  { src: "/photos_ranczo_44/IMG_4337.JPG", alt: "Detale domku", span: "" },
  { src: "/photos_ranczo_44/IMG_4338.JPG", alt: "Przytulne wnętrze", span: "" },
  { src: "/photos_ranczo_44/IMG_4340.JPG", alt: "Kuchnia w domku", span: "" },
  { src: "/photos_ranczo_44/IMG_4341.JPG", alt: "Łazienka w domku", span: "" },
  { src: "/photos_ranczo_44/IMG_4342.JPG", alt: "Sypialnia w domku", span: "col-span-2" },
  { src: "/photos_ranczo_44/IMG_4352.JPG", alt: "Widok z okna", span: "" },
  { src: "/photos_ranczo_44/IMG_4364.JPG", alt: "Otoczenie Rancza", span: "" },
  { src: "/photos_ranczo_44/domek 4.jpg", alt: "Domek z zewnątrz", span: "" },
  { src: "/photos_ranczo_44/domek 5.jpg", alt: "Wieczór na Ranczu", span: "" },
  { src: "/photos_ranczo_44/IMG_4368.JPG", alt: "Tereny Rancza 44", span: "col-span-2" },
  { src: "/photos_ranczo_44/IMG_4379.JPG", alt: "Widok na Beskid Niski", span: "" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section id="galeria" className="relative py-24 md:py-32 bg-stone-100 overflow-hidden">
        <div ref={ref} className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-ranczo-terracotta font-medium">
              Galeria
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ranczo-charcoal">
              Chwile z Rancza
            </h2>
            <div className="mt-4 mx-auto w-16 h-px bg-ranczo-terracotta" />
          </motion.div>

          {/* Masonry-like grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <motion.button
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                onClick={() => setLightbox(img.src)}
                className={`relative overflow-hidden rounded-xl aspect-square group cursor-pointer ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-ranczo-charcoal/0 group-hover:bg-ranczo-charcoal/30 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    Powiększ
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Powiększone zdjęcie z galerii Ranczo 44"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
