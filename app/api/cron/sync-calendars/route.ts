import { NextResponse } from "next/server";
import { syncAllCalendars } from "@/lib/sync-calendars";

/**
 * Wywoływane cyklicznie przez Vercel Cron (zob. vercel.json) — raz dziennie na planie Hobby.
 * Ta sama logika jest też dostępna z panelu /admin przez przycisk "Synchronizuj teraz"
 * (zob. app/actions/admin-sync.ts), dla przypadków gdy trzeba odświeżyć dane natychmiast.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const results = await syncAllCalendars();
  return NextResponse.json({ syncedAt: new Date().toISOString(), results });
}
