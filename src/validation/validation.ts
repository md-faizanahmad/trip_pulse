export function validateDestinationQuery(query: string) {
  const value = query.trim();

  if (value.length < 3) {
    return "Enter at least 3 characters.";
  }

  if (!/[a-zA-ZÀ-ÿ]/.test(value)) {
    return "Enter a valid destination name.";
  }

  if (!/^[a-zA-ZÀ-ÿ0-9\s.'-]+$/.test(value)) {
    return "Use letters, numbers, spaces, hyphens, apostrophes, or periods.";
  }

  return null;
}
