import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { oauthAccounts, users } from "@/db/schema";
import { createSession } from "@/lib/auth/session";
import { getGoogleUser } from "@/lib/auth/google-oauth";

function redirectToLogin(origin: string, error: string) {
  return NextResponse.redirect(new URL(`/login?error=${error}`, origin));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return redirectToLogin(url.origin, "google_cancelled");
  }

  if (!code) {
    return redirectToLogin(url.origin, "google_code_missing");
  }

  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ?? `${url.origin}/api/auth/google/callback`;

  try {
    const googleUser = await getGoogleUser(code, redirectUri);
    const googleEmail = googleUser.email.trim().toLowerCase();

    const [existingOAuthAccount] = await db
      .select({
        userId: oauthAccounts.userId,
      })
      .from(oauthAccounts)
      .where(
        and(
          eq(oauthAccounts.provider, "google"),
          eq(oauthAccounts.providerAccountId, googleUser.sub),
        ),
      )
      .limit(1);

    let userId: string;

    if (existingOAuthAccount) {
      userId = existingOAuthAccount.userId;
    } else {
      const [existingUser] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, googleEmail))
        .limit(1);

      if (existingUser) {
        return redirectToLogin(url.origin, "google_account_exists");
      }

      const [createdUser] = await db
        .insert(users)
        .values({
          name: googleUser.name?.trim() || googleEmail.split("@")[0],
          email: googleEmail,
          passwordHash: null,
        })
        .returning({ id: users.id });

      if (!createdUser) {
        throw new Error("Failed to create user.");
      }

      userId = createdUser.id;

      await db.insert(oauthAccounts).values({
        userId,
        provider: "google",
        providerAccountId: googleUser.sub,
      });
    }

    const { sessionToken, expiresAt } = await createSession(userId);

    const response = NextResponse.redirect(new URL("/", url.origin));

    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error(
      "Google OAuth callback failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return redirectToLogin(url.origin, "google_failed");
  }
}
