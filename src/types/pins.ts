export type OsmType = "node" | "way" | "relation";

export type LocationPinInput = {
  osmType: OsmType;
  osmId: string;
  name: string;
  latitude: number;
  longitude: number;
  displayName: string;
  country: string | null;
  countryCode: string | null;
};

export type AttractionPinInput = {
  osmType: OsmType;
  osmId: string;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  address: string | null;
  city: string | null;
  country: string | null;
  countryCode: string | null;
};

export type PinToggleResult = {
  pinned: boolean;
};
