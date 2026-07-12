"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Waves,
  Flame,
  TreePine,
  Fence,
  Utensils,
  Tent,
} from "lucide-react";

const attractions = [
  {
    icon: Waves,
    title: "Podgrzewany basen",
    desc: "Ciepła woda czeka na Ciebie niezależnie od pogody. Relaks z widokiem na góry to coś, co zostanie z Tobą na długo.",
    image: "/photos_ranczo_44/IMG_4815.JPG",
  },
  {
    icon: Flame,
    title: "Cedrowa bania",
    desc: "Zewnętrzna balia z cedrowego drewna — aromatyczna kąpiel pod gwiazdami z dźwiękami natury w tle.",
    image: "/photos_ranczo_44/IMG_4816.JPG",
  },
  {
    icon: Fence,
    title: "Konie na pastwisku",
    desc: "Loki i Thorn, nasze konie, są stałymi rezydentami Rancza. Możesz je nakarmić marchewką prosto z ręki.",
    image: "/photos_ranczo_44/IMG_4852.JPG",
  },
  {
    icon: TreePine,
    title: "Szlaki i spacery",
    desc: "Beskid Niski to raj dla piechurów. Ruszaj na szlak prosto spod domku i odkryj dziką naturę Łemkowszczyzny.",
    image: "/photos_ranczo_44/IMG_4957.JPG",
  },
  {
    icon: Utensils,
    title: "Domowe smaki",
    desc: "Domowe przetwory, lokalne sery, wędzony pstrąg. Śniadanie z widokiem na beskidzkie szczyty to czysta przyjemność.",
    image: "/photos_ranczo_44/IMG_4972.JPG",
  },
  {
    icon: Tent,
    title: "Ognisko i grill",
    desc: "Każdy wieczór może stać się wyjątkowy — iskry lecą w niebo, kiełbaski skwierczą, a gwiazdy świecą jak nigdzie indziej.",
    image: "/photos_ranczo_44/IMG_4866.JPG",
  },
];

export default function Attractions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="atrakcje" className="relative py-24 md:py-32 bg-ranczo-charcoal overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ranczo-terracotta/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-ranczo-terracotta font-medium">
            Co tu znajdziesz
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white">
            Atrakcje
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-ranczo-terracotta" />
          <p className="mt-6 max-w-lg mx-auto text-white/60 leading-relaxed">
            Każdy dzień na Ranczo to nowa przygoda. Od porannej jazdy konnej 
            po wieczorną kąpiel w cedrowej bani — tu czas płynie inaczej.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-ranczo-terracotta/30 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Card image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ranczo-charcoal to-transparent" />
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-ranczo-terracotta/15 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-ranczo-terracotta" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
