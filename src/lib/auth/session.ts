import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";

const SESSION_TOKEN_LENGTH = 32;

export function createSessionToken(): string {
  return randomBytes(SESSION_TOKEN_LENGTH).toString("hex");
}
export function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
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
