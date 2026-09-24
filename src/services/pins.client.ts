import type {
  AttractionPinInput,
  LocationPinInput,
  PinToggleResult,
} from "@/types/pins";

async function togglePin<T extends LocationPinInput | AttractionPinInput>(
  endpoint: string,
  input: T,
): Promise<PinToggleResult> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const data: PinToggleResult & { error?: string } = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Unable to update pin.");
  }

  return data;
}

export function toggleLocationPin(
  input: LocationPinInput,
): Promise<PinToggleResult> {
  return togglePin("/api/pins/location", input);
}

export function toggleAttractionPin(
  input: AttractionPinInput,
): Promise<PinToggleResult> {
  return togglePin("/api/pins/attraction", input);
}
