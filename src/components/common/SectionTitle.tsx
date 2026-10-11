import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SectionTitleProps = {
  icon?: LucideIcon;
  iconContent?: ReactNode;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
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
            className={`section-icon-shine shrink-0 text-(--destination-primary) ${
              iconVariant === "circle"
                ? "flex h-10 w-10 items-center justify-center"
                : "flex items-center justify-center"
            }`}
          >
            {iconContent ??
              (Icon && <Icon className="h-5 w-5" aria-hidden="true" />)}
          </div>
        )}

        <div className="min-w-0">
          <h2 className="animate-section-title text-base font-semibold text-(--destination-text) motion-reduce:animate-none sm:text-lg">
            {title}
          </h2>

          {description && (
            <div className="mt-1 text-sm text-(--destination-secondary)">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
