"use client";

import Link from "next/link";

type BreadcrumbProps = {
  destination: string;
};

export default function Breadcrumb({ destination }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full px-4 py-3 sm:px-6">
      <ol className="flex items-center gap-2 text-sm font-medium text-zinc-500">
        {/* Home Anchor */}
        <li className="flex shrink-0 items-center">
          <Link href="/" className="transition-colors hover:text-zinc-900">
            Home
          </Link>
        </li>

        {/* Premium Chevron Delimiter */}
        <li aria-hidden="true" className="flex items-center text-zinc-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </li>

        {/* Current Active Page */}
        <li
          aria-current="page"
          className="min-w-0 cursor-default truncate font-semibold text-(--destination-primary)"
          title={destination}
        >
          {destination}
        </li>
      </ol>
    </nav>
  );
}
