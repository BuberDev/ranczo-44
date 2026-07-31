"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "O nas", href: "/o-nas" },
  { label: "Atrakcje", href: "/atrakcje" },
  { label: "Wydarzenia", href: "/wydarzenia" },
  { label: "Domki", href: "/domki" },
  { label: "Galeria", href: "/galeria" },
  { label: "Rezerwacja", href: "/rezerwacja" },
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
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-gradient-to-br from-[#0d321f] via-ranczo-charcoal to-[#0b4b2b] pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_1.1fr] gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group" aria-label="Ranczo 44 — strona główna">
              <Image 
                src="/logo.jpg" 
                alt=""
                width={160} 
                height={60} 
                className="h-12 w-12 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-serif text-xl font-semibold text-white">
                Ranczo 44
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Domki, śluby i kameralne wydarzenia w Beskidzie Niskim. Prawdziwa
              natura, konie i przestrzeń na ważne chwile.
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
          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-white/60 text-sm">
                <MapPin className="w-5 h-5 text-ranczo-terracotta shrink-0 mt-0.5" />
                <span>
                  Uście Gorlickie 44<br />
                  38-315 Uście Gorlickie<br />
                  Beskid Niski, Polska
                </span>
              </li>
              <li className="flex items-center gap-4 text-white/60 text-sm">
                <Phone className="w-5 h-5 text-ranczo-terracotta shrink-0" />
                <a href="tel:+48512034668" className="hover:text-white transition-colors">
                  +48 512 034 668
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
          <p className="text-white/40 text-xs">
            Uście Gorlickie · Beskid Niski
          </p>
        </div>
      </div>
    </footer>
  );
}
