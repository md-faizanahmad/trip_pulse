export type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: "attraction";
  address: string | null;
  city: string | null;
  country: string | null;
  countryCode: string | null;
};

export type PlacesResponse = {
  places?: Place[];
  error?: string;
};
