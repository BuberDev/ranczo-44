import { Resend } from "resend";
import { NextResponse } from "next/server";
import { escapeHtml, isValidEmail, sanitizeHeaderValue } from "@/lib/email-safety";

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "kontakt@ranczo44.pl";

const EVENT_TYPE_LABEL: Record<string, string> = {
  impreza: "Impreza okolicznościowa",
  slub: "Ślub / wesele plenerowe",
  warsztaty: "Aktywności z końmi / warsztaty",
  inne: "Inne",
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
  }

  const { eventType, preferredDate, guests, name, email, phone, message } = body as {
    eventType?: string;
    preferredDate?: string;
    guests?: string;
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };

  if (!name || !email) {
    return NextResponse.json(
      { error: "Brakuje wymaganych pól: imię lub email." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Podany adres e-mail jest nieprawidłowy." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Brak konfiguracji RESEND_API_KEY. Skontaktuj się z administratorem." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const eventTypeLabel = EVENT_TYPE_LABEL[eventType ?? ""] ?? "Nieokreślony";
  const safeName = sanitizeHeaderValue(name);

  try {
    await resend.emails.send({
      from: "Ranczo 44 – Formularz eventowy <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `🎉 Nowe zapytanie o wydarzenie – ${safeName} (${eventTypeLabel})`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: #d4845a; font-size: 28px; margin: 0;">Ranczo 44</h1>
            <p style="color: #a89a85; margin: 8px 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Nowe zapytanie o wydarzenie</p>
          </div>

          <div style="background: #faf9f7; padding: 32px; border: 1px solid #e8e4df;">
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
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Rodzaj wydarzenia</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; font-weight: bold;">${escapeHtml(eventTypeLabel)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Orientacyjny termin</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">${escapeHtml(preferredDate) || "–"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Liczba gości</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">${escapeHtml(guests) || "–"}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Wiadomość</td>
                <td style="padding: 10px 0; font-style: italic; color: #555;">${escapeHtml(message)}</td>
              </tr>` : ""}
            </table>

            <div style="margin-top: 32px; padding: 16px; background: #d4845a12; border-left: 3px solid #d4845a; border-radius: 4px;">
              <p style="margin: 0; color: #d4845a; font-size: 14px;">💡 Kliknij <strong>Odpowiedz</strong>, aby bezpośrednio odpisać na adres <strong>${escapeHtml(email)}</strong>.</p>
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
    console.error("[WYDARZENIE API ERROR]", error);
    return NextResponse.json(
      { error: "Błąd serwera. Spróbuj ponownie lub skontaktuj się telefonicznie." },
      { status: 500 }
    );
  }
}
