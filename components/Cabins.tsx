"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Flame, Users, Bed, Maximize } from "lucide-react";

const cabins = [
  {
    name: "Domek Kowbojski",
    desc: "Klimatyczny domek z drewna z werandą, kominkiem i widokiem na góry. Idealny dla par i małych rodzin.",
    image: "/photos_ranczo_44/_MG_0338.jpeg",
    features: [
      { icon: Bed, label: "2 sypialnie" },
      { icon: Users, label: "Do 4 osób" },
      { icon: Flame, label: "Kominek" },
      { icon: Maximize, label: "45 m²" },
    ],
  },
  {
    name: "Domek Leśny",
    desc: "Przytulny domek otoczony lasem, z panoramicznym oknem i drewnianym tarasem. Idealne schronienie dla naturalistów.",
    image: "/photos_ranczo_44/domek 1.jpg",
    features: [
      { icon: Bed, label: "2 sypialnie" },
      { icon: Users, label: "Do 5 osób" },
      { icon: Flame, label: "Kominek" },
      { icon: Maximize, label: "50 m²" },
    ],
  },
  {
    name: "Domek Rodzinny",
    desc: "Przestronny domek z dużym salonem i w pełni wyposażoną kuchnią. Stworzony z myślą o rodzinach z dziećmi.",
    image: "/photos_ranczo_44/Domek 2.jpg",
    features: [
      { icon: Bed, label: "3 sypialnie" },
      { icon: Users, label: "Do 6 osób" },
      { icon: Flame, label: "Kominek" },
      { icon: Maximize, label: "60 m²" },
    ],
  },
];

export default function Cabins() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="domki" className="relative py-24 md:py-32 bg-ranczo-cream overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-ranczo-terracotta/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-ranczo-terracotta font-medium">
            Noclegi
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ranczo-charcoal">
            Nasze domki
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-ranczo-terracotta" />
          <p className="mt-6 max-w-lg mx-auto text-ranczo-charcoal/60 leading-relaxed">
            Drewniane domki z kominkiem, w pełni wyposażone, z widokiem na beskidzkie
            szczyty. Każdy z nich ma swój unikalny charakter.
          </p>
        </motion.div>

        {/* Cabins */}
        <div className="space-y-16">
          {cabins.map((cabin, i) => (
            <motion.div
              key={cabin.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                i % 2 !== 0 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group ${
                i % 2 !== 0 ? "lg:order-2" : ""
              }`}>
                <Image
                  src={cabin.image}
                  alt={cabin.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ranczo-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className={`space-y-5 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-ranczo-charcoal">
                  {cabin.name}
                </h3>
                <p className="text-ranczo-charcoal/65 leading-relaxed">
                  {cabin.desc}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {cabin.features.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-3 p-3 rounded-xl bg-ranczo-green/5"
                    >
                      <f.icon className="w-5 h-5 text-ranczo-terracotta flex-shrink-0" />
                      <span className="text-sm font-medium text-ranczo-charcoal/70">
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#rezerwacja"
                  className="inline-block mt-4 px-6 py-3 bg-ranczo-green text-white font-semibold rounded-full hover:bg-ranczo-green-light transition-colors duration-300 hover:shadow-lg"
                >
                  Sprawdź dostępność
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
