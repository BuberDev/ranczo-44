"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-stone-100 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ranczo-cream/50 skew-x-12 translate-x-1/4" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-ranczo-terracotta font-medium block mb-4">
                Opinie Gości
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ranczo-charcoal leading-tight">
                Nasza wizytówka to <span className="italic text-ranczo-terracotta font-light">Wasze</span> słowa
              </h2>
            </div>
            
            <p className="text-ranczo-charcoal/70 text-lg leading-relaxed max-w-lg">
              Największą nagrodą dla nas jest zadowolenie gości. Staramy się, aby Ranczo 44 było miejscem, do którego chce się wracać. Dziękujemy za zaufanie i każdą wspaniałą opinię, którą zostawiacie po swoim pobycie.
            </p>

            {/* Rating summary */}
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center p-6 bg-white rounded-2xl shadow-xl shadow-stone-200/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <span className="text-2xl font-bold text-ranczo-charcoal">5.0</span>
                </div>
                <div>
                  <div className="flex text-amber-400 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-ranczo-charcoal/60">
                    Na podstawie Google
                  </span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-stone-200" />
              <div className="text-sm text-ranczo-charcoal/80 font-medium">
                Wyróżnieni przez naszych wspaniałych gości
              </div>
            </div>
          </motion.div>

          {/* Right image display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: -2 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-md mx-auto"
          >
            {/* Soft glow behind the image */}
            <div className="absolute inset-0 bg-ranczo-terracotta/20 blur-[60px] rounded-full" />
            
            {/* The image itself */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white group">
              <Image
                src="/opinie_google.png"
                alt="Opinie naszych gości w Google"
                width={699}
                height={1114}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay gradient for a premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Decorative element */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-ranczo-terracotta/10 flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="text-sm font-bold text-ranczo-charcoal">Dziękujemy!</div>
                <div className="text-xs text-ranczo-charcoal/60">Ania, Rafał i Adaś</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
