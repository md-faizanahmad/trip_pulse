"use client";

import { useState } from "react";
import { toast } from "sonner";

import { toggleAttractionPin } from "@/services/pins.client";
import type { AttractionPinInput } from "@/types/pins";

type AttractionPinButtonProps = {
  input: AttractionPinInput;
  initialPinned?: boolean;
};

export default function AttractionPinButton({
  input,
  initialPinned = false,
}: AttractionPinButtonProps) {
  const [isPinned, setIsPinned] = useState(initialPinned);
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggle() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await toggleAttractionPin(input);

      setIsPinned(result.pinned);

      toast.success(
        result.pinned ? "Added to your list." : "Removed from your list.",
      );
    } catch (error) {
      console.error("Attraction pin toggle error:", error);

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
      aria-label={
        isPinned
          ? `Remove ${input.name} from your list`
          : `Add ${input.name} to your list`
      }
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
        isPinned
          ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
          : "border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
      } disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {isLoading ? (
        <span
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
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
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      )}
    </button>
  );
}
