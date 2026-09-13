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
    barColor: "bg-rose-600",
    textColor: "text-rose-600",
    ctaBg: "bg-rose-600 hover:bg-rose-700",
  },
  {
    key: "police" as const,
    label: "Police",
    icon: ShieldAlert,
    barColor: "bg-[#008EEB]",
    textColor: "text-[#008EEB]",
    ctaBg: "bg-[#008EEB] hover:bg-[#022A5A]",
  },
  {
    key: "ambulance" as const,
    label: "Ambulance",
    icon: Ambulance,
    barColor: "bg-emerald-600",
    textColor: "text-emerald-600",
    ctaBg: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    key: "fire" as const,
    label: "Fire",
    icon: Flame,
    barColor: "bg-amber-600",
    textColor: "text-amber-600",
    ctaBg: "bg-amber-600 hover:bg-amber-700",
  },
];

export default function Safety({ countryCode }: SafetyProps) {
  const { emergency, status, error } = useSafety(countryCode);

  return (
    <section className="w-full bg-[#FFFFFF] px-4 py-6 sm:px-6">
      {/* Top Editorial Rule & Header */}
      <div className="flex items-end justify-between border-b-2 border-[#022A5A] pb-3">
        <div className="space-y-1">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#022A5A] sm:text-base">
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
            className="h-3.5 w-3.5 text-[#008EEB] transition-transform duration-700 hover:rotate-180 motion-safe:animate-[spin_6s_linear_infinite]"
            aria-hidden="true"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span className="font-mono text-[10px] font-bold tracking-widest text-slate-400">
            ACTIVE 24/7
          </span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyItems.map((item) => (
            <div key={item.key} className="space-y-3 animate-pulse">
              <div className="h-1 w-full bg-slate-100" />
              <div className="h-8 w-24 bg-slate-100" />
              <div className="h-4 w-16 bg-slate-100" />
            </div>
          ))}
        </div>
      )}
      {/* Error State */}
      {status === "error" && (
        <div className="mt-4 border-l-2 border-rose-600 pl-3 py-1">
          <p className="text-xs font-bold text-rose-700">{error}</p>
        </div>
      )}
      {/* Open-Flow Editorial Architecture (No Boxes, No Outer Borders) */}
      {status === "success" && emergency && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
          {emergencyItems.map((item) => {
            const Icon = item.icon;
            const number = emergency[item.key];

            return (
              <div
                key={item.key}
                className="group relative flex flex-col justify-between pt-3 transition-transform duration-200 hover:-translate-y-0.5"
              >
                {/* Structural Color Bar Accent */}
                <div
                  className={`absolute bottom-0 cursor-pointer left-0 h-0.75 w-8 transition-all duration-300 group-hover:w-full ${item.barColor}`}
                />

                {/* Service Label & Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-slate-400 transition-colors group-hover:text-[#022A5A]">
                    {item.label}
                  </span>
                  <Icon
                    size={16}
                    strokeWidth={2.2}
                    className={`transition-colors ${item.textColor}`}
                    aria-hidden="true"
                  />
                </div>

                {/* Big Numerals with Mobile-Optimized Instant Dial */}
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-mono text-3xl font-black tracking-tighter text-[#022A5A] sm:text-4xl">
                    {number ?? "—"}
                  </span>

                  {number && (
                    <a
                      href={`tel:${number}`}
                      aria-label={`Direct call ${item.label}`}
                      className={`inline-flex h-8 items-center gap-1.5 px-3 font-mono text-[11px] font-bold uppercase tracking-wider text-white transition-opacity active:opacity-80 ${item.ctaBg}`}
                    >
                      <Phone size={12} strokeWidth={2.5} aria-hidden="true" />
                      <span>Dial</span>
                    </a>
                  )}
                </div>

                {/* Minimalist Baseline Track */}
                <div className="mt-4 h-px w-full bg-slate-100 transition-colors group-hover:bg-slate-300" />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
