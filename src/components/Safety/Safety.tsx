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
    <section className="w-full  bg-(--destination-background) p-5  sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-(--destination-primary)/30 bg-(--destination-primary)/5 text-(--destination-primary)">
            <Siren className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-(--destination-text) sm:text-lg">
              Emergency Contacts
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--destination-primary) opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-(--destination-primary)" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-(--destination-secondary)">
                Active 24/7
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h[120px] flex animate-pulse flex-col justify-between rounded-xl border border-(--destination-border) bg-(--destination-secondary)/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-(--destination-secondary)/10" />
                <div className="h-4 w-20 rounded bg-(--destination-secondary)/10" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div className="h-8 w-24 rounded bg-(--destination-secondary)/10" />
                <div className="h-8 w-16 rounded bg-(--destination-secondary)/10" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-(--destination-secondary)/30 bg-(--destination-secondary)/5 p-5 sm:flex-row">
          <p className="text-sm font-medium text-(--destination-secondary)">
            {error}
          </p>
        </div>
      )}

      {/* Emergency Contacts Grid */}
      {status === "success" && emergency && (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {emergencyItems.map((item) => {
            const Icon = item.icon;
            const number = emergency[item.key];

            return (
              <div
                key={item.key}
                className="group relative flex cursor-pointer flex-col justify-between  bg-(--destination-background) p-4  transition-all duration-300 hover:-translate-y-0.5 hover:border-(--destination-primary)/40 hover:bg-(--destination-primary)/5 hover:shadow-md"
              >
                {/* Service Label & Icon */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--destination-secondary)/10 text-(--destination-secondary) transition-colors group-hover:bg-(--destination-primary)/10 group-hover:text-(--destination-primary)">
                    <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-(--destination-text)">
                    {item.label}
                  </span>
                </div>

                {/* Emergency Number & Action */}
                <div className="mt-5 flex items-end justify-between gap-3">
                  <span className="text-3xl font-bold tracking-tight text-(--destination-text) sm:text-4xl">
                    {number ?? "—"}
                  </span>

                  {number && (
                    <a
                      href={`tel:${number}`}
                      aria-label={`Direct call ${item.label}`}
                      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-(--destination-primary) px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-(--destination-secondary) active:scale-95"
                    >
                      <Phone size={14} strokeWidth={2.5} aria-hidden="true" />
                      <span>Dial</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
