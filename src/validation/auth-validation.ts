const NAME_INPUT_PATTERN = /[^\p{L}\p{M}\s'.-]/gu;
const EMAIL_INPUT_PATTERN = /[^a-zA-Z0-9.!#$&'*+/=?^_`{|}~@-]/g;

export function sanitizeNameInput(value: string): string {
  return value.replace(NAME_INPUT_PATTERN, "");
}

export function sanitizeEmailInput(value: string): string {
  return value.replace(EMAIL_INPUT_PATTERN, "");
}

export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}
