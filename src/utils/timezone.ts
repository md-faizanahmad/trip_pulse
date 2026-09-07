export function formatUtcOffset(offset: number | null) {
  if (offset === null) {
    return "—";
  }

  const sign = offset >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(offset);
  const hours = Math.floor(absoluteOffset);
  const minutes = Math.round((absoluteOffset - hours) * 60);

  return `UTC${sign}${hours}:${String(minutes).padStart(2, "0")}`;
}
