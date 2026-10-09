import type { LucideIcon } from "lucide-react";

type SectionTitleProps = {
  icon: LucideIcon;
  title: string;
  className?: string;
};

export default function SectionTitle({
  icon: Icon,
  title,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <Icon
        className="h-5 w-5 shrink-0 text-(--destination-primary)"
        aria-hidden="true"
      />

      <h2 className="text-sm font-bold uppercase tracking-widest text-(--destination-text)">
        {title}
      </h2>
    </div>
  );
}
