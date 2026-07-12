"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface SubpageHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  className?: string;
}

export default function SubpageHero({ title, subtitle, imageSrc, className }: SubpageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full h-[65vh] min-h-[520px] flex flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          quality={90}
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ranczo-charcoal/85 via-ranczo-charcoal/40 to-ranczo-cream z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ranczo-charcoal/30 to-transparent z-10" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex flex-col items-center justify-center px-6 text-center mt-16"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-16 h-0.5 bg-ranczo-terracotta mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-ranczo-sand/90 font-medium mb-4"
        >
          {subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg"
        >
          {title}
        </motion.h1>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-ranczo-sand/50"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
