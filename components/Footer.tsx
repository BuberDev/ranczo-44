"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { label: "O nas", href: "/o-nas" },
  { label: "Atrakcje", href: "/atrakcje" },
  { label: "Domki", href: "/domki" },
  { label: "Galeria", href: "/galeria" },
];

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

export default function Footer() {
  return (
    <footer className="bg-ranczo-charcoal pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <span className="text-2xl font-serif font-bold tracking-tight text-white group-hover:text-ranczo-terracotta transition-colors">
                Ranczo
              </span>
              <span className="text-2xl font-serif font-light text-ranczo-terracotta">
                44
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Wyjątkowe miejsce w Beskidzie Niskim. Znajdź spokój, dziką naturę i prawdziwy odpoczynek z dala od zgiełku miasta.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/ranczo44/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-ranczo-terracotta hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/Ranczo44/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-ranczo-terracotta hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6">Nawigacja</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-ranczo-terracotta transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-serif font-semibold text-lg mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-white/60 text-sm">
                <MapPin className="w-5 h-5 text-ranczo-terracotta shrink-0 mt-0.5" />
                <span>
                  Uście Gorlickie 44<br />
                  38-316 Uście Gorlickie<br />
                  Beskid Niski, Polska
                </span>
              </li>
              <li className="flex items-center gap-4 text-white/60 text-sm">
                <Phone className="w-5 h-5 text-ranczo-terracotta shrink-0" />
                <a href="tel:+48123456789" className="hover:text-white transition-colors">
                  +48 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-4 text-white/60 text-sm">
                <Mail className="w-5 h-5 text-ranczo-terracotta shrink-0" />
                <a href="mailto:kontakt@ranczo44.pl" className="hover:text-white transition-colors">
                  kontakt@ranczo44.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Ranczo 44. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Polityka prywatności</a>
            <a href="#" className="hover:text-white transition-colors">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
