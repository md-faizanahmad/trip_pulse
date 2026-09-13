import { NextRequest, NextResponse } from "next/server";

type WikimediaPage = {
  imageinfo?: {
    thumburl?: string;
  }[];
};

type WikimediaResponse = {
  query?: {
    pages?: Record<string, WikimediaPage>;
  };
};

const WIKIMEDIA_API_URL = "https://commons.wikimedia.org/w/api.php";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim();

  if (!query) {
    return NextResponse.json(
      { error: "Image query is required." },
      { status: 400 },
    );
  }

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "1",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "800",
    format: "json",
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(`${WIKIMEDIA_API_URL}?${params.toString()}`, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Image service is currently unavailable." },
        { status: 502 },
      );
    }

    const data: WikimediaResponse = await response.json();
    const pages = Object.values(data.query?.pages ?? {});
    const imageUrl = pages[0]?.imageinfo?.[0]?.thumburl ?? null;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Image service timed out." },
        { status: 504 },
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch place image." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
