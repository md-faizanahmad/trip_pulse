export type PasswordStrength = "weak" | "medium" | "strong";

export type PasswordRequirement = {
  label: string;
  met: boolean;
};

export type PasswordMeterResult = {
  strength: PasswordStrength;
  score: number;
  requirements: PasswordRequirement[];
};
