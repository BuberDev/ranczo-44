"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const backgroundImages = [
  "/photos_ranczo_44/_MG_1076.jpeg",
  "/photos_ranczo_44/_MG_1121.jpeg",
  "/photos_ranczo_44/_MG_0338.jpeg",
  "/photos_ranczo_44/_MG_0339.jpeg",
  "/photos_ranczo_44/IMG_4324.JPG",
  "/photos_ranczo_44/IMG_4333.JPG",
  "/photos_ranczo_44/IMG_4334.JPG",
  "/photos_ranczo_44/IMG_4337.JPG",
  "/photos_ranczo_44/IMG_4340.JPG",
  "/photos_ranczo_44/IMG_4341.JPG",
  "/photos_ranczo_44/IMG_4342.JPG",
  "/photos_ranczo_44/IMG_4352.JPG",
  "/photos_ranczo_44/IMG_4368.JPG",
  "/photos_ranczo_44/IMG_4369.JPG",
  "/photos_ranczo_44/IMG_4370.JPG",
  "/photos_ranczo_44/IMG_4372.JPG",
  "/photos_ranczo_44/image00063.jpeg",
  "/photos_ranczo_44/image00064.jpeg",
  "/photos_ranczo_44/image00065.jpeg",
  "/photos_ranczo_44/image00066.jpeg",
  "/photos_ranczo_44/image00067.jpeg",
  "/photos_ranczo_44/image00068.jpeg",
  "/photos_ranczo_44/image00069.jpeg",
  "/photos_ranczo_44/image00070.jpeg",
  "/photos_ranczo_44/image00071.jpeg",
  "/photos_ranczo_44/image00072.jpeg",
  "/photos_ranczo_44/image00073.jpeg",
  "/photos_ranczo_44/image00074.jpeg",
  "/photos_ranczo_44/image00075.jpeg",
  "/photos_ranczo_44/image00076.jpeg",
  "/photos_ranczo_44/image00077.jpeg",
  "/photos_ranczo_44/image00080.jpeg",
  "/photos_ranczo_44/image00081.jpeg",
  "/photos_ranczo_44/image00082.jpeg",
  "/photos_ranczo_44/image00083.jpeg",
  "/photos_ranczo_44/image00084.jpeg",
  "/photos_ranczo_44/image00085.jpeg",
  "/photos_ranczo_44/image00086.jpeg",
  "/photos_ranczo_44/image00087.jpeg",
  "/photos_ranczo_44/image00088.jpeg",
  "/photos_ranczo_44/image00089.jpeg",
  "/photos_ranczo_44/image00090.jpeg",
  "/photos_ranczo_44/image00091.jpeg",
  "/photos_ranczo_44/image00092.jpeg",
];

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Parallax effect
    const onScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Background slider interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Zmiana co 6 sekund
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background image slider with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 -top-20 -bottom-20">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentImageIndex]}
              alt="Ranczo 44 — Beskid Niski"
              fill
              className="object-cover"
              quality={85}
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ranczo-charcoal/60 via-ranczo-charcoal/30 to-ranczo-charcoal/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ranczo-charcoal/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-20 h-px bg-ranczo-terracotta mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm md:text-base tracking-[0.35em] uppercase text-ranczo-sand/90 font-medium mb-4"
        >
          Beskid Niski · Uście Gorlickie
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
        >
          Ranczo{" "}
          <span className="text-ranczo-terracotta">44</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-6 max-w-xl text-lg md:text-xl text-white/80 font-light leading-relaxed"
        >
          Wyprawa w głąb króliczej nory.
          <br className="hidden sm:block" />
          Gdzie dzika natura spotyka kowbojską fantazję.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#rezerwacja"
            className="px-8 py-3.5 bg-ranczo-terracotta text-white font-semibold rounded-full hover:bg-ranczo-terracotta/85 transition-all duration-300 hover:shadow-xl hover:shadow-ranczo-terracotta/20 hover:-translate-y-0.5"
          >
            Zarezerwuj pobyt
          </a>
          <a
            href="#o-nas"
            className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            Odkryj Ranczo
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs tracking-widest uppercase">Przewiń</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
