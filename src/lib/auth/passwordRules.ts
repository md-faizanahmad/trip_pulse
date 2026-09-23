import type {
  PasswordMeterResult,
  PasswordRequirement,
  PasswordStrength,
} from "@/types/password";

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_REQUIREMENTS = [
  {
    label: `At least ${PASSWORD_MIN_LENGTH} characters`,
    test: (password: string) => password.length >= PASSWORD_MIN_LENGTH,
  },
  {
    label: "One uppercase letter",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "One lowercase letter",
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    label: "One number",
    test: (password: string) => /\d/.test(password),
  },
  {
    label: "One special character",
    test: (password: string) => /[^A-Za-z0-9]/.test(password),
  },
] as const;

export function getPasswordRequirements(
  password: string,
): PasswordRequirement[] {
  return PASSWORD_REQUIREMENTS.map(({ label, test }) => ({
    label,
    met: test(password),
  }));
}

export function getPasswordStrength(score: number): PasswordStrength {
  if (score >= 4) {
    return "strong";
  }

  if (score >= 3) {
    return "medium";
  }

  return "weak";
}

export function evaluatePassword(password: string): PasswordMeterResult {
  const requirements = getPasswordRequirements(password);

  const score = requirements.reduce(
    (total, requirement) => total + Number(requirement.met),
    0,
  );

  return {
    score,
    strength: getPasswordStrength(score),
    requirements,
  };
}

export function isPasswordValid(password: string): boolean {
  return getPasswordRequirements(password).every(
    (requirement) => requirement.met,
  );
}
