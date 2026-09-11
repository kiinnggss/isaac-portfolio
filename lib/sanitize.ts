/**
 * Input sanitization helpers to prevent XSS, HTML injection, and malicious payloads.
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== "string") return "";

  return input
    // Remove control characters and null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Strip HTML tags
    .replace(/<[^>]*>/g, "")
    // Escape lingering angle brackets and quotes
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result = { ...obj };
  for (const key in result) {
    const val = result[key];
    if (typeof val === "string") {
      (result as Record<string, unknown>)[key] = sanitizeString(val);
    }
  }
  return result;
}
