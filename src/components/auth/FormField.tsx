import type { InputHTMLAttributes, ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  maxLength: number;
  suffix?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "maxLength">;

export default function FormField({
  id,
  label,
  maxLength,
  suffix,
  className = "",
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-800">
        {label}
      </label>

      <div className={suffix ? "relative" : undefined}>
        <input
          {...inputProps}
          id={id}
          maxLength={maxLength}
          className={`h-12 w-full rounded-md border border-zinc-300 bg-white px-3.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-(--destination-primary) focus:ring-2 focus:ring-(--destination-primary)/15 disabled:cursor-not-allowed disabled:bg-zinc-50 ${suffix ? "pr-11" : ""} ${className}`}
        />

        {suffix}
      </div>
    </div>
  );
}
