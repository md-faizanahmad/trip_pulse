import { NextResponse } from "next/server";

type GoogleTokenResponse = {
  access_token?: string;
  id_token?: string;
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
    return NextResponse.json(
      {
        error: "Google sign-in was cancelled or denied.",
      },
      { status: 400 },
    );
  }

  if (!code) {
    return NextResponse.json(
      {
        error: "Missing Google authorization code.",
      },
      { status: 400 },
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ?? `${url.origin}/api/auth/google/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      {
        error: "Google OAuth is not configured.",
      },
      { status: 500 },
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

      return NextResponse.json(
        {
          error: "Unable to authenticate with Google.",
        },
        { status: 401 },
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

      return NextResponse.json(
        {
          error: "Unable to retrieve your Google account.",
        },
        { status: 401 },
      );
    }

    if (!googleUser.sub || !googleUser.email || !googleUser.email_verified) {
      return NextResponse.json(
        {
          error: "Your Google account could not be verified.",
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "Google authentication successful.",
      googleUser: {
        id: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name ?? "",
      },
    });
  } catch (error) {
    console.error("Google OAuth callback error:", error);

    return NextResponse.json(
      {
        error: "Unable to complete Google sign-in.",
      },
      { status: 500 },
    );
  }
}
