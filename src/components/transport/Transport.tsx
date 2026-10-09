"use client";

import { BusFront } from "lucide-react";
import { useTransport } from "@/hooks/useTransport";
import type { TransportStatus } from "@/types/transport";
import ErrorState from "../common/ErrorState";
import { transportConfig, transportModes } from "./transportConfig";
import SectionTitle from "../common/SectionTitle";

type TransportProps = {
  latitude: number;
  longitude: number;
};

function getStatusLabel(status: TransportStatus) {
  return status === "available" ? "Available" : "Unknown";
}

export default function Transport({ latitude, longitude }: TransportProps) {
  const { transport, status, error, retry } = useTransport(latitude, longitude);

  const availableModes =
    status === "success" && transport
      ? Object.values(transport).filter(
          (itemStatus) => itemStatus === "available",
        ).length
      : 0;

  return (
    <section className="w-full bg-(--destination-background) p-5 sm:p-6">
      {/* Section header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle
          icon={BusFront}
          iconVariant="circle"
          title="Transit Infrastructure"
          description={
            status === "success" && transport
              ? `${availableModes} of ${transportModes.length} modes verified`
              : undefined
          }
        />
      </div>

      {/* Loading state */}
      {status === "loading" && (
        <div className="mt-6 flex gap-3 overflow-x-hidden sm:grid sm:grid-cols-3 md:grid-cols-5">
          {transportModes.map((mode) => (
            <div
              key={mode}
              className="h-32 animate-pulse bg-(--destination-primary)/5"
            />
          ))}
        </div>
      )}

      {/* Error state */}
      {status === "error" && <ErrorState message={error} onRetry={retry} />}

      {/* Transport modes */}
      {status === "success" && transport && (
        <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 scrollbar-none sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 md:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {transportModes.map((mode) => {
            const currentStatus = transport[mode];
            const isAvailable = currentStatus === "available";
            const { label, icon: Icon } = transportConfig[mode];

            return (
              <div
                key={mode}
                className={`relative flex min-w-30 snap-start flex-col items-center justify-center p-5 transition-all duration-300 sm:min-w-0 ${
                  isAvailable
                    ? "bg-(--destination-primary)/5 hover:-translate-y-1"
                    : "bg-(--destination-background) opacity-70 grayscale-30"
                }`}
              >
                {/* Availability indicator */}
                <span
                  className={`absolute right-3 top-3 h-2 w-2 rounded-full ${
                    isAvailable
                      ? "bg-(--destination-secondary) shadow-[0_0_8px_var(--destination-surface)]"
                      : "bg-(--destination-primary)/40"
                  }`}
                  aria-hidden="true"
                />

                {/* Transport icon */}
                <Icon
                  className={`h-9 w-9 transition-transform duration-300 sm:h-10 sm:w-10 ${
                    isAvailable
                      ? "text-(--destination-primary) group-hover:scale-105"
                      : "text-(--destination-secondary) opacity-70"
                  }`}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />

                {/* Transport mode */}
                <span
                  className={`mt-3 text-sm font-semibold tracking-tight ${
                    isAvailable
                      ? "text-(--destination-text)"
                      : "text-(--destination-secondary)"
                  }`}
                >
                  {label}
                </span>

                {/* Availability status */}
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
