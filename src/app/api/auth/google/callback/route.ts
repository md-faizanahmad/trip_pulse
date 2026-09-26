import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { oauthAccounts, users } from "@/db/schema";
import { createSession } from "@/lib/auth/session";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL("/login?error=google_cancelled", url.origin),
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=google_code_missing", url.origin),
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ?? `${url.origin}/api/auth/google/callback`;

  if (!clientId || !clientSecret) {
    console.error("Google OAuth environment variables are missing.");

    return NextResponse.redirect(
      new URL("/login?error=google_config", url.origin),
    );
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    });

    const tokenData: GoogleTokenResponse = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Google token exchange failed:", tokenData);

      return NextResponse.redirect(
        new URL("/login?error=google_auth_failed", url.origin),
      );
    }

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        cache: "no-store",
      },
    );

    const googleUser: GoogleUserInfo = await userResponse.json();

    if (!userResponse.ok) {
      console.error("Google user info request failed:", googleUser);

      return NextResponse.redirect(
        new URL("/login?error=google_user_failed", url.origin),
      );
    }

    if (!googleUser.sub || !googleUser.email || !googleUser.email_verified) {
      return NextResponse.redirect(
        new URL("/login?error=google_unverified", url.origin),
      );
    }

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
        .select()
        .from(users)
        .where(eq(users.email, googleEmail))
        .limit(1);

      if (existingUser) {
        return NextResponse.redirect(
          new URL("/login?error=google_account_exists", url.origin),
        );
      }

      const [createdUser] = await db
        .insert(users)
        .values({
          name: googleUser.name?.trim() || googleEmail.split("@")[0],
          email: googleEmail,
          passwordHash: null,
        })
        .returning({
          id: users.id,
        });

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
    console.error("Google OAuth callback error:", error);

    return NextResponse.redirect(
      new URL("/login?error=google_failed", url.origin),
    );
  }
}
