import { NextResponse } from "next/server";
import { CABINS } from "@/lib/cabins";
import { replaceSlowhopBookings } from "@/lib/bookings";
import { parseIcsEvents } from "@/lib/ical";

/**
 * Wywoływane cyklicznie przez Vercel Cron (zob. vercel.json). Pobiera dla każdego domku
 * jego link .ics ze Slowhopa i nadpisuje w naszym magazynie terminy oznaczone jako "slowhop",
 * zachowując rezerwacje bezpośrednie i ręczne blokady.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const results: Record<string, { imported: number; error?: string }> = {};

  for (const cabin of CABINS) {
    const icalUrl = process.env[`SLOWHOP_ICAL_URL_${cabin.id}`];
    if (!icalUrl) {
      results[cabin.id] = { imported: 0, error: `Brak skonfigurowanego SLOWHOP_ICAL_URL_${cabin.id}` };
      continue;
    }

    try {
      const res = await fetch(icalUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`Slowhop odpowiedział statusem ${res.status}`);
      const text = await res.text();
      const events = parseIcsEvents(text);
      await replaceSlowhopBookings(
        cabin.id,
        events.map((e) => ({ start: e.start, end: e.end, note: "Import ze Slowhopa" }))
      );
      results[cabin.id] = { imported: events.length };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Nieznany błąd";
      results[cabin.id] = { imported: 0, error: message };
      console.error(`[sync-slowhop] Błąd importu dla domku ${cabin.id}`, error);
    }
  }

  return NextResponse.json({ syncedAt: new Date().toISOString(), results });
}
