import type {
  DestinationPhotosErrorResponse,
  DestinationPhotosResponse,
} from "@/types/destination-photo";

const API_PATH = "/api/destination-photos";
const DEFAULT_PER_PAGE = 24;

/**
 * Parameters accepted by the destination photo API request.
 */
type FetchDestinationPhotosParams = {
  destination: string;
  page?: number;
  perPage?: number;
  signal?: AbortSignal;
};

/**
 * Represents a known error returned by the destination photo API.
 */
export class DestinationPhotosError extends Error {
  readonly code: DestinationPhotosErrorResponse["error"]["code"];
  readonly retryable: boolean;
  readonly retryAfterSeconds?: number;

  /**
   * Creates a typed error from the API error payload.
   */
  constructor(error: DestinationPhotosErrorResponse["error"]) {
    super(error.message);

    this.name = "DestinationPhotosError";
    this.code = error.code;
    this.retryable = error.retryable;
    this.retryAfterSeconds = error.retryAfterSeconds;
  }
}

/**
 * Fetches a paginated set of destination photos from the TripPulse API.
 */
export async function fetchDestinationPhotos({
  destination,
  page = 1,
  perPage = DEFAULT_PER_PAGE,
  signal,
}: FetchDestinationPhotosParams): Promise<DestinationPhotosResponse> {
  const params = new URLSearchParams({
    destination: destination.trim(),
    page: String(page),
    perPage: String(perPage),
  });

  const response = await fetch(`${API_PATH}?${params.toString()}`, {
    method: "GET",
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  const data: unknown = await response.json();

  if (!response.ok) {
    if (isErrorResponse(data)) {
      throw new DestinationPhotosError(data.error);
    }

    throw new Error("Unable to load destination photos.");
  }

  if (!isDestinationPhotosResponse(data)) {
    throw new Error("Photo search returned an invalid response.");
  }

  return data;
}

/**
 * Checks whether an unknown API response matches the expected error contract.
 */
function isErrorResponse(
  data: unknown,
): data is DestinationPhotosErrorResponse {
  if (typeof data !== "object" || data === null || !("error" in data)) {
    return false;
  }

  const error = data.error;

  if (typeof error !== "object" || error === null) {
    return false;
  }

  return (
    "code" in error &&
    "message" in error &&
    "retryable" in error &&
    typeof error.code === "string" &&
    typeof error.message === "string" &&
    typeof error.retryable === "boolean"
  );
}

/**
 * Checks whether an unknown API response matches the successful photo response contract.
 */
function isDestinationPhotosResponse(
  data: unknown,
): data is DestinationPhotosResponse {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  if (!("photos" in data) || !("pagination" in data)) {
    return false;
  }

  const response = data as {
    photos: unknown;
    pagination: unknown;
  };

  if (!Array.isArray(response.photos)) {
    return false;
  }

  if (typeof response.pagination !== "object" || response.pagination === null) {
    return false;
  }

  const pagination = response.pagination as Record<string, unknown>;

  return (
    typeof pagination.page === "number" &&
    typeof pagination.perPage === "number" &&
    typeof pagination.total === "number" &&
    typeof pagination.totalPages === "number" &&
    typeof pagination.hasNextPage === "boolean"
  );
}
