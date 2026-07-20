import "server-only";
import { readJson, writeJson } from "./blob-store";
import { CABINS } from "./cabins";

export type BookingSource = "direct" | "slowhop" | "alohacamp" | "manual";
export type ExternalBookingSource = Extract<BookingSource, "slowhop" | "alohacamp">;

export interface BookingRange {
  id: string;
  start: string; // YYYY-MM-DD (dzień przyjazdu)
  end: string; // YYYY-MM-DD (dzień wyjazdu, wyłącznie)
  source: BookingSource;
  note?: string;
  createdAt: string;
}

export interface PendingInquiry {
  id: string;
  checkin: string;
  checkout: string;
  guests: string;
  cabin: string; // "" = dowolny domek
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "pending" | "confirmed" | "rejected";
}

const cabinBookingsPath = (cabinId: string) => `bookings/cabin-${cabinId}.json`;
const inquiriesPath = "bookings/pending-inquiries.json";

export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export async function getCabinBookings(cabinId: string): Promise<BookingRange[]> {
  const data = await readJson<BookingRange[]>(cabinBookingsPath(cabinId));
  return data ?? [];
}

async function setCabinBookings(cabinId: string, bookings: BookingRange[]): Promise<void> {
  await writeJson(cabinBookingsPath(cabinId), bookings);
}

export async function getAllCabinBookings(): Promise<Record<string, BookingRange[]>> {
  const entries = await Promise.all(
    CABINS.map(async (cabin) => [cabin.id, await getCabinBookings(cabin.id)] as const)
  );
  return Object.fromEntries(entries);
}

/** Zastępuje terminy pochodzące z danej zewnętrznej platformy (Slowhop, Alohacamp...) najnowszym
 * importem, zachowując rezerwacje bezpośrednie, ręczne blokady i terminy z innych platform. */
export async function replaceExternalBookings(
  cabinId: string,
  source: ExternalBookingSource,
  ranges: { start: string; end: string; note?: string }[]
): Promise<void> {
  const existing = await getCabinBookings(cabinId);
  const kept = existing.filter((b) => b.source !== source);
  const now = new Date().toISOString();
  const fresh: BookingRange[] = ranges.map((r, index) => ({
    id: `${source}-${cabinId}-${r.start}-${index}`,
    source,
    createdAt: now,
    ...r,
  }));
  await setCabinBookings(cabinId, [...kept, ...fresh]);
}

export async function addDirectBooking(
  cabinId: string,
  range: { start: string; end: string; note?: string }
): Promise<void> {
  const existing = await getCabinBookings(cabinId);
  const booking: BookingRange = {
    id: `direct-${cabinId}-${Date.now()}`,
    source: "direct",
    createdAt: new Date().toISOString(),
    ...range,
  };
  await setCabinBookings(cabinId, [...existing, booking]);
}

export async function addManualBlock(
  cabinId: string,
  range: { start: string; end: string; note?: string }
): Promise<void> {
  const existing = await getCabinBookings(cabinId);
  const booking: BookingRange = {
    id: `manual-${cabinId}-${Date.now()}`,
    source: "manual",
    createdAt: new Date().toISOString(),
    ...range,
  };
  await setCabinBookings(cabinId, [...existing, booking]);
}

export async function removeCabinBooking(cabinId: string, bookingId: string): Promise<void> {
  const existing = await getCabinBookings(cabinId);
  await setCabinBookings(cabinId, existing.filter((b) => b.id !== bookingId));
}

export async function getPendingInquiries(): Promise<PendingInquiry[]> {
  const data = await readJson<PendingInquiry[]>(inquiriesPath);
  return data ?? [];
}

async function setPendingInquiries(inquiries: PendingInquiry[]): Promise<void> {
  await writeJson(inquiriesPath, inquiries);
}

export async function addPendingInquiry(
  input: Omit<PendingInquiry, "id" | "createdAt" | "status">
): Promise<void> {
  const existing = await getPendingInquiries();
  const inquiry: PendingInquiry = {
    ...input,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  await setPendingInquiries([...existing, inquiry]);
}

export async function updateInquiryStatus(
  id: string,
  status: PendingInquiry["status"]
): Promise<PendingInquiry | null> {
  const existing = await getPendingInquiries();
  const inquiry = existing.find((i) => i.id === id) ?? null;
  if (!inquiry) return null;
  await setPendingInquiries(existing.map((i) => (i.id === id ? { ...i, status } : i)));
  return inquiry;
}
