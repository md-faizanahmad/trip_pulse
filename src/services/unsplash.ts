import type {
  ClassifiedPhotoError,
  DestinationPhoto,
  UnsplashPhoto,
} from "@/types/destination-photo";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidUnsplashPhoto(value: unknown): value is UnsplashPhoto {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    isRecord(value.urls) &&
    typeof value.urls.regular === "string" &&
    typeof value.urls.small === "string" &&
    isRecord(value.links) &&
    typeof value.links.html === "string" &&
    isRecord(value.user) &&
    typeof value.user.name === "string" &&
    isRecord(value.user.links) &&
    typeof value.user.links.html === "string" &&
    (typeof value.alt_description === "string" ||
      value.alt_description === null)
  );
}

function isAllowedUnsplashUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      ["images.unsplash.com", "unsplash.com", "www.unsplash.com"].includes(
        url.hostname,
      )
    );
  } catch {
    return false;
  }
}

export function normalizePhotos(results: unknown): DestinationPhoto[] | null {
  if (!Array.isArray(results)) return null;

  const photos: DestinationPhoto[] = [];

  for (const item of results) {
    if (!isValidUnsplashPhoto(item)) continue;

    const imageUrl = item.urls.regular;
    const thumbnailUrl = item.urls.small;
    const photoUrl = item.links.html;
    const photographerUrl = item.user.links.html;

    if (
      !isAllowedUnsplashUrl(imageUrl) ||
      !isAllowedUnsplashUrl(thumbnailUrl) ||
      !isAllowedUnsplashUrl(photoUrl) ||
      !isAllowedUnsplashUrl(photographerUrl)
    ) {
      continue;
    }

    photos.push({
      id: item.id,
      description: item.alt_description,
      imageUrl,
      thumbnailUrl,
      photoUrl,
      photographerName: item.user.name,
      photographerUrl,
    });
  }

  return photos;
}

function getRetryAfterSeconds(response: Response): number | undefined {
  const retryAfter = response.headers.get("Retry-After");

  if (!retryAfter) return undefined;

  const seconds = Number(retryAfter);

  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.ceil(seconds);
  }

  const retryAt = Date.parse(retryAfter);

  if (Number.isNaN(retryAt)) return undefined;

  return Math.max(0, Math.ceil((retryAt - Date.now()) / 1000));
}

export function classifyUpstreamError(
  response: Response,
): ClassifiedPhotoError {
  const remainingHeader = response.headers.get("X-Ratelimit-Remaining");
  const remaining = remainingHeader === null ? null : Number(remainingHeader);

  if (
    response.status === 429 ||
    (remaining !== null && Number.isFinite(remaining) && remaining <= 0)
  ) {
    return {
      status: 429,
      code: "RATE_LIMITED",
      message:
        "Photo search has reached its request limit. Please try again later.",
      retryable: true,
      retryAfterSeconds: getRetryAfterSeconds(response),
    };
  }

  if (response.status === 401 || response.status === 403) {
    return {
      status: 502,
      code: "UPSTREAM_AUTH_ERROR",
      message: "Photo search is temporarily unavailable.",
      retryable: false,
    };
  }

  return {
    status: 502,
    code: "UPSTREAM_ERROR",
    message: "Unable to load destination photos right now.",
    retryable: true,
  };
}
