"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type LoginStep = "email" | "otp" | "name" | "logged-in";

const STATIC_OTP = "123456";

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setStep("otp");
  }

  function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (otp !== STATIC_OTP) {
      setError("The code is incorrect. Try again.");
      return;
    }

    setStep("name");
  }

  function handleNameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Enter your name.");
      return;
    }

    setStep("logged-in");
  }

  function handleBack() {
    setError("");

    if (step === "otp") {
      setStep("email");
      return;
    }

    if (step === "name") {
      setStep("otp");
      return;
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-4 py-10 pb-24 md:min-h-[calc(100vh-4rem)] md:pb-10">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-10 flex justify-center">
          <Image
            src="/brand/trippulse-logo.png"
            alt="TripPulse"
            width={150}
            height={50}
            priority
          />
        </div>

        {/* Email */}
        {step === "email" && (
          <section>
            <div className="mb-7">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-(--destination-primary)">
                Account
              </span>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950">
                Sign in to TripPulse
              </h1>

              <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-500">
                Enter your email to continue.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit}>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Email
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoFocus
                  className="mt-1.5 h-12 w-full border border-zinc-300 bg-white px-3 font-mono text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-(--destination-primary)"
                />
              </label>

              {error && <ErrorMessage message={error} />}

              <button
                type="submit"
                className="mt-4 h-12 w-full bg-(--destination-primary) px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-(--destination-secondary) active:bg-(--destination-secondary)"
              >
                Continue
              </button>
            </form>
          </section>
        )}

        {/* OTP */}
        {step === "otp" && (
          <section>
            <button
              type="button"
              onClick={handleBack}
              className="mb-6 text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-950"
            >
              ← Change email
            </button>

            <div className="mb-7">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-(--destination-primary)">
                Verification
              </span>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950">
                Check your email
              </h1>

              <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-500">
                We sent a verification code to{" "}
                <span className="font-bold text-zinc-700">{email}</span>.
              </p>
            </div>

            <form onSubmit={handleOtpSubmit}>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Verification Code
                </span>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="000000"
                  autoComplete="one-time-code"
                  autoFocus
                  className="mt-1.5 h-12 w-full border border-zinc-300 bg-white px-3 text-center font-mono text-lg font-bold tracking-[0.35em] text-zinc-950 outline-none transition-colors placeholder:text-zinc-300 focus:border-(--destination-primary)"
                />
              </label>

              <p className="mt-2 font-mono text-[10px] font-medium text-zinc-400">
                Demo code: {STATIC_OTP}
              </p>

              {error && <ErrorMessage message={error} />}

              <button
                type="submit"
                className="mt-4 h-12 w-full bg-(--destination-primary) px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-(--destination-secondary) active:bg-(--destination-secondary)"
              >
                Verify
              </button>
            </form>
          </section>
        )}

        {/* Name */}
        {step === "name" && (
          <section>
            <button
              type="button"
              onClick={handleBack}
              className="mb-6 text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-950"
            >
              ← Back
            </button>

            <div className="mb-7">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-(--destination-primary)">
                Profile
              </span>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950">
                What should we call you?
              </h1>

              <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-500">
                Add your name to finish setting up your TripPulse account.
              </p>
            </div>

            <form onSubmit={handleNameSubmit}>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Name
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  autoFocus
                  className="mt-1.5 h-12 w-full border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-(--destination-primary)"
                />
              </label>

              {error && <ErrorMessage message={error} />}

              <button
                type="submit"
                className="mt-4 h-12 w-full bg-(--destination-primary) px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-(--destination-secondary) active:bg-(--destination-secondary)"
              >
                Continue
              </button>
            </form>
          </section>
        )}

        {/* Logged In */}
        {step === "logged-in" && (
          <section className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-(--destination-primary)/30 bg-(--destination-primary)/10 text-(--destination-primary)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <span className="mt-5 block font-mono text-[10px] font-bold uppercase tracking-widest text-(--destination-primary)">
              Account Ready
            </span>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950">
              Hello, {name}
            </h1>

            <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-500">
              You&apos;re now signed in to TripPulse.
            </p>
          </section>
        )}

        {/* Step Indicator */}
        {step !== "logged-in" && (
          <div className="mt-10 flex items-center justify-center gap-1.5">
            {[1, 2, 3].map((item) => {
              const stepNumber = step === "email" ? 1 : step === "otp" ? 2 : 3;

              return (
                <span
                  key={item}
                  className={`h-1 w-8 ${
                    item <= stepNumber
                      ? "bg-(--destination-primary)"
                      : "bg-zinc-200"
                  }`}
                  aria-hidden="true"
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="mt-2 text-[11px] font-semibold text-red-600">{message}</p>
  );
}
