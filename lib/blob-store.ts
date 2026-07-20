import "server-only";
import { get, put } from "@vercel/blob";

function hasBlobCredentials(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID)
  );
}

export async function readJson<T>(pathname: string): Promise<T | null> {
  if (!hasBlobCredentials()) {
    console.warn(`[blob-store] Brak credentials do Vercel Blob — pomijam odczyt ${pathname}`);
    return null;
  }

  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch (error) {
    console.error(`[blob-store] Błąd odczytu ${pathname}`, error);
    return null;
  }
}

export async function writeJson(pathname: string, data: unknown): Promise<void> {
  if (!hasBlobCredentials()) {
    console.warn(`[blob-store] Brak credentials do Vercel Blob — pomijam zapis ${pathname}`);
    return;
  }

  await put(pathname, JSON.stringify(data, null, 2), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });
}
