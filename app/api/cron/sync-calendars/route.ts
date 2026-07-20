import { NextResponse } from "next/server";
import { CABINS } from "@/lib/cabins";
import { replaceExternalBookings, type ExternalBookingSource } from "@/lib/bookings";
import { parseIcsEvents } from "@/lib/ical";

const EXTERNAL_SOURCES: { source: ExternalBookingSource; envPrefix: string; label: string }[] = [
  { source: "slowhop", envPrefix: "SLOWHOP_ICAL_URL_", label: "Slowhop" },
  { source: "alohacamp", envPrefix: "ALOHACAMP_ICAL_URL_", label: "Alohacamp" },
];

/**
 * Wywoływane cyklicznie przez Vercel Cron (zob. vercel.json). Dla każdej skonfigurowanej
 * platformy (Slowhop, Alohacamp) i każdego domku pobiera jej link .ics i nadpisuje w naszym
 * magazynie terminy oznaczone tym źródłem, zachowując rezerwacje bezpośrednie, ręczne blokady
 * i terminy z pozostałych platform.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const results: Record<string, Record<string, { imported: number; error?: string }>> = {};

  for (const { source, envPrefix, label } of EXTERNAL_SOURCES) {
    results[source] = {};

    for (const cabin of CABINS) {
      const icalUrl = process.env[`${envPrefix}${cabin.id}`];
      if (!icalUrl) {
        results[source][cabin.id] = {
          imported: 0,
          error: `Brak skonfigurowanego ${envPrefix}${cabin.id}`,
        };
        continue;
      }

      try {
        const res = await fetch(icalUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`${label} odpowiedział statusem ${res.status}`);
        const text = await res.text();
        const events = parseIcsEvents(text);
        await replaceExternalBookings(
          cabin.id,
          source,
          events.map((e) => ({ start: e.start, end: e.end, note: `Import z ${label}` }))
        );
        results[source][cabin.id] = { imported: events.length };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Nieznany błąd";
        results[source][cabin.id] = { imported: 0, error: message };
        console.error(`[sync-calendars] Błąd importu (${label}) dla domku ${cabin.id}`, error);
      }
    }
  }

  return NextResponse.json({ syncedAt: new Date().toISOString(), results });
}
