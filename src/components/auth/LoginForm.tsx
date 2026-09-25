"use client";

import { FormEvent, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import PasswordField from "@/components/auth/PasswordField";

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
      className="space-y-5 rounded-sm border border-zinc-200 p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-zinc-800"
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
          placeholder="Your Full Name"
          disabled={isLoading}
          required
          className="w-full rounded-sm border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-(--destination-primary) focus:ring-2 focus:ring-(--destination-primary)/20 disabled:cursor-not-allowed disabled:bg-zinc-50"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-zinc-800"
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
          className="w-full rounded-sm border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-(--destination-primary) focus:ring-2 focus:ring-(--destination-primary)/20 disabled:cursor-not-allowed disabled:bg-zinc-50"
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
          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
        >
          {formError}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-xl bg-(--destination-primary) px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Please wait..." : "Continue"}
      </button>
    </form>
  );
}
