"use client";

import { useTransport } from "@/hooks/useTransport";
import type { TransportStatus } from "@/types/transport";

type TransportProps = {
  latitude: number;
  longitude: number;
};

const transportConfig: Record<
  "metro" | "bus" | "train" | "tram" | "ferry",
  {
    label: string;
    icon: string;
  }
> = {
  metro: {
    label: "Metro",
    icon: "🚇",
  },
  bus: {
    label: "Bus",
    icon: "🚌",
  },
  train: {
    label: "Train",
    icon: "🚆",
  },
  tram: {
    label: "Tram",
    icon: "🚊",
  },
  ferry: {
    label: "Ferry",
    icon: "⛴️",
  },
};

const transportKeys: (keyof typeof transportConfig)[] = [
  "metro",
  "bus",
  "train",
  "tram",
  "ferry",
];

function getStatusLabel(status: TransportStatus) {
  if (status === "available") return "Available";
  return "Unknown";
}

export default function Transport({ latitude, longitude }: TransportProps) {
  const { transport, status, error } = useTransport(latitude, longitude);

  return (
    <section className="w-full bg-(--theme-surface) px-4 py-6 sm:px-6">
      {/* Editorial Header Bar */}
      <div className="flex flex-col gap-2 border-b border-(--theme-border) pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 shrink-0 text-(--theme-primary)"
            aria-hidden="true"
          >
            <path d="M4 15V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
            <path d="M4 11h16" />
            <path d="M8 15h.01" />
            <path d="M16 15h.01" />
            <path d="m8 19-2 3" />
            <path d="m16 19 2 3" />
          </svg>

          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-(--theme-primary)">
              Mobility
            </span>

            <h2 className="text-sm font-bold uppercase tracking-wider text-(--theme-text) sm:text-base">
              Transit Infrastructure
            </h2>
          </div>
        </div>

        {status === "success" && transport && (
          <div className="font-mono text-[11px] font-medium text-(--theme-muted)">
            <span className="font-bold text-(--theme-text)">
              {
                Object.values(transport).filter(
                  (itemStatus) => itemStatus === "available",
                ).length
              }
            </span>{" "}
            of 5 modes verified
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="mt-4 space-y-1.5">
          {transportKeys.map((key) => (
            <div
              key={key}
              className="flex animate-pulse items-center justify-between bg-(--theme-muted-bg) px-3 py-3"
            >
              <div className="h-4 w-28 bg-(--theme-border)" />
              <div className="h-4 w-20 bg-(--theme-border)" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="mt-4 border-l-2 border-red-500 py-1 pl-3">
          <p className="text-xs font-semibold text-red-600">{error}</p>
        </div>
      )}

      {/* Modern Ledger Stream */}
      {status === "success" && transport && (
        <div className="mt-3 space-y-1">
          {transportKeys.map((key, index) => {
            const currentStatus = transport[key];
            const isAvailable = currentStatus === "available";
            const config = transportConfig[key];

            return (
              <div
                key={key}
                className={`flex items-center justify-between px-3 py-2.5 transition-colors sm:px-4 sm:py-3 ${
                  isAvailable
                    ? "border-l-2 border-(--theme-primary) bg-(--theme-primary-soft)"
                    : "border-l-2 border-transparent bg-(--theme-muted-bg)"
                }`}
              >
                {/* Mode Identity & Sequence */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={`font-mono text-[10px] font-bold sm:text-xs ${
                      isAvailable
                        ? "text-(--theme-primary)"
                        : "text-(--theme-muted)"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="select-none text-base sm:text-lg"
                    role="img"
                    aria-label={config.label}
                  >
                    {config.icon}
                  </span>

                  <span
                    className={`text-xs font-bold tracking-tight sm:text-sm ${
                      isAvailable
                        ? "text-(--theme-text)"
                        : "text-(--theme-muted)"
                    }`}
                  >
                    {config.label}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-extrabold uppercase tracking-wider ${
                      isAvailable
                        ? "bg-(--theme-primary) "
                        : "bg-(--theme-muted-bg) text-(--theme-muted)"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 ${
                        isAvailable ? "bg-white" : "bg-(--theme-muted)"
                      }`}
                      aria-hidden="true"
                    />

                    {getStatusLabel(currentStatus)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
