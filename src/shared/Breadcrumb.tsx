import Link from "next/link";

type BreadcrumbProps = {
  destination: string;
};

export default function Breadcrumb({ destination }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-zinc-500">
        <li>
          <Link href="/" className="transition hover:text-zinc-900">
            Home
          </Link>
        </li>

        <li aria-hidden="true">/</li>

        <li aria-current="page" className="text-zinc-900">
          {destination}
        </li>
      </ol>
    </nav>
  );
}
