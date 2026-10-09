import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SectionTitleProps = {
  icon?: LucideIcon;
  iconContent?: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  iconVariant?: "default" | "circle";
};

export default function SectionTitle({
  icon: Icon,
  iconContent,
  eyebrow,
  title,
  description,
  className = "",
  iconVariant = "default",
}: SectionTitleProps) {
  const hasIcon = Boolean(Icon || iconContent);

  return (
    <div className={`min-w-0 ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--destination-secondary)">
          {eyebrow}
        </p>
      )}

      <div className="flex min-w-0 items-center gap-3">
        {hasIcon && (
          <div
            className={
              iconVariant === "circle"
                ? "flex h-10 w-10 shrink-0 items-center justify-center  text-(--destination-primary)"
                : "flex shrink-0 items-center justify-center text-(--destination-primary)"
            }
          >
            {iconContent ??
              (Icon && <Icon className="h-5 w-5" aria-hidden="true" />)}
          </div>
        )}

        <div className="min-w-0">
          <h2 className="text-base font-semibold text-(--destination-text) sm:text-lg">
            {title}
          </h2>

          {description && (
            <p className="mt-0.5 text-sm text-(--destination-secondary)">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
