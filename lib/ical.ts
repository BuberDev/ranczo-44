import type { BookingRange } from "./bookings";

function formatIcsDate(date: string): string {
  return date.replace(/-/g, "");
}

function escapeText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** RFC 5545: linie nie powinny przekraczać 75 oktetów; dłuższe łamiemy z wcięciem. */
function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 0) {
    chunks.push(" " + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  return chunks.join("\r\n");
}

export function generateIcs(calendarName: string, bookings: BookingRange[]): string {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ranczo 44//Bookings//PL",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${escapeText(calendarName)}`,
  ];

  for (const booking of bookings) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${booking.id}@ranczo44.pl`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${formatIcsDate(booking.start)}`,
      `DTEND;VALUE=DATE:${formatIcsDate(booking.end)}`,
      `SUMMARY:${escapeText("Zarezerwowane – Ranczo 44")}`,
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}

export interface ParsedIcsEvent {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  uid: string;
}

function parseIcsDate(value: string): string {
  // Obsługuje zarówno format YYYYMMDD, jak i YYYYMMDDTHHMMSSZ.
  const digits = value.replace(/[^0-9]/g, "").slice(0, 8);
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
}

export function parseIcsEvents(icsText: string): ParsedIcsEvent[] {
  // Odwijanie linii: linia zaczynająca się spacją/tabem jest kontynuacją poprzedniej (RFC 5545).
  const unfolded = icsText.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
  const lines = unfolded.split("\n").map((line) => line.trim());

  const events: ParsedIcsEvent[] = [];
  let current: Partial<ParsedIcsEvent> | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      current = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (current?.start && current?.end) {
        events.push({
          start: current.start,
          end: current.end,
          uid: current.uid ?? `${current.start}-${current.end}`,
        });
      }
      current = null;
      continue;
    }
    if (!current) continue;

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const rawKey = line.slice(0, separatorIndex);
    const value = line.slice(separatorIndex + 1);
    if (!rawKey || !value) continue;
    const key = rawKey.split(";")[0];

    if (key === "DTSTART") current.start = parseIcsDate(value);
    else if (key === "DTEND") current.end = parseIcsDate(value);
    else if (key === "UID") current.uid = value;
  }

  return events;
}
