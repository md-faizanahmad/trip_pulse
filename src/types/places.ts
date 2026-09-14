export type PlaceCategory =
  | "museum"
  | "park"
  | "historical"
  | "entertainment"
  | "beach"
  | "landmark"
  | "other";

export type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: PlaceCategory;
  address: string | null;
  city: string | null;
  country: string | null;
  countryCode: string | null;
};

export type PlacesResponse = {
  places?: Place[];
  error?: string;
};
