import { NextRequest, NextResponse } from "next/server";

import { validateDestination } from "@/validation/destination-photo";
import { classifyUpstreamError, normalizePhotos } from "@/services/unsplash";
import { photoErrorResponse } from "@/services/destination-photos/error";

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

const DEFAULT_PER_PAGE = 24;
const MAX_PER_PAGE = 30;
const REQUEST_TIMEOUT_MS = 8_000;

const RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store",
};

type UnsplashSearchResponse = {
  results: unknown;
  total: number;
  total_pages: number;
};

function isUnsplashSearchResponse(
  data: unknown,
): data is UnsplashSearchResponse {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  if (!("results" in data)) {
    return false;
  }

  if (!("total" in data) || !("total_pages" in data)) {
    return false;
  }

  const response = data as Record<string, unknown>;

  return (
    Array.isArray(response.results) &&
    typeof response.total === "number" &&
    typeof response.total_pages === "number"
  );
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const validation = validateDestination(searchParams.get("destination"));

  if (!validation.valid) {
    return photoErrorResponse({
      status: 400,
      code: "INVALID_DESTINATION",
      message: validation.message,
      retryable: false,
    });
  }

  const pageParam = searchParams.get("page");
  const perPageParam = searchParams.get("perPage");

  const page = pageParam ? Number(pageParam) : 1;
  const perPage = perPageParam ? Number(perPageParam) : DEFAULT_PER_PAGE;

  if (!Number.isInteger(page) || page < 1) {
    return photoErrorResponse({
      status: 400,
      code: "INVALID_PAGE",
      message: "Page must be a positive integer.",
      retryable: false,
    });
  }

  if (!Number.isInteger(perPage) || perPage < 1 || perPage > MAX_PER_PAGE) {
    return photoErrorResponse({
      status: 400,
      code: "INVALID_PER_PAGE",
      message: `perPage must be an integer between 1 and ${MAX_PER_PAGE}.`,
      retryable: false,
    });
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey || accessKey === "your_access_key_here") {
    return photoErrorResponse({
      status: 500,
      code: "CONFIGURATION_ERROR",
      message: "Photo search is not configured.",
      retryable: false,
    });
  }

  const url = new URL(UNSPLASH_API_URL);

  url.searchParams.set("query", validation.destination);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));
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
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return photoErrorResponse(classifyUpstreamError(response));
    }

    const data: unknown = await response.json();

    if (!isUnsplashSearchResponse(data)) {
      return photoErrorResponse({
        status: 502,
        code: "INVALID_RESPONSE",
        message: "Photo search returned an invalid response.",
        retryable: true,
      });
    }

    const photos = normalizePhotos(data.results);

    if (photos === null) {
      return photoErrorResponse({
        status: 502,
        code: "INVALID_RESPONSE",
        message: "Photo search returned an invalid response.",
        retryable: true,
      });
    }

    const totalPages = Math.max(1, data.total_pages);

    return NextResponse.json(
      {
        photos,
        pagination: {
          page,
          perPage,
          total: data.total,
          totalPages,
          hasNextPage: page < totalPages,
        },
      },
      {
        headers: RESPONSE_HEADERS,
      },
    );
  } catch {
    if (controller.signal.aborted) {
      return photoErrorResponse({
        status: 504,
        code: "TIMEOUT",
        message: "Photo search took too long. Please try again.",
        retryable: true,
      });
    }

    return photoErrorResponse({
      status: 502,
      code: "UPSTREAM_ERROR",
      message: "Unable to load destination photos right now.",
      retryable: true,
    });
  } finally {
    clearTimeout(timeout);
  }
}
