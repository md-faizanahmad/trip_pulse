export type TransportStatus = "available" | "unknown";

export type Transport = {
  metro: TransportStatus;
  bus: TransportStatus;
  train: TransportStatus;
  tram: TransportStatus;
  ferry: TransportStatus;
};

export type TransportResponse = {
  transport?: Transport;
  error?: string;
};
