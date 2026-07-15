import { NextResponse } from "next/server";
import { CABINS } from "@/lib/cabins";
import { getCabinBookings } from "@/lib/bookings";
import { generateIcs } from "@/lib/ical";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cabinId: string }> }
) {
  const { cabinId } = await params;
  const cabin = CABINS.find((c) => c.id === cabinId);
  if (!cabin) {
    return NextResponse.json({ error: "Nieznany domek" }, { status: 404 });
  }

  const bookings = await getCabinBookings(cabinId);
  // Nie eksportujemy z powrotem terminów zaimportowanych ze Slowhopa — to pętla, którą Slowhop już sam obsługuje.
  const exportable = bookings.filter((b) => b.source !== "slowhop");
  const ics = generateIcs(`Ranczo 44 – ${cabin.name}`, exportable);

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="ranczo44-domek-${cabinId}.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
