"use client";

import { useState } from "react";
import { toast } from "sonner";

import { toggleAttractionPin, toggleLocationPin } from "@/services/pins.client";
import type { AttractionPinInput, LocationPinInput } from "@/types/pins";

type PinButtonProps =
  | {
      type: "location";
      input: LocationPinInput;
      initialPinned?: boolean;
    }
  | {
      type: "attraction";
      input: AttractionPinInput;
      initialPinned?: boolean;
    };

export default function PinButton({
  type,
  input,
  initialPinned = false,
}: PinButtonProps) {
  const [isPinned, setIsPinned] = useState(initialPinned);
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggle() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const result =
        type === "location"
          ? await toggleLocationPin(input)
          : await toggleAttractionPin(input);

      setIsPinned(result.pinned);

      toast.success(
        result.pinned ? "Added to your list." : "Removed from your list.",
      );
    } catch (error) {
      console.error("Pin toggle error:", error);

      toast.error(
        error instanceof Error ? error.message : "Unable to update your list.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      aria-pressed={isPinned}
      aria-label={isPinned ? "Remove from your list" : "Add to your list"}
      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
        isPinned
          ? "border-yellow-400 bg-yellow-400 text-yellow-950 hover:border-yellow-500 hover:bg-yellow-500"
          : " border-none"
      } disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {isLoading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-200 border-t-yellow-700"
            aria-hidden="true"
          />
          <span>Saving</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isPinned ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 17.5 5.5 21l1.5-7L2 9l7.2-1L12 2l2.8 6L22 9l-5 5 1.5 7z" />
          </svg>

          <span>{isPinned ? "Pinned" : "Pin"}</span>
        </>
      )}
    </button>
  );
}
