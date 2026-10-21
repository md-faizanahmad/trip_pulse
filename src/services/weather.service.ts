type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    sunrise?: string[];
    sunset?: string[];
  };
};

type WeatherForecast = {
  date: string;
  weatherCode: number | null;
  temperatureMax: number | null;
  temperatureMin: number | null;
};

export type WeatherData = {
  current: {
    temperature: number | null;
    feelsLike: number | null;
    humidity: number | null;
    windSpeed: number | null;
    weatherCode: number | null;
  };
  sunTimes: {
    sunrise: string | null;
    sunset: string | null;
  };
  forecast: WeatherForecast[];
};

export async function getWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherData> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
  );
  url.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
    ].join(","),
  );
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("WEATHER_SERVICE_UNAVAILABLE");
  }

  const data: OpenMeteoResponse = await response.json();

  if (!data.current || !data.daily) {
    throw new Error("WEATHER_DATA_UNAVAILABLE");
  }

  const forecast: WeatherForecast[] = (data.daily.time ?? []).map(
    (date, index) => ({
      date,
      weatherCode: data.daily?.weather_code?.[index] ?? null,
      temperatureMax: data.daily?.temperature_2m_max?.[index] ?? null,
      temperatureMin: data.daily?.temperature_2m_min?.[index] ?? null,
    }),
  );

  return {
    current: {
      temperature: data.current.temperature_2m ?? null,
      feelsLike: data.current.apparent_temperature ?? null,
      humidity: data.current.relative_humidity_2m ?? null,
      windSpeed: data.current.wind_speed_10m ?? null,
      weatherCode: data.current.weather_code ?? null,
    },
    sunTimes: {
      sunrise: data.daily.sunrise?.[0] ?? null,
      sunset: data.daily.sunset?.[0] ?? null,
    },
    forecast,
  };
}
