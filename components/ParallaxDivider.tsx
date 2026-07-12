"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function ParallaxDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/photos_ranczo_44/_MG_1121.jpeg"
          alt="Ranczo 44 w śnieżnej scenerii Beskidu Niskiego"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-ranczo-charcoal/60" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <p className="font-serif text-2xl md:text-4xl text-white italic leading-relaxed">
            &ldquo;Miejsce, do którego wracacie jak do domu. 
            Bo dobre rzeczy warto powtarzać.&rdquo;
          </p>
          <footer className="mt-6 text-sm text-white/60 tracking-wide uppercase">
            Ania, Rafał & Adaś — Gospodarze Rancza 44
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
