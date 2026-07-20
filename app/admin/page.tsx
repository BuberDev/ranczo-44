import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  DoorOpen,
  ExternalLink,
  FileClock,
  Home,
  Link2,
  LogOut,
  Minus,
  PanelLeft,
  Plus,
  ShieldCheck,
  Trash2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  getPendingInquiries,
  getAllCabinBookings,
  rangesOverlap,
  type BookingRange,
} from "@/lib/bookings";
import { CABINS } from "@/lib/cabins";
import { isAdminAuthenticated } from "@/lib/admin-session";
import {
  confirmInquiry,
  rejectInquiry,
  addManualBlockAction,
  removeBookingAction,
} from "@/app/actions/admin-bookings";
import { logoutAdmin } from "@/app/actions/admin-auth";

// Panel pokazuje na żywo stan rezerwacji i jest chroniony sesją.
export const dynamic = "force-dynamic";

const SOURCE_LABEL: Record<string, string> = {
  direct: "Strona",
  slowhop: "SlowHop",
  alohacamp: "AlohaCamp",
  manual: "Blokada",
};

const SOURCE_STYLE: Record<string, string> = {
  direct: "border-emerald-200 bg-emerald-50 text-emerald-700",
  slowhop: "border-sky-200 bg-sky-50 text-sky-700",
  alohacamp: "border-lime-200 bg-lime-50 text-lime-700",
  manual: "border-stone-200 bg-stone-100 text-stone-700",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

function daysBetween(start: string, end: string) {
  const startDate = new Date(`${start}T12:00:00`).getTime();
  const endDate = new Date(`${end}T12:00:00`).getTime();
  return Math.max(1, Math.round((endDate - startDate) / 86_400_000));
}

function addDays(date: string, days: number) {
  const nextDate = new Date(`${date}T12:00:00`);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate.toISOString().slice(0, 10);
}

function SourceBadge({ source }: { source: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        SOURCE_STYLE[source] ?? "border-stone-200 bg-white text-stone-600"
      }`}
    >
      {SOURCE_LABEL[source] ?? source}
    </span>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-stone-950">{value}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ranczo-charcoal text-white">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-sm text-stone-500">{detail}</p>
    </div>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-stone-400 shadow-sm">
        <Minus className="h-5 w-5" />
      </div>
      <p className="font-semibold text-stone-800">{title}</p>
      <p className="mt-1 text-sm text-stone-500">{text}</p>
    </div>
  );
}

function SidebarLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

function BookingRow({ cabinId, booking }: { cabinId: string; booking: BookingRange }) {
  const removable = booking.source === "direct" || booking.source === "manual";

  return (
    <li className="grid gap-3 border-t border-stone-100 py-3 first:border-t-0 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-stone-900">
            {formatShortDate(booking.start)} - {formatShortDate(booking.end)}
          </p>
          <SourceBadge source={booking.source} />
        </div>
        <p className="mt-1 text-sm text-stone-500">
          {daysBetween(booking.start, booking.end)} nocy
          {booking.note ? `, ${booking.note}` : ""}
        </p>
      </div>
      {removable && (
        <form action={removeBookingAction} className="sm:justify-self-end">
          <input type="hidden" name="cabinId" value={cabinId} />
          <input type="hidden" name="bookingId" value={booking.id} />
          <button
            type="submit"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-red-200 px-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Usuń
          </button>
        </form>
      )}
    </li>
  );
}

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [inquiries, allBookings] = await Promise.all([
    getPendingInquiries(),
    getAllCabinBookings(),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = addDays(today, 1);
  const pending = inquiries.filter((inquiry) => inquiry.status === "pending");
  const allBookingEntries = CABINS.flatMap((cabin) =>
    (allBookings[cabin.id] ?? []).map((booking) => ({ ...booking, cabin }))
  );
  const upcomingBookings = allBookingEntries
    .filter((booking) => booking.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start));
  const occupiedToday = allBookingEntries.filter((booking) =>
    rangesOverlap(booking.start, booking.end, today, tomorrow)
  ).length;
  const externalBookings = upcomingBookings.filter((booking) =>
    booking.source === "slowhop" || booking.source === "alohacamp"
  );
  const nextBooking = upcomingBookings[0];
  const todayLabel = new Intl.DateTimeFormat("pl-PL", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date());

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-stone-900">
      <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-white/10 bg-ranczo-charcoal text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
          <div className="border-b border-white/10 p-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Ranczo 44"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-white">Ranczo 44</p>
                <p className="text-xs text-white/50">Panel gospodarza</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {[
              { href: "#overview", label: "Przegląd", icon: Home },
              { href: "#inquiries", label: "Zapytania", icon: Users },
              { href: "#cabins", label: "Domki", icon: DoorOpen },
              { href: "#sync", label: "Synchronizacja", icon: Link2 },
            ].map((item) => (
              <SidebarLink key={item.href} {...item} />
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Wyloguj
              </button>
            </form>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-stone-200 bg-[#f5f2eb]/90 px-5 py-4 backdrop-blur lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-stone-700 shadow-sm lg:hidden">
                  <PanelLeft className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-stone-500">Dzisiaj: {todayLabel}</p>
                  <h1 className="text-2xl font-bold tracking-tight text-stone-950 md:text-3xl">
                    Rezerwacje i dostępność
                  </h1>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 shadow-sm transition-colors hover:bg-stone-50"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Strona
                </Link>
                <form action={logoutAdmin}>
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-ranczo-charcoal px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ranczo-green"
                  >
                    <LogOut className="h-4 w-4" />
                    Wyloguj
                  </button>
                </form>
              </div>
            </div>
          </header>

          <div className="space-y-8 px-5 py-6 lg:px-8 lg:py-8">
            <section id="overview" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Zapytania"
                value={pending.length}
                detail={pending.length === 1 ? "1 temat czeka na decyzję" : "Tematy wymagające decyzji"}
                icon={FileClock}
              />
              <StatCard
                label="Nadchodzące terminy"
                value={upcomingBookings.length}
                detail="Wszystkie aktywne wpisy od dzisiaj"
                icon={CalendarDays}
              />
              <StatCard
                label="Zewnętrzne"
                value={externalBookings.length}
                detail="Importy ze SlowHop i AlohaCamp"
                icon={Link2}
              />
              <StatCard
                label="Zajęte dziś"
                value={`${occupiedToday}/${CABINS.length}`}
                detail="Domki z blokadą na bieżący dzień"
                icon={ShieldCheck}
              />
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <div id="inquiries" className="rounded-lg border border-stone-200 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-stone-100 px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ranczo-terracotta">
                      Kolejka
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-stone-950">Oczekujące zapytania</h2>
                  </div>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-semibold text-stone-600">
                    {pending.length}
                  </span>
                </div>

                <div className="p-5">
                  {pending.length === 0 ? (
                    <EmptyState
                      title="Brak zapytań do obsługi"
                      text="Kiedy ktoś wyśle formularz rezerwacyjny, pojawi się tutaj z akcjami."
                    />
                  ) : (
                    <div className="space-y-4">
                      {pending.map((inquiry) => (
                        <article key={inquiry.id} className="rounded-lg border border-stone-200 p-4">
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base font-bold text-stone-950">{inquiry.name}</h3>
                                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                                  Do decyzji
                                </span>
                              </div>
                              <p className="mt-2 text-sm text-stone-500">
                                {inquiry.email}
                                {inquiry.phone ? `, ${inquiry.phone}` : ""}
                              </p>
                              <p className="mt-3 font-semibold text-stone-800">
                                {formatDate(inquiry.checkin)} - {formatDate(inquiry.checkout)}
                                <span className="ml-2 text-sm font-medium text-stone-500">
                                  {inquiry.guests} gości
                                </span>
                              </p>
                              {inquiry.message && (
                                <p className="mt-3 rounded-md bg-stone-50 p-3 text-sm leading-6 text-stone-600">
                                  {inquiry.message}
                                </p>
                              )}
                            </div>

                            <div className="min-w-[260px] space-y-2">
                              <form action={confirmInquiry} className="grid gap-2">
                                <input type="hidden" name="inquiryId" value={inquiry.id} />
                                <input type="hidden" name="checkin" value={inquiry.checkin} />
                                <input type="hidden" name="checkout" value={inquiry.checkout} />
                                <select
                                  name="cabinId"
                                  defaultValue={inquiry.cabin || CABINS[0].id}
                                  className="h-10 rounded-md border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-ranczo-terracotta focus:ring-2 focus:ring-ranczo-terracotta/20"
                                >
                                  {CABINS.map((cabin) => (
                                    <option key={cabin.id} value={cabin.id}>
                                      {cabin.name}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  type="submit"
                                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ranczo-terracotta px-4 text-sm font-semibold text-white transition-colors hover:bg-ranczo-terracotta/85"
                                >
                                  <Check className="h-4 w-4" />
                                  Potwierdź
                                </button>
                              </form>
                              <form action={rejectInquiry}>
                                <input type="hidden" name="inquiryId" value={inquiry.id} />
                                <button
                                  type="submit"
                                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-stone-300 px-4 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-50"
                                >
                                  <X className="h-4 w-4" />
                                  Odrzuć
                                </button>
                              </form>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div id="sync" className="rounded-lg border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-100 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ranczo-terracotta">
                    Synchronizacja
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-stone-950">Kanały sprzedaży</h2>
                </div>
                <div className="space-y-4 p-5">
                  {["slowhop", "alohacamp"].map((source) => {
                    const count = upcomingBookings.filter((booking) => booking.source === source).length;
                    return (
                      <div key={source} className="flex items-center justify-between gap-4 rounded-lg border border-stone-200 p-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
                            <Link2 className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="font-semibold text-stone-950">{SOURCE_LABEL[source]}</p>
                            <p className="text-sm text-stone-500">{count} nadchodzących wpisów</p>
                          </div>
                        </div>
                        <SourceBadge source={source} />
                      </div>
                    );
                  })}

                  <div className="rounded-lg bg-ranczo-charcoal p-4 text-white">
                    <p className="text-sm font-semibold">Eksport iCal</p>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                      Link przy każdym domku wklejasz do AlohaCamp i SlowHop, żeby platformy widziały
                      rezerwacje ze strony oraz ręczne blokady.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="cabins" className="space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ranczo-terracotta">
                    Dostępność
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950">Domki</h2>
                </div>
                {nextBooking && (
                  <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 shadow-sm">
                    <Clock3 className="h-4 w-4 text-ranczo-terracotta" />
                    Najbliższy wpis: {nextBooking.cabin.name}, {formatShortDate(nextBooking.start)}
                  </div>
                )}
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                {CABINS.map((cabin) => {
                  const bookings = (allBookings[cabin.id] ?? [])
                    .filter((booking) => booking.end >= today)
                    .sort((a, b) => a.start.localeCompare(b.start));
                  const nextCabinBooking = bookings[0];
                  const isOccupied = bookings.some((booking) =>
                    rangesOverlap(booking.start, booking.end, today, tomorrow)
                  );

                  return (
                    <article key={cabin.id} className="rounded-lg border border-stone-200 bg-white shadow-sm">
                      <div className="flex flex-col gap-4 border-b border-stone-100 p-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold text-stone-950">{cabin.name}</h3>
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                isOccupied
                                  ? "bg-red-50 text-red-700"
                                  : "bg-emerald-50 text-emerald-700"
                              }`}
                            >
                              {isOccupied ? "Zajęty dziś" : "Wolny dziś"}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-stone-500">
                            {nextCabinBooking
                              ? `Najbliżej: ${formatDate(nextCabinBooking.start)}`
                              : "Brak przyszłych blokad"}
                          </p>
                        </div>
                        <a
                          href={`/api/ical/${cabin.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-stone-300 px-3 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
                        >
                          <ExternalLink className="h-4 w-4" />
                          iCal
                        </a>
                      </div>

                      <div className="p-5">
                        {bookings.length === 0 ? (
                          <EmptyState
                            title="Kalendarz jest pusty"
                            text="Dodaj ręczną blokadę albo poczekaj na import z kanałów."
                          />
                        ) : (
                          <ul>
                            {bookings.slice(0, 5).map((booking) => (
                              <BookingRow key={booking.id} cabinId={cabin.id} booking={booking} />
                            ))}
                          </ul>
                        )}

                        {bookings.length > 5 && (
                          <p className="mt-3 text-sm text-stone-500">
                            + {bookings.length - 5} kolejnych wpisów w kalendarzu.
                          </p>
                        )}

                        <form action={addManualBlockAction} className="mt-5 rounded-lg bg-stone-50 p-4">
                          <input type="hidden" name="cabinId" value={cabin.id} />
                          <p className="mb-3 text-sm font-semibold text-stone-800">Ręczna blokada terminu</p>
                          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                            <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">
                              Od
                              <input
                                type="date"
                                name="start"
                                required
                                className="h-10 rounded-md border border-stone-300 bg-white px-3 text-sm font-medium text-stone-900 outline-none transition focus:border-ranczo-terracotta focus:ring-2 focus:ring-ranczo-terracotta/20"
                              />
                            </label>
                            <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">
                              Do
                              <input
                                type="date"
                                name="end"
                                required
                                className="h-10 rounded-md border border-stone-300 bg-white px-3 text-sm font-medium text-stone-900 outline-none transition focus:border-ranczo-terracotta focus:ring-2 focus:ring-ranczo-terracotta/20"
                              />
                            </label>
                            <button
                              type="submit"
                              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-ranczo-charcoal px-4 text-sm font-semibold text-white transition-colors hover:bg-ranczo-green"
                            >
                              <Plus className="h-4 w-4" />
                              Dodaj
                            </button>
                          </div>
                        </form>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
