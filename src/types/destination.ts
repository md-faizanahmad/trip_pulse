export type Destination = {
  placeId: number;
  name: string;
  latitude: number;
  longitude: number;

  displayName: string;
  country: string | null;
  countryCode: string | null;
  osmType: "node" | "way" | "relation";
  osmId: number;
};

export type SearchResponse = {
  destinations?: Destination[];
  error?: string;
};
