"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PartyPopper,
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react";

const eventTypeOptions = [
  { value: "impreza", label: "Impreza okolicznościowa" },
  { value: "slub", label: "Ślub / wesele plenerowe" },
  { value: "warsztaty", label: "Aktywności z końmi / warsztaty" },
  { value: "inne", label: "Inne" },
];

export default function EventInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [form, setForm] = useState({
    eventType: "impreza",
    preferredDate: "",
    guests: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wydarzenie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Nieznany błąd");
      }
      setIsSent(true);
    } catch (err) {
      alert(`Wystąpił błąd: ${err instanceof Error ? err.message : "Spróbuj ponownie."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-ranczo-terracotta/60 focus:border-ranczo-terracotta/50 transition-all duration-300 text-sm";

  const labelClass = "text-xs font-semibold tracking-widest uppercase text-ranczo-sand/70 mb-2 block";

  return (
    <section
      id="zapytanie-event"
      className="relative w-full py-24 bg-ranczo-charcoal overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-ranczo-terracotta/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-ranczo-forest/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="w-12 h-0.5 bg-ranczo-terracotta mx-auto mb-6" />
          <p className="text-xs tracking-[0.3em] uppercase text-ranczo-terracotta font-semibold mb-3">
            Ranczo 44 · Wydarzenia
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Zapytaj o wydarzenie
          </h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto text-sm leading-relaxed">
            Opisz swój pomysł, a przygotujemy dla Ciebie indywidualną propozycję i wycenę.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-12"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>
                      <PartyPopper size={12} className="inline mr-2" />
                      Rodzaj wydarzenia
                    </label>
                    <select
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      {eventTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-ranczo-charcoal">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Calendar size={12} className="inline mr-2" />
                      Orientacyjny termin
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Users size={12} className="inline mr-2" />
                      Liczba gości
                    </label>
                    <input
                      type="number"
                      name="guests"
                      min={1}
                      value={form.guests}
                      onChange={handleChange}
                      placeholder="np. 30"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <User size={12} className="inline mr-2" />
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jan Kowalski"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Mail size={12} className="inline mr-2" />
                      Adres e-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jan@example.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      <Phone size={12} className="inline mr-2" />
                      Numer telefonu
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+48 123 456 789"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className={labelClass}>Opowiedz nam o wydarzeniu</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Charakter wydarzenia, oczekiwania, dodatkowe pytania..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="mt-10 flex justify-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="flex items-center gap-3 px-8 py-4 bg-ranczo-terracotta text-white font-semibold rounded-2xl hover:bg-ranczo-terracotta/85 disabled:opacity-70 transition-all duration-300 shadow-lg shadow-ranczo-terracotta/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      <>
                        Wyślij zapytanie
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-ranczo-terracotta/15 flex items-center justify-center mb-8"
                >
                  <CheckCircle size={40} className="text-ranczo-terracotta" />
                </motion.div>
                <h3 className="font-serif text-3xl font-bold text-white mb-4">
                  Zapytanie wysłane!
                </h3>
                <p className="text-white/50 max-w-sm leading-relaxed">
                  Dziękujemy! Odezwiemy się do Ciebie z propozycją w ciągu 48 godzin.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
