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
  // Eksportujemy tylko to, co powstało u nas (bezpośrednio lub ręczna blokada) — nie odsyłamy
  // z powrotem terminów zaimportowanych z zewnętrznych platform (Slowhop, Alohacamp...), bo to
  // pętla, którą te platformy już same obsługują.
  const exportable = bookings.filter((b) => b.source === "direct" || b.source === "manual");
  const ics = generateIcs(`Ranczo 44 – ${cabin.name}`, exportable);

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="ranczo44-domek-${cabinId}.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
