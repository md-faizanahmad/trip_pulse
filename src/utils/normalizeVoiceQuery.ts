export function normalizeVoiceQuery(value: string): string {
  return value
    .replace(/[,!?;:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\.$/, "");
}
