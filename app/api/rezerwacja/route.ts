import { Resend } from "resend";
import { NextResponse } from "next/server";

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "kontakt@ranczo44.pl";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Brak konfiguracji RESEND_API_KEY. Skontaktuj się z administratorem." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { checkin, checkout, guests, cabin, name, email, phone, message } = body;

    if (!checkin || !checkout || !name || !email) {
      return NextResponse.json(
        { error: "Brakuje wymaganych pól: data przyjazdu, wyjazdu, imię lub email." },
        { status: 400 }
      );
    }

    const cabinLabel = cabin
      ? `Domek ${cabin}`
      : "Dowolny dostępny domek";

    // 1. Email do właściciela rancza
    await resend.emails.send({
      from: "Ranczo 44 – Formularz <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: `🐴 Nowe zapytanie rezerwacyjne – ${name}`,
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
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">E-mail</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;"><a href="mailto:${email}" style="color: #d4845a;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Telefon</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">${phone || "–"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Przyjazd</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; font-weight: bold;">${checkin}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Wyjazd</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; font-weight: bold;">${checkout}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Liczba gości</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">${guests}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df; color: #888; font-size: 13px;">Wybrany domek</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8e4df;">${cabinLabel}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Wiadomość</td>
                <td style="padding: 10px 0; font-style: italic; color: #555;">${message}</td>
              </tr>` : ""}
            </table>

            <div style="margin-top: 32px; padding: 16px; background: #d4845a12; border-left: 3px solid #d4845a; border-radius: 4px;">
              <p style="margin: 0; color: #d4845a; font-size: 14px;">💡 Odpowiedz na to zapytanie bezpośrednio mailem lub telefonicznie, by potwierdzić rezerwację.</p>
            </div>
          </div>

          <div style="background: #1a1a1a; padding: 20px; text-align: center;">
            <p style="color: #888; font-size: 12px; margin: 0;">Ranczo 44 · Uście Gorlickie · Beskid Niski</p>
          </div>
        </div>
      `,
    });

    // 2. Potwierdzenie dla gościa
    await resend.emails.send({
      from: "Ranczo 44 <onboarding@resend.dev>",
      to: email,
      subject: "✅ Zapytanie rezerwacyjne otrzymane – Ranczo 44",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
          <div style="background: #1a1a1a; padding: 32px; text-align: center;">
            <h1 style="color: #d4845a; font-size: 28px; margin: 0;">Ranczo 44</h1>
            <p style="color: #a89a85; margin: 8px 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Beskid Niski · Uście Gorlickie</p>
          </div>

          <div style="background: #faf9f7; padding: 32px; border: 1px solid #e8e4df;">
            <h2 style="font-size: 22px; margin: 0 0 16px;">Cześć, ${name}! 🐴</h2>
            <p style="color: #555; line-height: 1.7;">Dziękujemy za zapytanie rezerwacyjne. Skontaktujemy się z Tobą w ciągu <strong>24 godzin</strong>, by potwierdzić dostępność i omówić szczegóły pobytu.</p>

            <div style="margin: 24px 0; padding: 20px; background: #1a1a1a0a; border-radius: 12px;">
              <p style="margin: 0 0 8px; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Twoje zapytanie</p>
              <p style="margin: 4px 0;"><strong>📅</strong> ${checkin} → ${checkout}</p>
              <p style="margin: 4px 0;"><strong>👥</strong> ${guests} gości</p>
              <p style="margin: 4px 0;"><strong>🏠</strong> ${cabinLabel}</p>
            </div>

            <p style="color: #555; line-height: 1.7;">W razie pilnego pytania zadzwoń do nas bezpośrednio.</p>
            <p style="color: #555;">Do zobaczenia w Beskidzie! 🌲</p>
            <p style="margin: 0;"><strong>Zespół Ranczo 44</strong></p>
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
