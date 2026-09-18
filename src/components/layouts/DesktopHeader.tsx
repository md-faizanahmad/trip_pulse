import Image from "next/image";
import Link from "next/link";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Your List",
    href: "/list",
  },
  {
    label: "Login",
    href: "/login",
  },
];

export default function DesktopHeader() {
  return (
    <header className="hidden border-b border-zinc-200 bg-white md:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="TripPulse home">
          <Image
            src="/brand/trippulse-logo.png"
            alt="TripPulse"
            width={150}
            height={50}
            priority
          />
        </Link>

        <nav aria-label="Desktop navigation">
          <div className="flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 transition-colors hover:text-(--destination-primary)"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
