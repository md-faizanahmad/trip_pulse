"use client";

import { usePasswordMeter } from "@/hooks/usePasswordMeter";
import { Check, X } from "lucide-react";

type PasswordMeterProps = {
  password: string;
};

const strengthConfig = {
  weak: {
    label: "Weak",
    segments: 1,
    className: "bg-red-500",
    textClassName: "text-red-600",
  },
  medium: {
    label: "Medium",
    segments: 3,
    className: "bg-amber-500",
    textClassName: "text-amber-600",
  },
  strong: {
    label: "Strong",
    segments: 5,
    className: "bg-emerald-500",
    textClassName: "text-emerald-600",
  },
} as const;

export default function PasswordMeter({ password }: PasswordMeterProps) {
  const { strength, score, requirements } = usePasswordMeter(password);

  const config = strengthConfig[strength];

  if (!password) {
    return null;
  }

  return (
    <div
      className="space-y-3"
      aria-live="polite"
      aria-label={`Password strength: ${config.label}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-600">
          Password strength
        </span>

        <span className={`text-xs font-bold ${config.textClassName}`}>
          {config.label}
        </span>
      </div>

      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={5}
        aria-valuenow={score}
        aria-label={`Password strength ${score} out of 5`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              index < config.segments ? config.className : "bg-zinc-200"
            }`}
          />
        ))}
      </div>

      <ul className="space-y-1.5" aria-label="Password requirements">
        {requirements.map((requirement) => (
          <li
            key={requirement.label}
            className={`flex items-center gap-2 text-xs ${
              requirement.met ? "text-emerald-600" : "text-zinc-500"
            }`}
          >
            {requirement.met ? (
              <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}

            <span>{requirement.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
