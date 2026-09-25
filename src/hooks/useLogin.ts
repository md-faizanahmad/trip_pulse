"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function useLogin() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function login(name: string, email: string, password: string) {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
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
        setError(data.error ?? "Unable to continue.");
        return false;
      }

      await refreshUser();

      router.push("/");
      router.refresh();

      return true;
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Something went wrong. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    login,
    error,
    isLoading,
  };
}
