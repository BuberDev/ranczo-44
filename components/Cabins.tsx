"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Flame, Trees, Users } from "lucide-react";

const featuredCabins = [
  {
    name: "Domek nr 2 – Leśny",
    desc: "Przytulne, drewniane wnętrze, kamienny kominek i własny taras. Dobry wybór dla pary lub rodziny, która chce być blisko natury.",
    image: "/cabins/cottage-2/cottage-2-cabin-exterior-with-horses.jpg",
    features: [
      { icon: Users, label: "Do 4 osób" },
      { icon: Flame, label: "Kominek" },
      { icon: Trees, label: "Prywatny taras" },
    ],
  },
  {
    name: "Domek nr 4 – Kowbojski",
    desc: "Rustykalny klimat rancza, salon z kominkiem i zadaszona weranda. Przestrzeń dla rodziny lub grupy przyjaciół.",
    image: "/cabins/cottage-4/cottage-4-ranch-view-with-horses.jpg",
    features: [
      { icon: Users, label: "Do 6 osób" },
      { icon: Flame, label: "Kominek" },
      { icon: Trees, label: "Widok na ranczo" },
    ],
  },
];

const otherCabins = [
  { name: "Domek 1 – Mustang", capacity: "do 4 osób" },
  { name: "Domek 3 – Sioux", capacity: "do 6 osób" },
];

export default function Cabins({ showHeader = true }: { showHeader?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="domki" className="relative py-24 md:py-32 bg-gradient-to-br from-[#f7f4ed] via-white to-[#ebe7dc] overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-ranczo-green/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={showHeader ? "text-center mb-16 md:mb-20" : "text-center mb-12 md:mb-16"}
        >
          {showHeader && (
            <>
              <span className="text-sm tracking-[0.3em] uppercase text-ranczo-terracotta font-medium">
                Noclegi
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ranczo-charcoal">
                Nasze domki
              </h2>
            </>
          )}
          <div className={showHeader ? "mt-4 mx-auto w-16 h-px bg-ranczo-terracotta" : "mx-auto w-16 h-px bg-ranczo-terracotta"} />
          <p className="mt-6 max-w-2xl mx-auto text-ranczo-charcoal/65 leading-relaxed">
            Cztery kameralne domki z kominkiem i własnym charakterem — dla par,
            rodzin oraz grup do 6 osób. Wszystko w otoczeniu beskidzkiej natury.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-7">
          {featuredCabins.map((cabin, i) => (
            <motion.div
              key={cabin.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className="group overflow-hidden rounded-[1.75rem] bg-white shadow-[0_22px_70px_rgba(24,52,37,0.10)] ring-1 ring-ranczo-charcoal/7"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cabin.image}
                  alt={cabin.name}
                  fill
                  className="object-cover group-hover:scale-[1.035] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ranczo-charcoal/55 via-transparent to-transparent" />
                <div className="absolute left-5 bottom-5 rounded-full bg-ranczo-charcoal/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  {cabin.features[0].label}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-ranczo-charcoal">
                  {cabin.name}
                </h3>
                <p className="mt-3 text-ranczo-charcoal/65 leading-relaxed">
                  {cabin.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cabin.features.slice(1).map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-ranczo-cream text-ranczo-charcoal/75"
                    >
                      <f.icon className="w-4 h-4 text-ranczo-terracotta flex-shrink-0" />
                      <span className="text-xs font-medium">
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/domki"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ranczo-green hover:text-ranczo-terracotta transition-colors"
                >
                  Zobacz zdjęcia i szczegóły
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 rounded-2xl border border-ranczo-charcoal/10 bg-ranczo-cream/75 p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-ranczo-terracotta">
                W ofercie również
              </p>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-7">
                {otherCabins.map((cabin) => (
                  <div key={cabin.name} className="flex items-center gap-2">
                    <span className="font-serif text-lg font-semibold text-ranczo-charcoal">
                      {cabin.name}
                    </span>
                    <span className="text-sm text-ranczo-charcoal/55">
                      {cabin.capacity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/rezerwacja"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-ranczo-green px-6 py-3 text-sm font-semibold text-white hover:bg-ranczo-charcoal transition-colors"
            >
              Sprawdź dostępność domków
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
