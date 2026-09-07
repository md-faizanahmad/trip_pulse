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
    <section className="mt-8 border-t border-zinc-100 pt-8 sm:mt-10 sm:pt-10">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Getting Around
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900">
          Transport
        </h2>
      </div>

      {status === "loading" && (
        <div className="divide-y divide-zinc-100 border-y border-zinc-200">
          {transportItems.map((item) => (
            <div
              key={item.key}
              className="flex h-14 animate-pulse items-center justify-between bg-zinc-50 px-3"
            >
              <div className="h-4 w-24 rounded bg-zinc-200" />
              <div className="h-4 w-20 rounded bg-zinc-200" />
            </div>
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {status === "success" && transport && (
        <div className="divide-y divide-zinc-100 border-y border-zinc-200">
          {transportItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4 py-3.5"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold text-zinc-900">
                  {item.label}
                </span>
              </div>

              <span
                className={
                  transport[item.key] === "available"
                    ? "text-sm font-semibold text-green-700"
                    : "text-sm font-semibold text-zinc-500"
                }
              >
                {getStatusLabel(transport[item.key])}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
