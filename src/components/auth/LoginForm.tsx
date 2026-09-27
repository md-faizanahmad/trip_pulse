"use client";

import { FormEvent, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import PasswordField from "@/components/auth/PasswordField";
import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginForm() {
  const { login, error, isLoading } = useLogin();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError("");

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
      setValidationError("Name, email, and password are required.");
      return;
    }

    await login(normalizedName, normalizedEmail, password);
  }

  const formError = validationError || error;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-5 border border-zinc-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-7"
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-zinc-800"
        >
          Full Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your full name"
          disabled={isLoading}
          required
          className="h-12 w-full rounded-md border border-zinc-300 bg-white px-3.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-(--destination-primary) focus:ring-2 focus:ring-(--destination-primary)/15 disabled:cursor-not-allowed disabled:bg-zinc-50"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-800"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          disabled={isLoading}
          required
          className="h-12 w-full rounded-md border border-zinc-300 bg-white px-3.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-(--destination-primary) focus:ring-2 focus:ring-(--destination-primary)/15 disabled:cursor-not-allowed disabled:bg-zinc-50"
        />
      </div>

      <PasswordField
        value={password}
        onChange={setPassword}
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
