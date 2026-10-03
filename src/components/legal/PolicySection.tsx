"use client";

import { useState } from "react";
import {
  ChevronDown,
  Cookie,
  ShieldCheck,
  Globe,
  FileText,
  LockKeyhole,
  type LucideIcon,
} from "lucide-react";
import policy from "@/data/policy.json";

const icons: Record<string, LucideIcon> = {
  cookie: Cookie,
  shield: ShieldCheck,
  globe: Globe,
  "file-text": FileText,
  lock: LockKeyhole,
};

export default function PolicySection() {
  const [openSection, setOpenSection] = useState<string | null>("privacy");

  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-(--destination-secondary)">
            TripPulse · Transparency
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            {policy.pageTitle}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
            {policy.pageDescription}
          </p>
        </header>

        <div className="divide-y divide-zinc-200 border-y border-zinc-200">
          {policy.sections.map((section, index) => {
            const Icon = icons[section.icon] ?? FileText;
            const isOpen = openSection === section.id;

            return (
              <article key={section.id} className="py-1">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`policy-panel-${section.id}`}
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                  className="flex min-h-20 w-full items-center gap-4 py-4 text-left"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-zinc-900 sm:text-base">
                      {section.title}
                    </span>
                    <span className="mt-1 block text-xs text-zinc-500 sm:text-sm">
                      Section {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>

                  <ChevronDown
                    size={19}
                    aria-hidden="true"
                    className={`shrink-0 text-zinc-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`policy-panel-${section.id}`}
                    className="pb-6 pl-0 sm:pb-7 sm:pl-[3.75rem]"
                  >
                    <div className="space-y-4 text-sm leading-7 text-zinc-600">
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={`${section.id}-paragraph-${index}`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {"items" in section &&
                      section.items &&
                      section.items.length > 0 && (
                        <div className="mt-5 space-y-3">
                          {section.items.map((item) => (
                            <div
                              key={item.title}
                              className="rounded-xl bg-zinc-50 p-4"
                            >
                              <h3 className="text-sm font-semibold text-zinc-800">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm leading-6 text-zinc-600">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                    {"footer" in section && section.footer && (
                      <p className="mt-5 border-l-2 border-zinc-300 pl-4 text-sm leading-6 text-zinc-500">
                        {section.footer}
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <footer className="mt-6 flex items-start gap-3 rounded-xl bg-zinc-50 p-4 sm:mt-8 sm:p-5">
          <ShieldCheck size={19} className="mt-0.5 shrink-0 text-zinc-500" />
          <p className="text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">
            We aim to handle your information responsibly and explain how
            TripPulse works. Please review these sections to understand our
            practices and the role of third-party services.
          </p>
        </footer>
      </div>
    </section>
  );
}
