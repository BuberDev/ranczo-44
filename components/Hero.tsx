"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background image with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 -top-20 -bottom-20">
        <Image
          src="/photos_ranczo_44/_MG_1076.jpeg"
          alt="Ranczo 44 — Beskid Niski, domki w zimowej scenerii"
          fill
          className="object-cover"
          quality={85}
          sizes="100vw"
          priority
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ranczo-charcoal/60 via-ranczo-charcoal/30 to-ranczo-charcoal/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-ranczo-charcoal/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
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
