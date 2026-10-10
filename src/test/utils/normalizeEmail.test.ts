import { describe, expect, it } from "vitest";
import {
  normalizeEmail,
  normalizeName,
  sanitizeEmailInput,
  sanitizeNameInput,
} from "@/validation/auth-validation";

describe("normalizeEmail", () => {
  it("trims whitespace and converts email to lowercase", () => {
    expect(normalizeEmail("  USER@EXAMPLE.COM  ")).toBe("user@example.com");
  });

  it("preserves an already normalized email", () => {
    expect(normalizeEmail("user@example.com")).toBe("user@example.com");
  });

  it("handles an empty string", () => {
    expect(normalizeEmail("")).toBe("");
  });

  it("handles whitespace-only input", () => {
    expect(normalizeEmail("   ")).toBe("");
  });

  it("normalizes uppercase emails with surrounding whitespace", () => {
    expect(normalizeEmail("  Ahmad@Example.COM  ")).toBe("ahmad@example.com");
  });
});

describe("sanitizeEmailInput", () => {
  it("removes unsupported characters", () => {
    expect(sanitizeEmailInput("user name<>@mail.com")).toBe(
      "username@mail.com",
    );
  });
});

describe("sanitizeNameInput", () => {
  it("removes unsupported characters from a name", () => {
    expect(sanitizeNameInput("Ahmad123@")).toBe("Ahmad");
  });
});

describe("normalizeName", () => {
  it("trims and collapses multiple spaces in a name", () => {
    expect(normalizeName("  Ahmad    Khan  ")).toBe("Ahmad Khan");
  });

  it("preserves Unicode characters in names", () => {
    expect(normalizeName("  राहुल   कुमार  ")).toBe("राहुल कुमार");
  });
});
