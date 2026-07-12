"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "O nas", href: "/o-nas" },
  { label: "Atrakcje", href: "/atrakcje" },
  { label: "Domki", href: "/domki" },
  { label: "Galeria", href: "/galeria" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  
  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Check initial scroll on mount
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine if navbar should be solid based on scroll or if it's a subpage
  const isSolid = scrolled || !isHomePage;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isSolid
            ? "bg-ranczo-charcoal/90 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/logo.jpg" 
              alt="Ranczo 44 Logo" 
              width={160} 
              height={60} 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide hover:text-white transition-colors duration-300 group ${
                    pathname === link.href ? "text-white" : "text-white/80"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-ranczo-terracotta transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/kontakt"
                className="ml-4 px-6 py-2.5 bg-ranczo-terracotta text-white text-sm font-semibold rounded-full hover:bg-ranczo-terracotta/80 transition-all duration-300 hover:shadow-lg hover:shadow-ranczo-terracotta/25"
              >
                Zarezerwuj
              </Link>
            </li>
          </ul>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ranczo-charcoal/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-2xl font-serif transition-colors ${
                    pathname === link.href ? "text-ranczo-terracotta" : "text-white/90 hover:text-ranczo-terracotta"
                  }`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
              <Link
                href="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3 bg-ranczo-terracotta text-white font-semibold rounded-full text-lg block text-center"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.08 }}
                >
                  Zarezerwuj
                </motion.span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
