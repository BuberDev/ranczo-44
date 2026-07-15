import { NextResponse } from "next/server";
import { getAllCabinBookings } from "@/lib/bookings";

export async function GET() {
  const bookings = await getAllCabinBookings();
  const availability = Object.fromEntries(
    Object.entries(bookings).map(([cabinId, ranges]) => [
      cabinId,
      ranges.map((r) => ({ start: r.start, end: r.end })),
    ])
  );
  return NextResponse.json({ availability }, { headers: { "Cache-Control": "no-store" } });
}
