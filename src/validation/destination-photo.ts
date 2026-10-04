const MAX_DESTINATION_LENGTH = 100;

export type DestinationValidationResult =
  | { valid: true; destination: string }
  | { valid: false; message: string };

export function validateDestination(
  value: string | null,
): DestinationValidationResult {
  if (!value?.trim()) {
    return {
      valid: false,
      message: "Destination is required.",
    };
  }

  const destination = value.trim();
  if (
    destination.length > MAX_DESTINATION_LENGTH ||
    /[\u0000-\u001F\u007F]/.test(destination)
  ) {
    return {
      valid: false,
      message: "Please provide a valid destination name.",
    };
  }

  return { valid: true, destination };
}
