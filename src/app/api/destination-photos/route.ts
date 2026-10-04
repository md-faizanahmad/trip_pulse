import { NextRequest, NextResponse } from "next/server";

import type {
  ClassifiedPhotoError,
  DestinationPhotosErrorResponse,
} from "@/types/destination-photo";
import { validateDestination } from "@/validation/destination-photo";
import { classifyUpstreamError, normalizePhotos } from "@/services/unsplash";

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const PHOTO_COUNT = 8;
const REQUEST_TIMEOUT_MS = 8_000;

const RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store",
};

function errorResponse(
  error: ClassifiedPhotoError,
): NextResponse<DestinationPhotosErrorResponse> {
  const headers = new Headers(RESPONSE_HEADERS);

  if (error.retryAfterSeconds !== undefined) {
    headers.set("Retry-After", String(error.retryAfterSeconds));
  }

  return NextResponse.json(
    {
      error: {
        code: error.code,
        message: error.message,
        retryable: error.retryable,
        ...(error.retryAfterSeconds !== undefined && {
          retryAfterSeconds: error.retryAfterSeconds,
        }),
      },
    },
    {
      status: error.status,
      headers,
    },
  );
}

export async function GET(request: NextRequest) {
  const validation = validateDestination(
    request.nextUrl.searchParams.get("destination"),
  );

  if (!validation.valid) {
    return errorResponse({
      status: 400,
      code: "INVALID_DESTINATION",
      message: validation.message,
      retryable: false,
    });
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey || accessKey === "your_access_key_here") {
    return errorResponse({
      status: 500,
      code: "CONFIGURATION_ERROR",
      message: "Photo search is not configured.",
      retryable: false,
    });
  }

  const url = new URL(UNSPLASH_API_URL);
  url.searchParams.set("query", validation.destination);
  url.searchParams.set("per_page", String(PHOTO_COUNT));
  url.searchParams.set("orientation", "landscape");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        Accept: "application/json",
      },
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return errorResponse(classifyUpstreamError(response));
    }

    const data: unknown = await response.json();

    if (typeof data !== "object" || data === null || !("results" in data)) {
      return errorResponse({
        status: 502,
        code: "INVALID_RESPONSE",
        message: "Photo search returned an invalid response.",
        retryable: true,
      });
    }

    const photos = normalizePhotos(data.results);

    if (photos === null) {
      return errorResponse({
        status: 502,
        code: "INVALID_RESPONSE",
        message: "Photo search returned an invalid response.",
        retryable: true,
      });
    }

    return NextResponse.json({ photos }, { headers: RESPONSE_HEADERS });
  } catch {
    if (controller.signal.aborted) {
      return errorResponse({
        status: 504,
        code: "TIMEOUT",
        message: "Photo search took too long. Please try again.",
        retryable: true,
      });
    }

    return errorResponse({
      status: 502,
      code: "UPSTREAM_ERROR",
      message: "Unable to load destination photos right now.",
      retryable: true,
    });
  } finally {
    clearTimeout(timeout);
  }
}
