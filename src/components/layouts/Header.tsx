// src/components/Header.tsx

import Link from "next/link";

const navigation = [
  { label: "Explore", href: "/explore" },
  { label: "Trips", href: "/trips" },
  { label: "About", href: "/about" },
];

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-zinc-900"
        >
          TripPulse
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
