const BASE = 'https://api.openweathermap.org/data/2.5'

/**
 * Fetch current weather for a city name.
 * Throws on non-2xx responses so callers can catch and display errors.
 * @param {string} city
 * @returns {Promise<object>} Normalized weather object
 */
export async function fetchWeather(city) {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!key) throw new Error('OpenWeatherMap API key not configured')

  const url = `${BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}`
  const res = await fetch(url)

  if (!res.ok) {
    if (res.status === 404) throw new Error(`City "${city}" not found`)
    throw new Error(`Weather service error (${res.status})`)
  }

  const data = await res.json()
  return normalizeWeather(data)
}

/**
 * Map raw OWM response to a stable shape used by the UI.
 * Keeping this separate makes unit testing easy without hitting the API.
 * @param {object} raw
 * @returns {object}
 */
export function normalizeWeather(raw) {
  return {
    city:        raw.name,
    country:     raw.sys?.country ?? '',
    tempC:       Math.round(raw.main?.temp ?? 0),
    feelsLikeC:  Math.round(raw.main?.feels_like ?? 0),
    humidity:    raw.main?.humidity ?? 0,
    description: raw.weather?.[0]?.description ?? '',
    icon:        raw.weather?.[0]?.icon ?? '',
    windKph:     Math.round((raw.wind?.speed ?? 0) * 3.6),
  }
}
