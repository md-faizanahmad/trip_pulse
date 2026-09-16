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
  const { transport, status, error, retry } = useTransport(latitude, longitude);

  return (
    <section className="w-full bg-(--destination-background) px-4 py-6 sm:px-6">
      {/* Editorial Header Bar */}
      <div className="flex flex-col gap-2 border-b border-(--destination-border) pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 shrink-0 text-(--destination-primary)"
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
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-(--destination-primary)">
              Mobility
            </span>

            <h2 className="text-sm font-bold uppercase tracking-wider text-(--destination-text) sm:text-base">
              Transit Infrastructure
            </h2>
          </div>
        </div>

        {status === "success" && transport && (
          <div className="font-mono text-[11px] font-medium text-(--destination-secondary)">
            <span className="font-bold text-(--destination-text)">
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
              className="flex animate-pulse items-center justify-between bg-(--destination-secondary)/10 px-3 py-3"
            >
              <div className="h-4 w-28 bg-(--destination-border)" />
              <div className="h-4 w-20 bg-(--destination-border)" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="mt-4 flex items-center justify-between gap-3 border-l-2 border-(--destination-secondary) py-1 pl-3">
          <p className="text-xs font-semibold text-(--destination-secondary)">
            {error}
          </p>

          <button
            type="button"
            onClick={retry}
            className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 border border-(--destination-primary) bg-(--destination-primary) px-3 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:border-(--destination-secondary) hover:bg-(--destination-secondary) active:bg-(--destination-secondary)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
              <path d="M4 5v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
              <path d="M20 19v-4h-4" />
            </svg>

            <span>Retry</span>
          </button>
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
                    ? "border-l-2 border-(--destination-primary) bg-(--destination-primary)/10"
                    : "border-l-2 border-transparent bg-(--destination-secondary)/10"
                }`}
              >
                {/* Mode Identity & Sequence */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={`font-mono text-[10px] font-bold sm:text-xs ${
                      isAvailable
                        ? "text-(--destination-primary)"
                        : "text-(--destination-secondary)"
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
                        ? "text-(--destination-text)"
                        : "text-(--destination-secondary)"
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
                        ? "bg-(--destination-primary) text-white"
                        : "bg-(--destination-secondary)/10 text-(--destination-secondary)"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 ${
                        isAvailable
                          ? "bg-white"
                          : "bg-(--destination-secondary)"
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
