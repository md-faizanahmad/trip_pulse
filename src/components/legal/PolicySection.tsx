"use client";

import { useState } from "react";

type PolicySection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

const POLICIES: PolicySection[] = [
  {
    id: "cookies",
    title: "Cookie Policy & Preferences",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0-4 4v1" />
        <circle cx="7.5" cy="13.5" r=".5" fill="currentColor" />
        <circle cx="12" cy="17" r=".5" fill="currentColor" />
        <circle cx="16.5" cy="11.5" r=".5" fill="currentColor" />
      </svg>
    ),
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-zinc-600">
        <p>
          We use strictly necessary cookies to make our platform work. We&apos;d
          also like to set optional analytics and performance cookies to help us
          improve it. We won&apos;t set optional cookies unless you enable them.
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Essential Cookies:</strong> Required for core site
            functionality, security, and network management. You may disable
            these by changing your browser settings, but this may affect how the
            website functions.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how visitors
            interact with our platform by collecting and reporting information
            anonymously.
          </li>
          <li>
            <strong>Session Storage:</strong> Used to securely maintain your
            active login state and temporary preferences while navigating the
            platform.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-zinc-600">
        <p>
          Your privacy is critically important to us. This policy describes what
          information we collect, how it is used and shared, and your choices
          regarding this information.
        </p>
        <p>
          We collect personal data you provide to us directly (such as your
          name, email address, and saved locations) to deliver our services. We
          do not sell your personal data to third-party data brokers.
        </p>
        <p>
          Depending on your location (e.g., GDPR in Europe, CCPA in California),
          you may have the right to access, correct, delete, or port your
          personal data. Please contact our support team to exercise these
          rights.
        </p>
      </div>
    ),
  },
  {
    id: "terms",
    title: "Terms of Service",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-zinc-600">
        <p>
          By accessing and using our platform, you agree to be bound by these
          Terms of Service. If you disagree with any part of the terms, you may
          not access the service.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account. We reserve the right to terminate accounts that violate our
          community guidelines or terms.
        </p>
      </div>
    ),
  },
  {
    id: "security",
    title: "Data Processing & Security",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-zinc-600">
        <p>
          We implement industry-standard security measures, including end-to-end
          encryption for sensitive data transfers and secure cloud
          infrastructure, to protect your personal information against
          unauthorized access, alteration, or destruction.
        </p>
        <p>
          However, no method of transmission over the internet or method of
          electronic storage is 100% secure. While we strive to use commercially
          acceptable means to protect your personal data, we cannot guarantee
          its absolute security.
        </p>
      </div>
    ),
  },
];

export default function PolicySection() {
  const [openSection, setOpenSection] = useState<string | null>("cookies");

  const toggleSection = (id: string) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-zinc-50/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        {/* Page Header */}
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Legal & Privacy Center
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Everything you need to know about how we handle your data and
            protect your privacy.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col gap-3">
          {POLICIES.map((policy) => {
            const isOpen = openSection === policy.id;

            return (
              <div
                key={policy.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-(--destination-primary)/30 bg-white shadow-md"
                    : "border-zinc-200 bg-white shadow-sm hover:border-zinc-300"
                }`}
              >
                {/* Accordion Header / Trigger */}
                <button
                  type="button"
                  onClick={() => toggleSection(policy.id)}
                  className="flex w-full items-center justify-between p-5 text-left outline-none transition-colors sm:p-6"
                  aria-expanded={isOpen}
                  aria-controls={`content-${policy.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? "bg-(--destination-primary)/10 text-(--destination-primary)"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {policy.icon}
                    </div>
                    <h2
                      className={`text-base font-semibold transition-colors duration-300 ${
                        isOpen
                          ? "text-(--destination-primary)"
                          : "text-zinc-900"
                      }`}
                    >
                      {policy.title}
                    </h2>
                  </div>

                  <div
                    className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "bg-(--destination-primary)/10 text-(--destination-primary) rotate-180"
                        : "text-zinc-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </button>

                {/* Accordion Content (Smooth Grid Animation) */}
                <div
                  id={`content-${policy.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-zinc-100 px-5 pb-6 pt-4 sm:px-6 sm:pb-7">
                      {policy.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
