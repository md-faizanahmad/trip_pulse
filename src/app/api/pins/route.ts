import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/session";
import { getUserPins } from "@/services/pins.service";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    const pins = await getUserPins(user.id);

    return NextResponse.json(pins);
  } catch (error) {
    console.error("Get pins error:", error);

    return NextResponse.json(
      { error: "Unable to load your list." },
      { status: 500 },
    );
  }
}
