"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, House, Star } from "lucide-react";

const heroVideoSrc = "/hero_video/video.mp4";
const heroPosterSrc = "/hero_video/video-poster.jpg";
const heroPosterClass =
  "absolute inset-0 h-full w-full scale-[1.04] object-cover object-[62%_center] brightness-[0.82] contrast-105 saturate-[0.88]";
const heroVideoClass =
  "absolute inset-0 h-full w-full scale-[1.04] object-cover object-[62%_center] brightness-[0.82] contrast-105 saturate-[0.88] transform-gpu md:scale-[1.18]";
const heroHighlights = [
  { icon: House, value: "4 domki", label: "kameralny pobyt" },
  { icon: Star, value: "5/5", label: "opinie Google" },
  { icon: Flame, value: "Balia · basen · konie", label: "atrakcje na miejscu" },
];

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (reducedMotion) return;

    const onScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <section id="hero" className="relative min-h-[760px] h-[100svh] overflow-hidden">
      {/* Wideo tła z parallaxą; przy prefers-reduced-motion pokazujemy statyczny poster */}
      <div ref={parallaxRef} className="absolute inset-0 -top-20 -bottom-20">
        {reducedMotion ? (
          <Image
            src={heroPosterSrc}
            alt="Ranczo 44 — Beskid Niski"
            fill
            className={heroPosterClass}
            quality={90}
            sizes="100vw"
            loading="eager"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroPosterSrc}
            className={heroVideoClass}
            aria-label="Ranczo 44 — Beskid Niski"
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ranczo-charcoal/45 via-ranczo-charcoal/10 to-ranczo-charcoal/75 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ranczo-charcoal/88 via-ranczo-charcoal/45 to-ranczo-charcoal/10 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 pt-28 pb-28 flex items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex items-center gap-4 mb-5"
          >
            <span className="w-12 h-px bg-ranczo-terracotta" />
            <p className="text-xs sm:text-sm tracking-[0.26em] uppercase text-ranczo-sand font-semibold">
              Ranczo 44 · Uście Gorlickie
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif text-[2.8rem] sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05] text-balance drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            Domki i wyjątkowe chwile{" "}
            <span className="italic font-normal text-ranczo-sand">
              w sercu Beskidu
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/88 leading-relaxed drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)]"
          >
            Odpocznij w drewnianym domku z kominkiem albo zorganizuj
            kameralny ślub i rodzinne spotkanie. Konie, balia, basen i góry
            tworzą tu naturalną oprawę każdej chwili.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/rezerwacja"
              className="inline-flex min-h-12 items-center justify-center px-7 py-3.5 bg-ranczo-terracotta text-white font-semibold rounded-full hover:bg-[#b6562f] transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
            >
              Sprawdź dostępne terminy
            </Link>
            <Link
              href="/wydarzenia"
              className="inline-flex min-h-12 items-center justify-center px-7 py-3.5 border border-white/35 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/55 transition-all duration-300 backdrop-blur-sm"
            >
              Śluby i wydarzenia
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.7 }}
        className="absolute z-20 bottom-0 inset-x-0 border-t border-white/15 bg-ranczo-charcoal/45 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 gap-3 sm:gap-8">
          {heroHighlights.map((item) => (
            <div key={item.value} className="flex items-center justify-center gap-2 sm:gap-3 text-white">
              <item.icon className="hidden sm:block w-5 h-5 text-ranczo-sand shrink-0" />
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm font-semibold">{item.value}</div>
                <div className="hidden sm:block text-xs text-white/55 mt-0.5">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
