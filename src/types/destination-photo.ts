export type DestinationPhoto = {
  id: string;
  description: string | null;
  imageUrl: string;
  thumbnailUrl: string;
  photoUrl: string;
  photographerName: string;
  photographerUrl: string;
};

export type DestinationPhotosResponse = {
  photos: DestinationPhoto[];
};

export type DestinationPhotoErrorCode =
  | "INVALID_DESTINATION"
  | "CONFIGURATION_ERROR"
  | "RATE_LIMITED"
  | "UPSTREAM_AUTH_ERROR"
  | "UPSTREAM_ERROR"
  | "TIMEOUT"
  | "INVALID_RESPONSE"
  | "INVALID_QUERY"
  | "INVALID_PAGE"
  | "INVALID_PER_PAGE";

export type DestinationPhotosErrorResponse = {
  error: {
    code: DestinationPhotoErrorCode;
    message: string;
    retryable: boolean;
    retryAfterSeconds?: number;
  };
};

export type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
    small: string;
  };
  links: {
    html: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
};

export type UnsplashSearchResponse = {
  results: UnsplashPhoto[];
};

export type UnsplashErrorBody = {
  errors?: string[];
};

export type ClassifiedPhotoError = {
  status: number;
  code: DestinationPhotoErrorCode;
  message: string;
  retryable: boolean;
  retryAfterSeconds?: number;
};
