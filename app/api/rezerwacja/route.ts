import { Resend } from "resend";
import { NextResponse } from "next/server";
import { addPendingInquiry } from "@/lib/bookings";
import { CABINS } from "@/lib/cabins";
import { escapeHtml, isValidEmail, sanitizeHeaderValue } from "@/lib/email-safety";

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "kontakt@ranczo44.pl";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
  }

  const { checkin, checkout, guests, cabin, name, email, phone, message } = body as {
    checkin?: string;
    checkout?: string;
    guests?: string;
    cabin?: string;
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };

  if (!checkin || !checkout || !name || !email) {
    return NextResponse.json(
      { error: "Brakuje wymaganych pól: data przyjazdu, wyjazdu, imię lub email." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Podany adres e-mail jest nieprawidłowy." },
      { status: 400 }
    );
  }

  // Zapisujemy zapytanie w rejestrze niezależnie od tego, czy wysyłka maila się powiedzie —
  // dzięki temu zawsze widać je w panelu /admin.
  try {
    await addPendingInquiry({
      checkin,
      checkout,
      guests: guests ?? "2",
      cabin: cabin ?? "",
      name,
      email,
      phone: phone ?? "",
      message: message ?? "",
    });
  } catch (error) {
    console.error("[REZERWACJA API] Nie udało się zapisać zapytania w rejestrze", error);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Brak konfiguracji RESEND_API_KEY. Skontaktuj się z administratorem." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const cabinLabel = cabin
      ? CABINS.find((c) => c.id === cabin)?.name ?? "Nieznany domek"
      : "Dowolny dostępny domek";
    const safeName = sanitizeHeaderValue(name);

    // Email do właściciela rancza – z reply-to na gościa (właściciel odpowie bezpośrednio)
    await resend.emails.send({
      from: "Ranczo 44 – Formularz <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `🐴 Nowe zapytanie rezerwacyjne – ${safeName} (${checkin} → ${checkout})`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: #d4845a; font-size: 28px; margin: 0;">Ranczo 44</h1>
            <p style="color: #a89a85; margin: 8px 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Nowe zapytanie rezerwacyjne</p>
          </div>

          <div style="background: #faf9f7; padding: 32px; border: 1px solid #e8e4df;">
            <h2 style="color: #d4845a; font-size: 20px; margin: 0 0 24px;">Dane gościa</h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px; width: 150px;">Imię i nazwisko</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; font-weight: bold;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">E-mail</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;"><a href="mailto:${encodeURIComponent(email)}" style="color: #d4845a;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Telefon</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">${escapeHtml(phone) || "–"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Przyjazd</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; font-weight: bold;">${escapeHtml(checkin)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Wyjazd</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; font-weight: bold;">${escapeHtml(checkout)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Liczba gości</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">${escapeHtml(guests)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Wybrany domek</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">${escapeHtml(cabinLabel)}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Wiadomość</td>
                <td style="padding: 10px 0; font-style: italic; color: #555;">${escapeHtml(message)}</td>
              </tr>` : ""}
            </table>

            <div style="margin-top: 32px; padding: 16px; background: #d4845a12; border-left: 3px solid #d4845a; border-radius: 4px;">
              <p style="margin: 0; color: #d4845a; font-size: 14px;">💡 Kliknij <strong>Odpowiedz</strong> w tej wiadomości, aby bezpośrednio odpisać gościowi na adres <strong>${escapeHtml(email)}</strong>.</p>
            </div>
          </div>

          <div style="background: #1a1a1a; padding: 20px; text-align: center;">
            <p style="color: #888; font-size: 12px; margin: 0;">Ranczo 44 · Uście Gorlickie · Beskid Niski</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[REZERWACJA API ERROR]", error);
    return NextResponse.json(
      { error: "Błąd serwera. Spróbuj ponownie lub skontaktuj się telefonicznie." },
      { status: 500 }
    );
  }
}
