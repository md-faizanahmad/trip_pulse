import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSessionToken, hashSessionToken } from "@/lib/auth/session";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const password = typeof body.password === "string" ? body.password : "";

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name, email, and password are required.",
        },
        { status: 400 },
      );
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let user;

    if (existingUser) {
      const passwordValid = await verifyPassword(
        password,
        existingUser.passwordHash,
      );

      if (!passwordValid) {
        return NextResponse.json(
          {
            error: "Invalid email or password.",
          },
          { status: 401 },
        );
      }

      user = existingUser;
    } else {
      const passwordHash = await hashPassword(password);

      const [createdUser] = await db
        .insert(users)
        .values({
          name,
          email,
          passwordHash,
        })
        .returning();

      user = createdUser;
    }

    const sessionToken = createSessionToken();
    const tokenHash = hashSessionToken(sessionToken);
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    await db.insert(sessions).values({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error("Authentication error:", error);

    return NextResponse.json(
      {
        error: "Unable to authenticate.",
      },
      { status: 500 },
    );
  }
}
