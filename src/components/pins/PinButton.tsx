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
      title={isPinned ? "Remove from your list" : "Add to your list"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? (
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-yellow-500"
          aria-hidden="true"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isPinned ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-5 w-5 transition-colors ${
            isPinned ? "text-yellow-500" : "text-zinc-400 hover:text-yellow-500"
          }`}
          aria-hidden="true"
        >
          <path d="M12 17.5 5.5 21l1.5-7L2 9l7.2-1L12 2l2.8 6L22 9l-5 5 1.5 7z" />
        </svg>
      )}
    </button>
  );
}
