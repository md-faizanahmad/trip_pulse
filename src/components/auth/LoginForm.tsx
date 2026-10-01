"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";
import GoogleLoginButton from "./GoogleLoginButton";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};

export default function LoginForm() {
  const { login, error, isLoading } = useLogin();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [validationError, setValidationError] = useState("");

  function handleChange(field: keyof typeof INITIAL_VALUES, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setValidationError("");
  }

  async function handleSubmit(
    event: Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0],
  ) {
    event.preventDefault();
    setValidationError("");

    const name = values.name.trim();
    const email = values.email.trim().toLowerCase();
    const password = values.password;

    if (!name || !email || !password.trim()) {
      setValidationError("Name, email, and password are required.");
      return;
    }

    await login(name, email, password);
  }

  const formError = validationError || error;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-5 border border-zinc-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-7"
    >
      <FormField
        id="name"
        name="name"
        label="Full Name"
        type="text"
        autoComplete="name"
        placeholder="Your full name"
        value={values.name}
        onChange={(event) => handleChange("name", event.target.value)}
        maxLength={100}
        required
        disabled={isLoading}
      />

      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={(event) => handleChange("email", event.target.value)}
        maxLength={254}
        required
        disabled={isLoading}
      />

      <PasswordField
        value={values.password}
        onChange={(value) => handleChange("password", value)}
        disabled={isLoading}
      />

      {formError && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-medium text-red-700"
        >
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex h-12 w-full items-center justify-center rounded-md bg-(--destination-primary) px-4 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--destination-primary)/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Please wait..." : "Continue"}
      </button>

      <div className="flex items-center gap-4 py-1">
        <div className="h-px flex-1 bg-zinc-200" />
        <span className="text-[11px] font-medium tracking-[0.12em] text-zinc-400">
          OR
        </span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      <GoogleLoginButton />
    </form>
  );
}
