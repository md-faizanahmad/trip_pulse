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
    color: "bg-red-500",
    text: "text-red-600",
  },
  medium: {
    label: "Medium",
    segments: 3,
    color: "bg-amber-500",
    text: "text-amber-600",
  },
  strong: {
    label: "Strong",
    segments: 5,
    color: "bg-emerald-500",
    text: "text-emerald-600",
  },
} as const;

export default function PasswordMeter({ password }: PasswordMeterProps) {
  const { strength, score, requirements } = usePasswordMeter(password);
  const config = strengthConfig[strength];

  if (!password) return null;

  const hasUnmetRequirements = requirements.some(
    (requirement) => !requirement.met,
  );

  return (
    <div className="space-y-2" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-zinc-500">Password strength</span>

        <span className={`text-xs font-medium ${config.text}`}>
          {config.label}
        </span>
      </div>

      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={5}
        aria-valuenow={score}
        aria-label={`Password strength: ${config.label}`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              index < config.segments ? config.color : "bg-zinc-200"
            }`}
          />
        ))}
      </div>

      {hasUnmetRequirements && (
        <ul className="space-y-1 pt-1" aria-label="Password requirements">
          {requirements
            .filter((requirement) => !requirement.met)
            .map((requirement) => (
              <li
                key={requirement.label}
                className="flex items-center gap-2 text-xs text-zinc-500"
              >
                <X
                  className="h-3 w-3 shrink-0 text-amber-600"
                  aria-hidden="true"
                />
                <span>{requirement.label}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
