/** Validates Russian phone in format +7 (XXX) XXX-XX-XX */
const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export function validatePhone(value: string): boolean {
  return PHONE_REGEX.test(value);
}

export function formatPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");

  // Normalize: strip leading 7 or 8, keep up to 10 digits
  let normalized = digits;
  if (normalized.startsWith("7") || normalized.startsWith("8")) {
    normalized = normalized.slice(1);
  }
  normalized = normalized.slice(0, 10);

  if (normalized.length === 0) return "+7 ";

  let result = "+7 (";
  result += normalized.slice(0, 3);
  if (normalized.length >= 3) result += ") ";
  result += normalized.slice(3, 6);
  if (normalized.length >= 6) result += "-";
  result += normalized.slice(6, 8);
  if (normalized.length >= 8) result += "-";
  result += normalized.slice(8, 10);

  return result;
}

export const PHONE_PLACEHOLDER = "+7 (___) ___-__-__";
