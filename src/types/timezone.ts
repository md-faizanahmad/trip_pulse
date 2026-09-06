export type Timezone = {
  timezone: string;
  gmtOffset: number | null;
  dstOffset: number | null;
};

export type TimezoneResponse = {
  timezone?: Timezone;
  error?: string;
};
