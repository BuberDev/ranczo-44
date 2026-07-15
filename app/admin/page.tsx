import { redirect } from "next/navigation";
import { getPendingInquiries, getAllCabinBookings } from "@/lib/bookings";
import { CABINS } from "@/lib/cabins";
import { isAdminAuthenticated } from "@/lib/admin-session";
import {
  confirmInquiry,
  rejectInquiry,
  addManualBlockAction,
  removeBookingAction,
} from "@/app/actions/admin-bookings";
import { logoutAdmin } from "@/app/actions/admin-auth";

// Panel pokazuje na żywo stan rezerwacji i jest chroniony sesją — nie może być cache'owany/prerenderowany statycznie.
export const dynamic = "force-dynamic";

const SOURCE_LABEL: Record<string, string> = {
  direct: "bezpośrednio",
  slowhop: "Slowhop",
  manual: "blokada ręczna",
};

export default async function AdminPage() {
  // Sprawdzenie sesji powtórzone tu celowo (poza proxy.ts) — dane gości (imię, e-mail,
  // telefon) nie powinny zależeć wyłącznie od poprawnej konfiguracji jednej warstwy.
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [inquiries, allBookings] = await Promise.all([
    getPendingInquiries(),
    getAllCabinBookings(),
  ]);

  const pending = inquiries.filter((i) => i.status === "pending");

  return (
    <main className="min-h-screen bg-ranczo-charcoal px-6 py-16 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif text-3xl font-bold">Panel rezerwacji — Ranczo 44</h1>
          <form action={logoutAdmin}>
            <button type="submit" className="text-sm text-white/60 hover:text-white underline">
              Wyloguj
            </button>
          </form>
        </div>

        <section className="mb-14">
          <h2 className="text-lg font-semibold mb-4 text-ranczo-terracotta">
            Oczekujące zapytania ({pending.length})
          </h2>

          {pending.length === 0 && <p className="text-white/50 text-sm">Brak oczekujących zapytań.</p>}

          <div className="space-y-4">
            {pending.map((inquiry) => (
              <div key={inquiry.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70 mb-3">
                  <span className="font-semibold text-white">{inquiry.name}</span>
                  <span>{inquiry.email}</span>
                  {inquiry.phone && <span>{inquiry.phone}</span>}
                  <span>📅 {inquiry.checkin} → {inquiry.checkout}</span>
                  <span>👥 {inquiry.guests}</span>
                </div>
                {inquiry.message && (
                  <p className="text-sm text-white/50 italic mb-4">{inquiry.message}</p>
                )}

                <form action={confirmInquiry} className="flex flex-wrap items-center gap-3 mb-2">
                  <input type="hidden" name="inquiryId" value={inquiry.id} />
                  <input type="hidden" name="checkin" value={inquiry.checkin} />
                  <input type="hidden" name="checkout" value={inquiry.checkout} />
                  <select
                    name="cabinId"
                    defaultValue={inquiry.cabin || CABINS[0].id}
                    className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-sm"
                  >
                    {CABINS.map((c) => (
                      <option key={c.id} value={c.id} className="bg-ranczo-charcoal">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-ranczo-terracotta text-white text-sm font-semibold rounded-lg hover:bg-ranczo-terracotta/85 transition-colors"
                  >
                    Potwierdź i zablokuj termin
                  </button>
                </form>
                <form action={rejectInquiry}>
                  <input type="hidden" name="inquiryId" value={inquiry.id} />
                  <button type="submit" className="text-xs text-white/40 hover:text-white/70 underline">
                    Odrzuć zapytanie
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 text-ranczo-terracotta">Terminy per domek</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {CABINS.map((cabin) => (
              <div key={cabin.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between mb-3 gap-3">
                  <h3 className="font-semibold">{cabin.name}</h3>
                  <a
                    href={`/api/ical/${cabin.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-ranczo-terracotta underline shrink-0"
                  >
                    link .ics do Slowhopa
                  </a>
                </div>

                <ul className="space-y-2 mb-4">
                  {(allBookings[cabin.id] ?? []).map((b) => (
                    <li key={b.id} className="flex items-center justify-between gap-3 text-sm text-white/70">
                      <span>
                        {b.start} → {b.end}{" "}
                        <span className="text-white/40">({SOURCE_LABEL[b.source] ?? b.source})</span>
                      </span>
                      {b.source !== "slowhop" && (
                        <form action={removeBookingAction}>
                          <input type="hidden" name="cabinId" value={cabin.id} />
                          <input type="hidden" name="bookingId" value={b.id} />
                          <button type="submit" className="text-white/40 hover:text-red-400 text-xs shrink-0">
                            usuń
                          </button>
                        </form>
                      )}
                    </li>
                  ))}
                  {(allBookings[cabin.id] ?? []).length === 0 && (
                    <li className="text-sm text-white/40">Brak zajętych terminów.</li>
                  )}
                </ul>

                <form action={addManualBlockAction} className="flex flex-wrap items-end gap-2">
                  <input type="hidden" name="cabinId" value={cabin.id} />
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Od</label>
                    <input
                      type="date"
                      name="start"
                      required
                      className="bg-white/10 border border-white/15 rounded-lg px-2 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1">Do</label>
                    <input
                      type="date"
                      name="end"
                      required
                      className="bg-white/10 border border-white/15 rounded-lg px-2 py-1.5 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 border border-white/20 rounded-lg text-xs hover:bg-white/10 transition-colors"
                  >
                    Zablokuj ręcznie
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
