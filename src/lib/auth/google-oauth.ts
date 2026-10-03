const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

export type GoogleUserInfo = {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
};

export async function getGoogleUser(
  code: string,
  redirectUri: string,
): Promise<GoogleUserInfo> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth is not configured.");
  }

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
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
    signal: AbortSignal.timeout(10_000),
  });

  const tokenData: GoogleTokenResponse = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    throw new Error("Google token exchange failed.");
  }

  const userResponse = await fetch(GOOGLE_USER_INFO_URL, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!userResponse.ok) {
    throw new Error("Failed to retrieve Google user information.");
  }

  const userData: unknown = await userResponse.json();

  if (
    typeof userData !== "object" ||
    userData === null ||
    !("sub" in userData) ||
    typeof userData.sub !== "string" ||
    !("email" in userData) ||
    typeof userData.email !== "string" ||
    !("email_verified" in userData) ||
    userData.email_verified !== true
  ) {
    throw new Error("Google profile is missing verified account details.");
  }

  return {
    sub: userData.sub,
    email: userData.email,
    email_verified: true,
    name:
      "name" in userData && typeof userData.name === "string"
        ? userData.name
        : undefined,
  };
}
