import {
  BusFront,
  Ship,
  TramFront,
  TrainFront,
  type LucideIcon,
  TrainFrontIcon,
} from "lucide-react";

export type TransportMode = "metro" | "bus" | "train" | "tram" | "ferry";

export type TransportConfig = {
  label: string;
  icon: LucideIcon;
};

export const transportConfig: Record<TransportMode, TransportConfig> = {
  metro: {
    label: "Metro",
    icon: TrainFrontIcon,
  },
  bus: {
    label: "Bus",
    icon: BusFront,
  },
  train: {
    label: "Train",
    icon: TrainFront,
  },
  tram: {
    label: "Tram",
    icon: TramFront,
  },
  ferry: {
    label: "Ferry",
    icon: Ship,
  },
};

export const transportModes: TransportMode[] = [
  "metro",
  "bus",
  "train",
  "tram",
  "ferry",
];
