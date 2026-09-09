import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        <Link
          href="/"
          aria-label="TripPulse home"
          className="text-xl font-semibold tracking-tight text-zinc-900"
        >
          TripPulse
        </Link>
      </div>
    </header>
  );
}
