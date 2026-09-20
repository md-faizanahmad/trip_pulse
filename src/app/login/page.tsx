"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const data: {
        user?: {
          id: string;
          name: string;
          email: string;
        };
        error?: string;
      } = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to log in.");
        return;
      }

      await refreshUser();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/brand/trippulse-logo.png"
            alt="TripPulse"
            width={150}
            height={50}
            className="mx-auto"
            priority
          />

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-950">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Log in to continue to TripPulse.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
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
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-(--destination-primary) focus:ring-2 focus:ring-(--destination-primary)/20 disabled:cursor-not-allowed disabled:bg-zinc-50"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-zinc-800"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-(--destination-primary) focus:ring-2 focus:ring-(--destination-primary)/20 disabled:cursor-not-allowed disabled:bg-zinc-50"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-(--destination-primary) px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Your session is secured with an HTTP-only cookie.
        </p>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-600 transition-colors hover:text-(--destination-primary)"
          >
            Back to TripPulse
          </Link>
        </div>
      </div>
    </main>
  );
}
