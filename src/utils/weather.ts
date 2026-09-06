export function getWeatherCondition(weatherCode: number | null) {
  if (weatherCode === null) return "Unknown";

  if (weatherCode === 0) return "Clear sky";
  if ([1, 2, 3].includes(weatherCode)) return "Partly cloudy";
  if ([45, 48].includes(weatherCode)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(weatherCode)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(weatherCode)) return "Rain";
  if ([71, 73, 75, 77].includes(weatherCode)) return "Snow";
  if ([80, 81, 82].includes(weatherCode)) return "Rain showers";
  if ([85, 86].includes(weatherCode)) return "Snow showers";
  if ([95, 96, 99].includes(weatherCode)) return "Thunderstorm";

  return "Unknown";
}

export function formatWeatherDate(date: string) {
  const weatherDate = new Date(`${date}T00:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(weatherDate);
}
