import {
  Coins,
  CloudSun,
  Images,
  Landmark,
  type LucideIcon,
} from "lucide-react";

export type DestinationPinData = {
  name: string;
  position: string;
  size: "sm" | "md" | "lg";
  color: string;
  background: string;
  href: string;
};

export type ProductInfoCardData = {
  label: string;
  value: string;
  icon: LucideIcon;
  position: string;
  animation: string;
};

export const destinations: DestinationPinData[] = [
  {
    name: "Paris",
    href: "/destinations/paris?osmType=relation&osmId=71525",
    position: "left-[10%] top-[34%]",
    size: "md",
    color: "text-sky-600",
    background: "bg-sky-50",
  },
  {
    name: "London",
    href: "/destinations/greater%20london?osmType=relation&osmId=175342",
    position: "left-[40%] top-[27%]",
    size: "sm",
    color: "text-emerald-600",
    background: "bg-emerald-50",
  },
  {
    name: "New York",
    href: "/destinations/new%20york?osmType=relation&osmId=175905",
    position: "right-[14%] top-[29%]",
    size: "lg",
    color: "text-violet-600",
    background: "bg-violet-50",
  },
  {
    name: "Delhi",
    href: "/destinations/delhi?osmType=relation&osmId=1942586",
    position: "right-[14%] bottom-[33%]",
    size: "md",
    color: "text-rose-600",
    background: "bg-rose-50",
  },
  {
    name: "Singapore",
    href: "/destinations/singapore?osmType=relation&osmId=17140517",
    position: "left-[20%] bottom-[27%]",
    size: "sm",
    color: "text-amber-600",
    background: "bg-amber-50",
  },
];
export const productInfoCards: ProductInfoCardData[] = [
  {
    label: "Places",
    value: "Attractions",
    icon: Landmark,
    position: "left-0 top-3",
    animation: "animate-[bounce_4.2s_ease-in-out_infinite]",
  },
  {
    label: "Weather",
    value: "28°C",
    icon: CloudSun,
    position: "right-0 top-2",
    animation: "animate-[bounce_4s_ease-in-out_infinite]",
  },
  {
    label: "Explore",
    value: "Photos",
    icon: Images,
    position: "bottom-6 left-0",
    animation: "animate-[bounce_5s_ease-in-out_infinite]",
  },
  {
    label: "Currency",
    value: "AED",
    icon: Coins,
    position: "bottom-1 right-0",
    animation: "animate-[bounce_4.5s_ease-in-out_infinite]",
  },
];
