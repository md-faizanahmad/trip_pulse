import { NextRequest, NextResponse } from "next/server";
import { getEmergencyNumbers } from "@/utils/safety";

export async function GET(request: NextRequest) {
  const countryCode = request.nextUrl.searchParams
    .get("countryCode")
    ?.trim()
    .toUpperCase();

  if (!countryCode || !/^[A-Z]{2}$/.test(countryCode)) {
    return NextResponse.json(
      { error: "A valid country code is required." },
      { status: 400 },
    );
  }

  const emergency = getEmergencyNumbers(countryCode);

  if (!emergency) {
    return NextResponse.json(
      { error: "Emergency information is unavailable for this country." },
      { status: 404 },
    );
  }

  return NextResponse.json({ emergency });
}
