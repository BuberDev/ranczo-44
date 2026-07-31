"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Contact({ showHeader = true }: { showHeader?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="kontakt" className="relative py-24 md:py-32 bg-gradient-to-br from-[#102d20] via-ranczo-charcoal to-[#254d36] overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ranczo-terracotta/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,_rgba(132,163,107,0.16),_transparent_34%),radial-gradient(circle_at_86%_12%,_rgba(201,101,57,0.12),_transparent_30%)] pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={showHeader ? "text-center mb-16" : "text-center mb-10"}
        >
          {showHeader && (
            <>
              <span className="text-sm tracking-[0.3em] uppercase text-ranczo-terracotta font-medium">
                Skontaktuj się
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white">
                Zaplanuj pobyt na Ranczu
              </h2>
            </>
          )}
          <div className={showHeader ? "mt-4 mx-auto w-16 h-px bg-ranczo-terracotta" : "mx-auto w-16 h-px bg-ranczo-terracotta"} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ranczo-terracotta/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-ranczo-terracotta" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    Adres
                  </h3>
                  <p className="text-white/60 mt-1 leading-relaxed">
                    Uście Gorlickie 44
                    <br />
                    38-315 Uście Gorlickie
                    <br />
                    Beskid Niski, Polska
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ranczo-terracotta/15 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-ranczo-terracotta" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    Telefon
                  </h3>
                  <a
                    href="tel:+48512034668"
                    className="text-white/70 hover:text-ranczo-sand transition-colors mt-1 block"
                  >
                    +48 512 034 668
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ranczo-terracotta/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-ranczo-terracotta" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    Email
                  </h3>
                  <a
                    href="mailto:kontakt@ranczo44.pl"
                  className="text-white/70 hover:text-ranczo-sand transition-colors mt-1 block"
                  >
                    kontakt@ranczo44.pl
                  </a>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="pt-4">
              <h3 className="font-serif text-lg font-semibold text-white mb-4">
                Znajdź nas
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/ranczo44/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ranczo 44 na Instagramie"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-ranczo-terracotta hover:border-ranczo-terracotta/30 transition-all duration-300"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/Ranczo44/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ranczo 44 na Facebooku"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-ranczo-terracotta hover:border-ranczo-terracotta/30 transition-all duration-300"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Booking CTA */}
            <div id="rezerwacja" className="pt-4">
              <h3 className="font-serif text-lg font-semibold text-white mb-3">
                Rezerwacja
              </h3>
              <p className="text-white/65 text-sm mb-5 leading-relaxed max-w-md">
                Wybierz domek i termin w formularzu. Jeśli planujesz wydarzenie,
                odpowiemy z uwzględnieniem okazji i liczby gości.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href="/rezerwacja"
                  className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 bg-ranczo-terracotta text-white text-sm font-semibold rounded-full hover:bg-[#b6562f] transition-all duration-300"
                >
                  Zapytaj o pobyt
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/wydarzenia#zapytanie-event"
                  className="inline-flex min-h-12 items-center justify-center px-6 py-3 border border-white/25 text-white text-sm font-medium rounded-full hover:bg-white/8 hover:border-white/40 transition-all duration-300"
                >
                  Zapytaj o wydarzenie
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-xl min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps?q=U%C5%9Bcie+Gorlickie+44&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokalizacja Ranczo 44"
              className="absolute inset-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
