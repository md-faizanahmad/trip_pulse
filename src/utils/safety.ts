import type { EmergencyNumbers } from "@/types/safety";

const emergencyNumbersByCountry: Record<string, EmergencyNumbers> = {
  GB: {
    emergency: "999",
    police: "999",
    ambulance: "999",
    fire: "999",
  },
  IN: {
    emergency: "112",
    police: "100",
    ambulance: "108",
    fire: "101",
  },
  US: {
    emergency: "911",
    police: "911",
    ambulance: "911",
    fire: "911",
  },
  AE: {
    emergency: "999",
    police: "999",
    ambulance: "998",
    fire: "997",
  },
  FR: {
    emergency: "112",
    police: "17",
    ambulance: "15",
    fire: "18",
  },
  DE: {
    emergency: "112",
    police: "110",
    ambulance: "112",
    fire: "112",
  },
  IT: {
    emergency: "112",
    police: "112",
    ambulance: "118",
    fire: "115",
  },
  ES: {
    emergency: "112",
    police: "091",
    ambulance: "061",
    fire: "080",
  },
  JP: {
    emergency: "119",
    police: "110",
    ambulance: "119",
    fire: "119",
  },
};

export function getEmergencyNumbers(
  countryCode: string | null,
): EmergencyNumbers | null {
  if (!countryCode) return null;

  return emergencyNumbersByCountry[countryCode.toUpperCase()] ?? null;
}
