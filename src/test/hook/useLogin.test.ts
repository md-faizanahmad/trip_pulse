import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useLogin } from "@/hooks/useLogin";

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  refresh: vi.fn(),
  refreshUser: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mocks.push,
    refresh: mocks.refresh,
  }),
}));

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    refreshUser: mocks.refreshUser,
  }),
}));

describe("useLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.refreshUser.mockResolvedValue(undefined);
  });

  it("authenticates successfully and redirects home", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          user: {
            id: "user-1",
            name: "Ahmad Khan",
            email: "ahmad@example.com",
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const { result } = renderHook(() => useLogin());

    let success: boolean | undefined;

    await act(async () => {
      success = await result.current.login(
        "Ahmad Khan",
        "ahmad@example.com",
        "Password123!",
      );
    });

    expect(success).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/authenticate",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          name: "Ahmad Khan",
          email: "ahmad@example.com",
          password: "Password123!",
        }),
      }),
    );
    expect(mocks.refreshUser).toHaveBeenCalledOnce();
    expect(mocks.push).toHaveBeenCalledWith("/");
    expect(mocks.refresh).toHaveBeenCalledOnce();

    fetchMock.mockRestore();
  });
});

it("shows an error when credentials are incorrect", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ error: "Invalid email or password." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }),
  );

  const { result } = renderHook(() => useLogin());

  let success: boolean | undefined;

  await act(async () => {
    success = await result.current.login(
      "Ahmad Khan",
      "ahmad@example.com",
      "WrongPassword!",
    );
  });

  expect(success).toBe(false);
  expect(result.current.error).toBe("Invalid email or password.");
  expect(mocks.push).not.toHaveBeenCalled();
});
