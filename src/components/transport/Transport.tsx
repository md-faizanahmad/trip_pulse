"use client";

import { useTransport } from "@/hooks/useTransport";
import type { TransportStatus } from "@/types/transport";
import ErrorState from "../common/ErrorState";

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
    <section className="w-full  bg-(--destination-background) p-5  sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-(--destination-primary)/30 bg-(--destination-primary)/5 text-(--destination-primary)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M4 15V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
              <path d="M4 11h16" />
              <path d="M8 15h.01" />
              <path d="M16 15h.01" />
              <path d="m8 19-2 3" />
              <path d="m16 19 2 3" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-(--destination-text) sm:text-lg">
              Transit Infrastructure
            </h2>
            {status === "success" && transport && (
              <p className="mt-0.5 text-sm text-(--destination-secondary)">
                <span className="font-medium text-(--destination-text)">
                  {
                    Object.values(transport).filter(
                      (itemStatus) => itemStatus === "available",
                    ).length
                  }
                </span>{" "}
                of 5 modes verified
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="mt-6 flex gap-3 overflow-x-hidden sm:grid sm:grid-cols-3 md:grid-cols-5">
          {transportKeys.map((key) => (
            <div key={key} />
          ))}
        </div>
      )}

      {/* Error State */}
      {status === "error" && <ErrorState message={error} onRetry={retry} />}

      {/* Transport Tiles: Mobile Carousel / Desktop Grid */}
      {status === "success" && transport && (
        <div className="mt-6 flex snap-x snap-mandatory gap-3 cursor-pointer overflow-x-auto pb-4 scrollbar-none sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 md:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {transportKeys.map((key) => {
            const currentStatus = transport[key];
            const isAvailable = currentStatus === "available";
            const config = transportConfig[key];

            return (
              <div
                key={key}
                className={`relative flex min-w-30 snap-start flex-col items-center justify-center   p-5 transition-all duration-300 sm:min-w-0 ${
                  isAvailable
                    ? " bg-(--destination-primary)/5  hover:-translate-y-1  "
                    : " bg-(--destination-background) opacity-70 grayscale-30"
                }`}
              >
                {/* Status Indicator Dot */}
                <div
                  className={`absolute right-3 top-3 flex h-2 w-2 rounded-full ${
                    isAvailable
                      ? "bg-(--destination-secondary) shadow-[0_0_8px_var(--destination-surface)]"
                      : "bg-(--destination-primary)/40"
                  }`}
                  aria-hidden="true"
                />

                {/* Big Icon */}
                <span
                  className={`text-4xl sm:text-5xl transition-transform duration-300 ${
                    isAvailable ? "scale-105" : "scale-95 opacity-80"
                  }`}
                  role="img"
                  aria-label={config.label}
                >
                  {config.icon}
                </span>

                {/* Mode Label */}
                <span
                  className={`mt-3 text-sm font-semibold tracking-tight ${
                    isAvailable
                      ? "text-(--destination-text)"
                      : "text-(--destination-secondary)"
                  }`}
                >
                  {config.label}
                </span>

                {/* Status Text */}
                <span
                  className={`mt-0.5 text-[10px] font-medium uppercase tracking-wider ${
                    isAvailable
                      ? "text-(--destination-primary)"
                      : "text-(--destination-secondary)/70"
                  }`}
                >
                  {getStatusLabel(currentStatus)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
