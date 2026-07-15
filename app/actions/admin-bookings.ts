"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-session";
import {
  addDirectBooking,
  addManualBlock,
  removeCabinBooking,
  updateInquiryStatus,
} from "@/lib/bookings";

async function assertAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Brak dostępu.");
  }
}

export async function confirmInquiry(formData: FormData): Promise<void> {
  await assertAdmin();
  const inquiryId = String(formData.get("inquiryId") ?? "");
  const cabinId = String(formData.get("cabinId") ?? "");
  const checkin = String(formData.get("checkin") ?? "");
  const checkout = String(formData.get("checkout") ?? "");
  if (!inquiryId || !cabinId || !checkin || !checkout) return;

  await updateInquiryStatus(inquiryId, "confirmed");
  await addDirectBooking(cabinId, { start: checkin, end: checkout });
  revalidatePath("/admin");
}

export async function rejectInquiry(formData: FormData): Promise<void> {
  await assertAdmin();
  const inquiryId = String(formData.get("inquiryId") ?? "");
  if (!inquiryId) return;
  await updateInquiryStatus(inquiryId, "rejected");
  revalidatePath("/admin");
}

export async function addManualBlockAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const cabinId = String(formData.get("cabinId") ?? "");
  const start = String(formData.get("start") ?? "");
  const end = String(formData.get("end") ?? "");
  if (!cabinId || !start || !end) return;
  await addManualBlock(cabinId, { start, end });
  revalidatePath("/admin");
}

export async function removeBookingAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const cabinId = String(formData.get("cabinId") ?? "");
  const bookingId = String(formData.get("bookingId") ?? "");
  if (!cabinId || !bookingId) return;
  await removeCabinBooking(cabinId, bookingId);
  revalidatePath("/admin");
}
