/** Ucieka znaki specjalne HTML, żeby dane od użytkownika nie mogły wstrzyknąć znaczników w treść maila. */
export function escapeHtml(value: string = ""): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Usuwa znaki nowej linii z wartości trafiających do nagłówków maila (np. subject), żeby uniemożliwić wstrzykiwanie nagłówków. */
export function sanitizeHeaderValue(value: string = ""): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

const EMAIL_REGEX = /^[^\s@"<>]+@[^\s@"<>]+\.[^\s@"<>]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value);
}
