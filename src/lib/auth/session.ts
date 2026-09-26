import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";

const SESSION_TOKEN_LENGTH = 32;
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

export function createSessionToken(): string {
  return randomBytes(SESSION_TOKEN_LENGTH).toString("hex");
}
export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string) {
  const sessionToken = createSessionToken();
  const tokenHash = hashSessionToken(sessionToken);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.insert(sessions).values({
    userId,
    tokenHash,
    expiresAt,
  });

  return {
    sessionToken,
    expiresAt,
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return null;
  }

  const tokenHash = hashSessionToken(sessionToken);
  const [result] = await db
    .select({
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
      expiresAt: sessions.expiresAt,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.tokenHash, tokenHash))
    .limit(1);

  if (!result) {
    return null;
  }

  if (result.expiresAt <= new Date()) {
    return null;
  }

  return result.user;
}
