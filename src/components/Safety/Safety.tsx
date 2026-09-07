"use client";

import { useSafety } from "@/hooks/useSafety";

type SafetyProps = {
  countryCode: string | null;
};

const emergencyItems = [
  {
    key: "emergency" as const,
    label: "Emergency",
    icon: "🚨",
  },
  {
    key: "police" as const,
    label: "Police",
    icon: "👮",
  },
  {
    key: "ambulance" as const,
    label: "Ambulance",
    icon: "🚑",
  },
  {
    key: "fire" as const,
    label: "Fire",
    icon: "🚒",
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
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyItems.map((item) => (
            <div
              key={item.key}
              className="h-20 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100"
            />
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {status === "success" && emergency && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-3 border-b border-zinc-100 py-3 sm:rounded-lg sm:border sm:border-zinc-200 sm:bg-white sm:px-4"
            >
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-0.5 text-lg font-bold text-zinc-900">
                  {emergency[item.key] ?? "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
