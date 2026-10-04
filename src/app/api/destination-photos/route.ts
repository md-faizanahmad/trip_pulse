import { NextRequest, NextResponse } from "next/server";

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

export async function GET(request: NextRequest) {
  const destination = request.nextUrl.searchParams.get("destination");

  if (!destination?.trim()) {
    return NextResponse.json(
      { error: "Destination is required." },
      { status: 400 },
    );
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey || accessKey === "your_access_key_here") {
    return NextResponse.json(
      { error: "Unsplash API is not configured." },
      { status: 500 },
    );
  }

  try {
    const url = new URL(UNSPLASH_API_URL);
    url.searchParams.set("query", destination.trim());
    url.searchParams.set("per_page", "8");
    url.searchParams.set("orientation", "landscape");

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch destination photos." },
        { status: response.status === 429 ? 429 : 502 },
      );
    }

    const data = await response.json();

    const photos = data.results.map(
      (photo: {
        id: string;
        alt_description: string | null;
        urls: { regular: string; small: string };
        links: { html: string };
        user: { name: string; links: { html: string } };
      }) => ({
        id: photo.id,
        description: photo.alt_description,
        imageUrl: photo.urls.regular,
        thumbnailUrl: photo.urls.small,
        photoUrl: photo.links.html,
        photographerName: photo.user.name,
        photographerUrl: photo.user.links.html,
      }),
    );

    return NextResponse.json({ photos });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching photos." },
      { status: 500 },
    );
  }
}
