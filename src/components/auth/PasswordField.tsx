"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormField from "@/components/auth/FormField";
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
      <FormField
        id="password"
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter your password"
        maxLength={128}
        disabled={disabled}
        required
        suffix={
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--destination-primary)/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        }
      />

      <div className="mt-3">
        <PasswordMeter password={value} />
      </div>
    </div>
  );
}
