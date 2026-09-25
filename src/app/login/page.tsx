import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
            Welcome to TripPulse
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Continue with your account or create one instantly.
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-xs text-zinc-500">
          New accounts are created automatically. Your session is secured with
          an HTTP-only cookie.
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
