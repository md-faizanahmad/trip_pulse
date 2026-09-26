import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

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

    const { sessionToken, expiresAt } = await createSession(user.id);

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
