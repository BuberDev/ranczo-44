"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ranczo-charcoal border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-serif font-bold text-white">
              Ranczo
            </span>
            <span className="text-xl font-serif font-light text-ranczo-terracotta">
              44
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "O nas", href: "#o-nas" },
              { label: "Atrakcje", href: "#atrakcje" },
              { label: "Domki", href: "#domki" },
              { label: "Galeria", href: "#galeria" },
              { label: "Kontakt", href: "#kontakt" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-xs text-white/30">
            <span>© {currentYear} Ranczo 44</span>
            <span className="mx-1">·</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-ranczo-terracotta fill-ranczo-terracotta" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
