import Image from "next/image";

export default function GoogleLoginButton() {
  return (
    <a
      href="/api/auth/google"
      target="_blank"
      className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
    >
      <Image
        src="https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5"
      />
      <span>Continue with Google</span>
    </a>
  );
}
