import { useMemo } from "react";

import { evaluatePassword } from "@/lib/auth/passwordRules";
import type { PasswordMeterResult } from "@/types/password";

export function usePasswordMeter(password: string): PasswordMeterResult {
  return useMemo(() => evaluatePassword(password), [password]);
}
