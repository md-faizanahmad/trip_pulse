export type WeatherSunTimes = {
  sunrise: string | null;
  sunset: string | null;
};

export type WeatherCurrent = {
  temperature: number | null;
  feelsLike: number | null;
  humidity: number | null;
  windSpeed: number | null;
  weatherCode: number | null;
};

export type WeatherForecast = {
  date: string;
  weatherCode: number | null;
  temperatureMax: number | null;
  temperatureMin: number | null;
};

export type WeatherResponse = {
  current?: WeatherCurrent;
  sunTimes?: WeatherSunTimes;
  forecast?: WeatherForecast[];
  error?: string;
};
