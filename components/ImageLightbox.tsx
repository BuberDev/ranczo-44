"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  activeIndex: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  activeIndex,
  onChange,
  onClose,
}: ImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null && images[activeIndex] !== undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onChange((activeIndex - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length, isOpen, onChange, onClose]);

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <AnimatePresence>
      {isOpen && activeImage && activeIndex !== null ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Podgląd zdjęcia: ${activeImage.alt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07140c]/95 p-4 backdrop-blur-md md:p-8"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Zamknij podgląd zdjęcia"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta md:right-8 md:top-8"
          >
            <X size={22} />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange((activeIndex - 1 + images.length) % images.length);
                }}
                aria-label="Poprzednie zdjęcie"
                className="absolute left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta md:left-8"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange((activeIndex + 1) % images.length);
                }}
                aria-label="Następne zdjęcie"
                className="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ranczo-terracotta md:right-8"
              >
                <ChevronRight size={24} />
              </button>
            </>
          ) : null}

          <motion.div
            key={activeImage.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="relative h-[82vh] w-[min(1120px,88vw)]"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="88vw"
              quality={90}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
