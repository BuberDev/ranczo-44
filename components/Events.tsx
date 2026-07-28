"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { PartyPopper, Heart, Fence } from "lucide-react";

const eventTypes = [
  {
    icon: PartyPopper,
    title: "Imprezy okolicznościowe",
    desc: "Urodziny, integracje firmowe, wieczory kawalerskie i panieńskie — cały teren rancza do dyspozycji Twojej grupy, z ogniskiem, grillem i basenem w tle.",
    image: "/photos_ranczo_44/hero_photo_4.JPG",
  },
  {
    icon: Heart,
    title: "Śluby i wesela plenerowe",
    desc: "Ceremonia z widokiem na Beskid Niski i przyjęcie pod gołym niebem. Malownicza sceneria, którą zapamiętacie na zawsze — my zajmujemy się resztą.",
    image: "/photos_ranczo_44/image00063.jpeg",
  },
  {
    icon: Fence,
    title: "Aktywności z końmi i warsztaty",
    desc: "Jazda konna, kontakt ze zwierzętami i warsztaty terenowe dla grup oraz szkół — niepowtarzalna atrakcja integracyjna w sercu natury.",
    image: "/photos_ranczo_44/IMG_5315.JPG",
  },
];

export default function Events() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-[#0f3d24] via-ranczo-charcoal to-[#124f35] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ranczo-terracotta/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(31,174,75,0.18),_transparent_34%),radial-gradient(circle_at_82%_20%,_rgba(242,106,27,0.14),_transparent_32%),radial-gradient(circle_at_50%_100%,_rgba(120,201,67,0.12),_transparent_38%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-ranczo-terracotta font-medium">
            Wyjątkowe chwile
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white">
            Wydarzenia na Ranczo
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-ranczo-terracotta" />
          <p className="mt-6 max-w-lg mx-auto text-white/60 leading-relaxed">
            Dzika natura Beskidu Niskiego i kameralny klimat Rancza jako scenografia
            Twojego wydarzenia — dopasowujemy przestrzeń i atrakcje do okazji.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {eventTypes.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-white/8 border border-white/12 shadow-xl shadow-black/10 hover:border-ranczo-terracotta/40 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ranczo-charcoal/90 via-ranczo-charcoal/20 to-transparent" />
              </div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="#zapytanie-event"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-ranczo-terracotta text-white font-semibold rounded-full hover:bg-ranczo-terracotta/85 transition-all duration-300 hover:shadow-xl hover:shadow-ranczo-terracotta/20 hover:-translate-y-0.5"
          >
            Zapytaj o dostępny termin
          </a>
        </motion.div>
      </div>
    </section>
  );
}
