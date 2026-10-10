"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

const RETRY_COOLDOWN = 5;

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleRetry = () => {
    if (secondsLeft > 0) return;

    onRetry();
    setSecondsLeft(RETRY_COOLDOWN);
  };

  const isCoolingDown = secondsLeft > 0;

  return (
    <div
      role="alert"
      className="mt-6 flex flex-col items-center justify-center gap-4  p-6 text-center"
    >
      <p className="text-sm font-medium text-red-700">{message}</p>

      <button
        type="button"
        onClick={handleRetry}
        disabled={isCoolingDown}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-red-300"
      >
        <RotateCcw
          size={15}
          aria-hidden="true"
          className={isCoolingDown ? "animate-spin" : ""}
        />

        <span>{isCoolingDown ? `Retry in ${secondsLeft}s` : "Retry"}</span>
      </button>
    </div>
  );
}
