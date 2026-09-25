import Link from "next/link";

type BreadcrumbProps = {
  destination: string;
};

export default function Breadcrumb({ destination }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full  bg-[#FFFFFF] px-4 py-2.5 sm:px-6"
    >
      <ol className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider">
        {/* Home Anchor with Subtle Leading Marker */}
        <li className="flex items-center gap-1.5 shrink-0">
          <Link
            href="/"
            className="text-slate-400 transition-colors hover:text-[#008EEB]"
          >
            Home
          </Link>
        </li>

        {/* Minimalist Delimiter */}
        <li aria-hidden="true" className="select-none text-slate-300">
          /
        </li>

        {/* Current Active Page with Truncation on Small Screens */}
        <li
          aria-current="page"
          className="min-w-0 cursor-pointer truncate text-[#1058b0]"
          title={destination}
        >
          {destination}
        </li>
      </ol>
    </nav>
  );
}
