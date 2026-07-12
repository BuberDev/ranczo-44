"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Home, ArrowRight, CheckCircle, Loader2, Mail, Phone, User } from "lucide-react";

const cabins = [
  { id: "1", name: "Domek 1 – Mustang", capacity: "do 4 osób" },
  { id: "2", name: "Domek 2 – Apache", capacity: "do 4 osób" },
  { id: "3", name: "Domek 3 – Sioux", capacity: "do 6 osób" },
  { id: "4", name: "Domek 4 – Comanche", capacity: "do 6 osób" },
];

type FormStep = "dates" | "details" | "success";

export default function BookingForm() {
  const [step, setStep] = useState<FormStep>("dates");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    checkin: "",
    checkout: "",
    guests: "2",
    cabin: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNextStep = () => {
    if (step === "dates") setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/rezerwacja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Nieznany błąd");
      }
      setStep("success");
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
      id="rezerwacja"
      className="relative w-full py-24 bg-ranczo-charcoal overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-ranczo-terracotta/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-ranczo-forest/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="w-12 h-0.5 bg-ranczo-terracotta mx-auto mb-6" />
          <p className="text-xs tracking-[0.3em] uppercase text-ranczo-terracotta font-semibold mb-3">
            Ranczo 44 · Beskid Niski
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Zarezerwuj pobyt
          </h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto text-sm leading-relaxed">
            Wyślij zapytanie, a odezwiemy się w ciągu 24 godzin, by potwierdzić dostępność i szczegóły.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Step indicators */}
          {step !== "success" && (
            <div className="flex items-center justify-center gap-3 pt-8 pb-6 px-8 border-b border-white/10">
              {[
                { key: "dates", label: "Termin" },
                { key: "details", label: "Dane kontaktowe" },
              ].map((s, i) => (
                <div key={s.key} className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 ${step === s.key ? "opacity-100" : (i === 0 && step === "details") ? "opacity-60" : "opacity-30"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${step === s.key ? "bg-ranczo-terracotta border-ranczo-terracotta text-white" : (i === 0 && step === "details") ? "bg-ranczo-terracotta/30 border-ranczo-terracotta/50 text-ranczo-terracotta" : "border-white/20 text-white/40"}`}>
                      {i + 1}
                    </div>
                    <span className="text-xs font-medium text-white/70 hidden sm:block">{s.label}</span>
                  </div>
                  {i === 0 && <div className="w-12 h-px bg-white/15" />}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1 – Dates & Cabin */}
            {step === "dates" && (
              <motion.form
                key="dates"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}
                className="p-8 md:p-12"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Check-in */}
                  <div>
                    <label className={labelClass}>
                      <Calendar size={12} className="inline mr-2" />
                      Data przyjazdu
                    </label>
                    <input
                      type="date"
                      name="checkin"
                      value={form.checkin}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className={inputClass}
                    />
                  </div>

                  {/* Check-out */}
                  <div>
                    <label className={labelClass}>
                      <Calendar size={12} className="inline mr-2" />
                      Data wyjazdu
                    </label>
                    <input
                      type="date"
                      name="checkout"
                      value={form.checkout}
                      onChange={handleChange}
                      required
                      min={form.checkin || new Date().toISOString().split("T")[0]}
                      className={inputClass}
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className={labelClass}>
                      <Users size={12} className="inline mr-2" />
                      Liczba gości
                    </label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n} className="bg-ranczo-charcoal">
                          {n} {n === 1 ? "osoba" : n < 5 ? "osoby" : "osób"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Cabin */}
                  <div>
                    <label className={labelClass}>
                      <Home size={12} className="inline mr-2" />
                      Domek (opcjonalnie)
                    </label>
                    <select
                      name="cabin"
                      value={form.cabin}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="" className="bg-ranczo-charcoal">Dowolny dostępny domek</option>
                      {cabins.map(c => (
                        <option key={c.id} value={c.id} className="bg-ranczo-charcoal">
                          {c.name} ({c.capacity})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10 flex justify-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-8 py-4 bg-ranczo-terracotta text-white font-semibold rounded-2xl hover:bg-ranczo-terracotta/85 transition-all duration-300 shadow-lg shadow-ranczo-terracotta/20"
                  >
                    Dalej – dane kontaktowe
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.form>
            )}

            {/* STEP 2 – Contact Details */}
            {step === "details" && (
              <motion.form
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="p-8 md:p-12"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
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
                      placeholder="Jan Kowalski"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
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
                      placeholder="jan@example.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
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

                {/* Message */}
                <div className="mt-6">
                  <label className={labelClass}>Wiadomość (opcjonalnie)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Dodatkowe pytania, specjalne życzenia, informacje o grupie..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Summary card */}
                <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/60 flex flex-wrap gap-4">
                  <span>📅 {form.checkin} → {form.checkout}</span>
                  <span>👥 {form.guests} {Number(form.guests) === 1 ? "osoba" : Number(form.guests) < 5 ? "osoby" : "osób"}</span>
                  {form.cabin && <span>🏠 {cabins.find(c => c.id === form.cabin)?.name}</span>}
                </div>

                {/* Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("dates")}
                    className="px-6 py-3 border border-white/15 text-white/60 rounded-2xl hover:bg-white/5 transition-all duration-300 text-sm"
                  >
                    ← Wróć
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-ranczo-terracotta text-white font-semibold rounded-2xl hover:bg-ranczo-terracotta/85 disabled:opacity-70 transition-all duration-300 shadow-lg shadow-ranczo-terracotta/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      <>
                        Wyślij zapytanie rezerwacyjne
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}

            {/* SUCCESS */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-12 flex flex-col items-center justify-center text-center"
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
                <p className="text-white/50 max-w-sm leading-relaxed mb-8">
                  Dziękujemy, {form.name}! Skontaktujemy się z Tobą na adres <span className="text-ranczo-sand">{form.email}</span> w ciągu 24 godzin.
                </p>
                <button
                  onClick={() => { setStep("dates"); setForm({ checkin: "", checkout: "", guests: "2", cabin: "", name: "", email: "", phone: "", message: "" }); }}
                  className="px-6 py-3 border border-white/15 text-white/60 rounded-2xl hover:bg-white/5 transition-all duration-300 text-sm"
                >
                  Nowe zapytanie
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
