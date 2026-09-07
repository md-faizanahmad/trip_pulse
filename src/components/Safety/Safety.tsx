"use client";

import { Ambulance, Flame, Phone, ShieldAlert, Siren } from "lucide-react";
import { useSafety } from "@/hooks/useSafety";

type SafetyProps = {
  countryCode: string | null;
};

const emergencyItems = [
  {
    key: "emergency" as const,
    label: "Emergency",
    icon: Siren,
  },
  {
    key: "police" as const,
    label: "Police",
    icon: ShieldAlert,
  },
  {
    key: "ambulance" as const,
    label: "Ambulance",
    icon: Ambulance,
  },
  {
    key: "fire" as const,
    label: "Fire",
    icon: Flame,
  },
];

export default function Safety({ countryCode }: SafetyProps) {
  const { emergency, status, error } = useSafety(countryCode);

  return (
    <section className="mt-8 border-t border-zinc-100 pt-8 sm:mt-10 sm:pt-10">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Safety
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
          Emergency Information
        </h2>
      </div>

      {status === "loading" && (
        <div className="space-y-2">
          {emergencyItems.map((item) => (
            <div
              key={item.key}
              className="h-14 animate-pulse rounded-md bg-zinc-100"
            />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="border-l-2 border-red-400 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {status === "success" && emergency && (
        <div className="divide-y divide-zinc-100 border-y border-zinc-200">
          {emergencyItems.map((item) => {
            const Icon = item.icon;
            const number = emergency[item.key];

            return (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 py-3.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className="shrink-0 text-zinc-500"
                    aria-hidden="true"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-zinc-500">
                      {number ?? "—"}
                    </p>
                  </div>
                </div>

                {number && (
                  <a
                    href={`tel:${number}`}
                    className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
                    aria-label={`Call ${item.label}`}
                  >
                    <Phone size={15} strokeWidth={2} aria-hidden="true" />
                    Call
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
