"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full px-4 py-3 sm:px-6">
      <ol className="flex items-center gap-2 text-sm font-medium text-zinc-500">
        {/* Home */}
        <li className="flex shrink-0 items-center">
          <Link href="/" className="transition-colors hover:text-zinc-900">
            Home
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-2"
            >
              <ChevronRight
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-zinc-300"
                strokeWidth={2.5}
              />

              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="min-w-0 truncate font-semibold text-(--destination-primary)"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="min-w-0 truncate transition-colors hover:text-zinc-900"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
