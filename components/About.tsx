"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Heart, Trees, Dog } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="o-nas" className="relative py-24 md:py-32 bg-ranczo-cream overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ranczo-green/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-ranczo-terracotta font-medium">
            Nasza historia
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ranczo-charcoal">
            Witaj na Ranczo
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-ranczo-terracotta" />
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/photos_ranczo_44/_MG_0339.jpeg"
                alt="Drewniany domek na Ranczo 44 z zielonymi okiennicami"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating accent image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 w-40 h-40 md:w-52 md:h-52 rounded-xl overflow-hidden shadow-xl border-4 border-ranczo-cream"
            >
              <Image
                src="/photos_ranczo_44/domek.jpg"
                alt="Przytulny fotel w domku Ranczo 44"
                fill
                className="object-cover"
                sizes="200px"
              />
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl text-ranczo-charcoal/80 leading-relaxed">
              <span className="font-serif text-2xl text-ranczo-green font-semibold">
                Ranczo 44
              </span>{" "}
              to kameralny ośrodek wypoczynkowy w sercu Beskidu Niskiego, 
              prowadzony z pasją przez Anię, Rafała i młodego Adasia.
            </p>
            <p className="text-base text-ranczo-charcoal/70 leading-relaxed">
              To miejsce, gdzie kowbojska fantazja spotyka dziką naturę. Gdzie
              poranne mgły otulają góry, a wieczorne ognisko budzi wspomnienia 
              z dzieciństwa. Tu nie ma pośpiechu — jest za to stary Chevrolet 
              na podjeździe, konie na pastwisku i zapach drewna z kominka.
            </p>
            <p className="text-base text-ranczo-charcoal/70 leading-relaxed">
              Zamieszkaj w jednym z naszych drewnianych domków z kominkiem, 
              zanurz się w podgrzewanym basenie albo cedrowej bani, a wieczorem
              spróbuj domowych wyrobów na tarasie z widokiem na beskidzkie szczyty.
            </p>

            {/* Feature badges */}
            <div className="pt-6 grid grid-cols-3 gap-4">
              {[
                { icon: Heart, label: "Rodzinna\natmosfera" },
                { icon: Trees, label: "Dzika\nnatura" },
                { icon: Dog, label: "Pet\nfriendly" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="flex flex-col items-center text-center p-4 rounded-xl bg-ranczo-green/5 hover:bg-ranczo-green/10 transition-colors duration-300"
                >
                  <item.icon className="w-6 h-6 text-ranczo-terracotta mb-2" />
                  <span className="text-xs font-medium text-ranczo-charcoal/70 whitespace-pre-line leading-tight">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
