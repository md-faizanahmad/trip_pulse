"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  AuthContext,
  type AuthContextValue,
  type AuthUser,
} from "@/context/AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data: { user: AuthUser } = await response.json();

      setUser(data.user);
    } catch (error) {
      console.error("Failed to check authentication:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    async function loadUser() {
      try {
        await refreshUser();
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed.");
    }

    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      refreshUser,
      logout,
    }),
    [user, isLoading, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
