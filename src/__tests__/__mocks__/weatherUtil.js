// Test-safe re-export of weather utils — strips import.meta usage
// normalizeWeather is a pure function with no env deps, so we re-implement it here
export function normalizeWeather(raw) {
  return {
    city:        raw.name ?? '',
    country:     raw.sys?.country ?? '',
    tempC:       Math.round(raw.main?.temp ?? 0),
    feelsLikeC:  Math.round(raw.main?.feels_like ?? 0),
    humidity:    raw.main?.humidity ?? 0,
    description: raw.weather?.[0]?.description ?? '',
    icon:        raw.weather?.[0]?.icon ?? '',
    windKph:     Math.round((raw.wind?.speed ?? 0) * 3.6),
  }
}

export async function fetchWeather() {
  throw new Error('fetchWeather should be mocked in tests')
}
