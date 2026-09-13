"use client";

import { useTransport } from "@/hooks/useTransport";
import type { TransportStatus } from "@/types/transport";

type TransportProps = {
  latitude: number;
  longitude: number;
};

const transportItems: {
  key: "metro" | "bus" | "train" | "tram" | "ferry";
  label: string;
  icon: string;
}[] = [
  { key: "metro", label: "Metro", icon: "🚇" },
  { key: "bus", label: "Bus", icon: "🚌" },
  { key: "train", label: "Train", icon: "🚆" },
  { key: "tram", label: "Tram", icon: "🚊" },
  { key: "ferry", label: "Ferry", icon: "⛴️" },
];

function getStatusLabel(status: TransportStatus) {
  if (status === "available") return "Available";
  return "Unknown";
}

export default function Transport({ latitude, longitude }: TransportProps) {
  const { transport, status, error } = useTransport(latitude, longitude);

  return (
    <section className="w-full border-b border-slate-200 bg-[#FFFFFF] p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-[#008EEB]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#022A5A]">
            Getting Around · Transport
          </h2>
        </div>
        {status === "success" && transport && (
          <span className="font-mono text-[10px] font-bold text-slate-400">
            {
              Object.values(transport).filter(
                (itemStatus) => itemStatus === "available",
              ).length
            }{" "}
            MODES ACTIVE
          </span>
        )}
      </div>

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="mt-3.5 grid grid-cols-2 border-t border-l border-slate-200 sm:grid-cols-3 lg:grid-cols-5">
          {transportItems.map((item) => (
            <div
              key={item.key}
              className="flex h-20 animate-pulse flex-col justify-between border-r border-b border-slate-200 bg-slate-50 p-3"
            >
              <div className="h-4 w-6 bg-slate-200" />
              <div className="space-y-1.5">
                <div className="h-3 w-12 bg-slate-200" />
                <div className="h-2.5 w-16 bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="mt-3.5 border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-bold text-red-700">{error}</p>
        </div>
      )}

      {/* Modern Compact Ledger Grid */}
      {status === "success" && transport && (
        <div className="mt-3.5 grid grid-cols-2 border-t border-l border-slate-200 sm:grid-cols-3 lg:grid-cols-5">
          {transportItems.map((item) => {
            const isAvailable = transport[item.key] === "available";

            return (
              <div
                key={item.key}
                className="flex flex-col justify-between border-r border-b border-slate-200 bg-[#FFFFFF] p-3 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-base select-none"
                    role="img"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 ${
                      isAvailable ? "bg-[#008EEB]" : "bg-slate-300"
                    }`}
                  />
                </div>

                <div className="mt-3">
                  <p className="text-xs font-bold tracking-tight text-[#022A5A]">
                    {item.label}
                  </p>
                  <p
                    className={`mt-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isAvailable ? "text-[#008EEB]" : "text-slate-400"
                    }`}
                  >
                    {getStatusLabel(transport[item.key])}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
