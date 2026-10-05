import { NextResponse } from "next/server";

import type {
  ClassifiedPhotoError,
  DestinationPhotosErrorResponse,
} from "@/types/destination-photo";

const RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store",
};

export function photoErrorResponse(
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
