"use client";

import Image from "next/image";
import { useState } from "react";

export default function GoogleLoginButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-3  px-4 py-3 text-sm font-semibold text-zinc-800 "
      >
        <Image
          src="https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
          alt="Google"
          width={20}
          height={20}
          className="h-5 w-5"
        />

        <span>Sign in with Google</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="google-login-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <h2
              id="google-login-title"
              className="text-lg font-bold text-zinc-950"
            >
              Google Login
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Google authentication is coming soon.
            </p>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-5 w-full rounded-xl bg-(--destination-primary) px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
