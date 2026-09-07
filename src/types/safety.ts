export type EmergencyNumbers = {
  emergency: string | null;
  police: string | null;
  ambulance: string | null;
  fire: string | null;
};

export type SafetyResponse = {
  emergency?: EmergencyNumbers;
  error?: string;
};
