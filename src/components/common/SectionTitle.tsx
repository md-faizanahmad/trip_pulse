import type { LucideIcon } from "lucide-react";

type SectionTitleProps = {
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export default function SectionTitle({
  icon: Icon,
  eyebrow,
  title,
  description,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`min-w-0 ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--destination-secondary)">
          {eyebrow}
        </p>
      )}

      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <Icon
            className="mt-0.5 h-5 w-5 shrink-0 text-(--destination-primary)"
            aria-hidden="true"
          />
        )}

        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight text-(--destination-primary) sm:text-xl">
            {title}
          </h2>

          {description && (
            <p className="mt-2 max-w-md text-sm leading-6 text-(--destination-secondary)">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
