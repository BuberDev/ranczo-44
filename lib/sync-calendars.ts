import "server-only";
import { CABINS } from "./cabins";
import { replaceExternalBookings, setLastSyncedAt, type ExternalBookingSource } from "./bookings";
import { parseIcsEvents } from "./ical";

const EXTERNAL_SOURCES: { source: ExternalBookingSource; envPrefix: string; label: string }[] = [
  { source: "slowhop", envPrefix: "SLOWHOP_ICAL_URL_", label: "Slowhop" },
  { source: "alohacamp", envPrefix: "ALOHACAMP_ICAL_URL_", label: "Alohacamp" },
];

export type SyncResults = Record<string, Record<string, { imported: number; error?: string }>>;

/**
 * Pobiera i zapisuje terminy ze wszystkich skonfigurowanych platform (Slowhop, Alohacamp) dla
 * każdego domku. Współdzielone przez cron (/api/cron/sync-calendars) i przycisk "Synchronizuj
 * teraz" w panelu /admin, żeby logika nie żyła w dwóch miejscach.
 */
export async function syncAllCalendars(): Promise<SyncResults> {
  const results: SyncResults = {};

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

  await setLastSyncedAt(new Date().toISOString());
  return results;
}
