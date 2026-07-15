import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_session";
// Krótszy TTL niż standardowe 7 dni — częściowa rekompensata braku serwerowej listy
// odwołanych sesji (patrz komentarz przy createSessionToken). Wylogowanie kasuje ciasteczko,
// ale skradziony token pozostaje ważny do wygaśnięcia; 3 dni ograniczają to okno.
const SESSION_TTL_MS = 3 * 24 * 60 * 60 * 1000;

function getSessionSecret(): string {
  // Celowo osobny sekret od ADMIN_PASSWORD — hasło logowania i klucz podpisujący sesję
  // nie powinny być tym samym sekretem (rotacja jednego nie powinna wymuszać rotacji drugiego).
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("Brak SESSION_SECRET w zmiennych środowiskowych.");
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyPassword(candidate: string): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || !candidate) return false;
  // Porównujemy skróty SHA-256 o stałej długości (32 bajty), a nie surowe hasła —
  // dzięki temu różna długość hasła nie ujawnia się w czasie odpowiedzi.
  const a = crypto.createHash("sha256").update(candidate).digest();
  const b = crypto.createHash("sha256").update(secret).digest();
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  // Losowy nonce zapewnia unikalność tokenu (nawet przy dwóch logowaniach w tej samej
  // milisekundzie) i przygotowuje grunt pod ewentualną listę odwołanych sesji w przyszłości.
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${expiresAt}:${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const separatorIndex = token.lastIndexOf(".");
  if (separatorIndex === -1) return false;
  const payload = token.slice(0, separatorIndex);
  const signature = token.slice(separatorIndex + 1);
  if (!payload || !signature) return false;

  try {
    if (!timingSafeStringEqual(sign(payload), signature)) return false;
  } catch {
    return false;
  }

  const expiresAt = Number(payload.split(":")[0]);
  return Number.isFinite(expiresAt) && Date.now() <= expiresAt;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}
