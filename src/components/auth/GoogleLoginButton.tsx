"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  function handleGoogleLogin() {
    router.push("/api/auth/google");
  }

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-800"
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
  );
}
