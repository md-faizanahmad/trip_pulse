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
    activeBg: string;
    activeBorder: string;
    activeBadge: string;
    activeText: string;
    activeNumber: string;
  }
> = {
  metro: {
    label: "Metro",
    icon: "🚇",
    activeBg: "bg-purple-500/10",
    activeBorder: "border-purple-600",
    activeBadge: "bg-purple-600 text-white",
    activeText: "text-purple-950",
    activeNumber: "text-purple-600",
  },
  bus: {
    label: "Bus",
    icon: "🚌",
    activeBg: "bg-amber-500/10",
    activeBorder: "border-amber-500",
    activeBadge: "bg-amber-500 text-white",
    activeText: "text-amber-950",
    activeNumber: "text-amber-600",
  },
  train: {
    label: "Train",
    icon: "🚆",
    activeBg: "bg-[#008EEB]/10",
    activeBorder: "border-[#008EEB]",
    activeBadge: "bg-[#008EEB] text-white",
    activeText: "text-[#022A5A]",
    activeNumber: "text-[#008EEB]",
  },
  tram: {
    label: "Tram",
    icon: "🚊",
    activeBg: "bg-emerald-500/10",
    activeBorder: "border-emerald-600",
    activeBadge: "bg-emerald-600 text-white",
    activeText: "text-emerald-950",
    activeNumber: "text-emerald-600",
  },
  ferry: {
    label: "Ferry",
    icon: "⛴️",
    activeBg: "bg-cyan-500/10",
    activeBorder: "border-cyan-600",
    activeBadge: "bg-cyan-600 text-white",
    activeText: "text-cyan-950",
    activeNumber: "text-cyan-600",
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
    <section className="w-full bg-[#FFFFFF] px-4 py-6 sm:px-6">
      {/* Editorial Header Bar */}
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#008EEB]">
            Mobility
          </span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#022A5A] sm:text-base">
            Transit Infrastructure
          </h2>
        </div>

        {status === "success" && transport && (
          <div className="font-mono text-[11px] font-medium text-[#334155]">
            <span className="font-bold text-[#022A5A]">
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
              className="flex items-center justify-between px-3 py-3 animate-pulse bg-slate-50"
            >
              <div className="h-4 w-28 bg-slate-200" />
              <div className="h-4 w-20 bg-slate-200" />
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

      {/* Modern Ledger Stream with Transit-Specific Color Identity */}
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
                    ? `${config.activeBg} border-l-2 ${config.activeBorder}`
                    : "bg-slate-50/60 border-l-2 border-transparent"
                }`}
              >
                {/* Mode Identity & Sequence */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={`font-mono text-[10px] font-bold sm:text-xs ${
                      isAvailable ? config.activeNumber : "text-slate-300"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-base select-none sm:text-lg"
                    role="img"
                    aria-label={config.label}
                  >
                    {config.icon}
                  </span>
                  <span
                    className={`text-xs font-bold tracking-tight sm:text-sm ${
                      isAvailable ? config.activeText : "text-slate-500"
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
                        ? config.activeBadge
                        : "bg-slate-200/70 text-slate-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 ${
                        isAvailable ? "bg-white" : "bg-slate-400"
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
