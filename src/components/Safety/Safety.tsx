"use client";

import { useSafety } from "@/hooks/useSafety";
import { Ambulance, Flame, Phone, ShieldAlert, Siren } from "lucide-react";

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
    <section className="w-full bg-(--destination-background) px-4 py-6 sm:px-6">
      {/* Top Editorial Rule & Header */}
      <div className="flex items-end justify-between border-b-2 border-(--destination-primary) pb-3">
        <div className="space-y-1">
          <h2 className="text-sm font-black uppercase tracking-wider text-(--destination-text) sm:text-base">
            Emergency Contacts
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 text-(--destination-secondary) transition-transform duration-700 hover:rotate-180 motion-safe:animate-[spin_6s_linear_infinite]"
            aria-hidden="true"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>

          <span className="font-mono text-[10px] font-bold tracking-widest text-(--destination-secondary)">
            ACTIVE 24/7
          </span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyItems.map((item) => (
            <div key={item.key} className="space-y-3 animate-pulse">
              <div className="h-1 w-full bg-(--destination-border)" />
              <div className="h-8 w-24 bg-(--destination-border)" />
              <div className="h-4 w-16 bg-(--destination-border)" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="mt-4 border-l-2 border-(--destination-secondary) py-1 pl-3">
          <p className="text-xs font-bold text-(--destination-secondary)">
            {error}
          </p>
        </div>
      )}

      {/* Emergency Contacts */}
      {status === "success" && emergency && (
        <div className="mt-6 grid grid-cols-1 gap-6 cursor-pointer sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
          {emergencyItems.map((item) => {
            const Icon = item.icon;
            const number = emergency[item.key];

            return (
              <div
                key={item.key}
                className="group relative flex flex-col justify-between pt-3 transition-transform duration-200 hover:-translate-y-0.5"
              >
                {/* Structural Color Bar Accent */}
                <div className="absolute bottom-0 left-0 h-0.75 w-8 cursor-pointer bg-(--destination-primary) transition-all duration-300 group-hover:w-full" />

                {/* Service Label & Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-(--destination-secondary) transition-colors group-hover:text-(--destination-text)">
                    {item.label}
                  </span>

                  <Icon
                    size={16}
                    strokeWidth={2.2}
                    className="text-(--destination-primary) transition-colors"
                    aria-hidden="true"
                  />
                </div>

                {/* Emergency Number */}
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-mono text-3xl font-black tracking-tighter text-(--destination-text) sm:text-4xl">
                    {number ?? "—"}
                  </span>

                  {number && (
                    <a
                      href={`tel:${number}`}
                      aria-label={`Direct call ${item.label}`}
                      className="inline-flex h-8 items-center gap-1.5 bg-(--destination-primary) px-3 font-mono text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-(--destination-secondary) active:opacity-80"
                    >
                      <Phone size={12} strokeWidth={2.5} aria-hidden="true" />
                      <span>Dial</span>
                    </a>
                  )}
                </div>

                {/* Minimalist Baseline Track */}
                <div className="mt-4 h-px w-full bg-(--destination-border) transition-colors group-hover:bg-(--destination-secondary)" />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
