"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { syncAllCalendars } from "@/lib/sync-calendars";

export async function syncCalendarsNow(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Brak dostępu.");
  }
  await syncAllCalendars();
  revalidatePath("/admin");
}
