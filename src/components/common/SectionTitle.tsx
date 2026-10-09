import type { LucideIcon } from "lucide-react";

type SectionTitleProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
  description?: string;
  eyebrow?: string;
};

export default function SectionTitle({
  icon: Icon,
  title,
  className = "",
  description = "",
  eyebrow = "",
}: SectionTitleProps) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--destination-secondary)">
          {eyebrow}
        </p>
      )}
      <Icon
        className="h-5 w-5 shrink-0 text-(--destination-primary)"
        aria-hidden="true"
      />

      <h2 className="text-sm font-bold uppercase tracking-widest text-(--destination-text)">
        {title}
      </h2>
      {description && (
        <p className="mt-0.5 text-sm text-(--destination-secondary)">
          {description}
        </p>
      )}
    </div>
  );
}
