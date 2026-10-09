"use client";

import { useSafety } from "@/hooks/useSafety";
import { Ambulance, Flame, Phone, ShieldAlert, Siren } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

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
    <section className="w-full bg-(--destination-background) p-5 sm:p-6">
      {/* Header */}

      <SectionTitle
        icon={Siren}
        iconVariant="circle"
        title="Emergency Contacts"
        description={
          <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--destination-primary) opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-(--destination-primary)" />
            </span>
            Active 24/7
          </span>
        }
      />

      {/* Loading Skeleton */}
      {status === "loading" && (
        <>
          <div className="mt-6 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden sm:overflow-visible">
            <div className="flex w-max gap-3 sm:w-full sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex h-27.5 w-55 shrink-0 animate-pulse flex-col justify-between bg-(--destination-secondary)/5 p-3 sm:w-auto sm:min-w-0 sm:p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 bg-(--destination-secondary)/10" />
                    <div className="h-4 w-20 bg-(--destination-secondary)/10" />
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <div className="h-7 w-20 bg-(--destination-secondary)/10" />
                    <div className="h-8 w-10 bg-(--destination-secondary)/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs text-(--destination-secondary) sm:hidden">
            Swipe to explore more →
          </p>
        </>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-(--destination-secondary)/30 bg-(--destination-secondary)/5 p-5 sm:flex-row">
          <p
            role="alert"
            className="text-sm font-medium text-(--destination-secondary)"
          >
            {error || "Emergency contacts could not be loaded."}
          </p>
        </div>
      )}

      {/* Emergency Contacts */}
      {status === "success" && emergency && (
        <>
          <div className="mt-6 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden sm:overflow-visible">
            <div className="flex w-max gap-3 sm:w-full sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {emergencyItems.map((item) => {
                const Icon = item.icon;
                const number = emergency[item.key];
                const hasNumber =
                  number != null && String(number).trim().length > 0;

                return (
                  <div
                    key={item.key}
                    className="flex w-55 shrink-0 flex-col justify-between bg-(--destination-background) p-3 sm:w-auto sm:min-w-0 sm:p-4"
                  >
                    {/* Service Label & Icon */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center text-(--destination-secondary)">
                        <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                      </div>

                      <span className="text-sm font-semibold text-(--destination-text)">
                        {item.label}
                      </span>
                    </div>

                    {/* Emergency Number & Call Action */}
                    <div className="mt-3 flex min-w-0 items-center justify-between gap-2">
                      <span className="min-w-0 wrap-break-word text-xl font-bold tracking-tight text-(--destination-text) sm:text-3xl">
                        {hasNumber ? number : "—"}
                      </span>

                      {hasNumber && (
                        <a
                          href={`tel:${String(number).trim()}`}
                          aria-label={`Call ${item.label}, ${number}`}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-(--destination-primary) transition-colors hover:text-(--destination-secondary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--destination-primary) active:opacity-70"
                        >
                          <Phone
                            size={16}
                            strokeWidth={2.2}
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-3 text-xs text-(--destination-secondary) sm:hidden">
            Swipe to explore more →
          </p>
        </>
      )}
    </section>
  );
}
