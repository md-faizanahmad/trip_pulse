import { NextRequest, NextResponse } from "next/server";

type FrankfurterRateResponse = {
  date?: string;
  base?: string;
  quote?: string;
  rate?: number;
  message?: string;
};

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from")?.trim().toUpperCase();

  const to = request.nextUrl.searchParams.get("to")?.trim().toUpperCase();

  if (!from || !to) {
    return NextResponse.json(
      { error: "From and to currencies are required." },
      { status: 400 },
    );
  }

  if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to)) {
    return NextResponse.json(
      { error: "Currency codes must be 3 letters." },
      { status: 400 },
    );
  }

  if (from === to) {
    return NextResponse.json({
      base: from,
      quote: to,
      rate: 1,
      date: null,
    });
  }

  const url = `https://api.frankfurter.dev/v2/rate/${encodeURIComponent(
    from,
  )}/${encodeURIComponent(to)}`;

  try {
    const response = await fetch(url);

    const data: FrankfurterRateResponse = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.message ?? "Currency service is currently unavailable.",
        },
        { status: 502 },
      );
    }

    if (
      !data.base ||
      !data.quote ||
      typeof data.rate !== "number" ||
      !Number.isFinite(data.rate)
    ) {
      return NextResponse.json(
        { error: "Currency rate data is unavailable." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      base: data.base,
      quote: data.quote,
      rate: data.rate,
      date: data.date ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch currency rate." },
      { status: 502 },
    );
  }
}
