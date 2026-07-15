import "server-only";
import { get, put } from "@vercel/blob";

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function readJson<T>(pathname: string): Promise<T | null> {
  if (!hasBlobToken()) {
    console.warn(`[blob-store] BLOB_READ_WRITE_TOKEN nie jest ustawiony — pomijam odczyt ${pathname}`);
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
  if (!hasBlobToken()) {
    console.warn(`[blob-store] BLOB_READ_WRITE_TOKEN nie jest ustawiony — pomijam zapis ${pathname}`);
    return;
  }

  await put(pathname, JSON.stringify(data, null, 2), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });
}
