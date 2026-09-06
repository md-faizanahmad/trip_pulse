export type Destination = {
  name: string;
  latitude: number;
  longitude: number;
  displayName: string;
  country: string | null;
};

export type SearchResponse = {
  destinations?: Destination[];
  error?: string;
};
