"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PasswordMeter from "@/components/auth/PasswordMeter";

type PasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function PasswordField({
  value,
  onChange,
  disabled = false,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor="password"
        className="mb-2 block text-sm font-semibold text-zinc-800"
      >
        Password
      </label>

      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter your password"
          disabled={disabled}
          required
          className="w-full rounded-xl border border-zinc-300 px-4 py-3 pr-11 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-(--destination-primary) focus:ring-2 focus:ring-(--destination-primary)/20 disabled:cursor-not-allowed disabled:bg-zinc-50"
        />

        <button
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="mt-3">
        <PasswordMeter password={value} />
      </div>
    </div>
  );
}
