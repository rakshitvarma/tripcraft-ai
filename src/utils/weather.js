const BASE_URL = 'https://api.openweathermap.org/data/2.5'

/**
 * @typedef {object} WeatherData
 * @property {string} city
 * @property {string} country
 * @property {number} tempC
 * @property {number} feelsLikeC
 * @property {number} humidity
 * @property {string} description
 * @property {string} icon
 * @property {number} windKph
 */

/**
 * Fetch current weather for a city name.
 * Throws a descriptive Error on non-2xx so callers can surface it in the UI.
 * @param {string} city
 * @returns {Promise<WeatherData>}
 */
export async function fetchWeather(city) {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!key) throw new Error('OpenWeatherMap API key not configured')

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}`
  const res = await fetch(url)

  if (!res.ok) {
    if (res.status === 404) throw new Error(`City "${city}" not found`)
    throw new Error(`Weather service error (${res.status})`)
  }

  return normalizeWeather(await res.json())
}

/**
 * Map a raw OpenWeatherMap response to a stable, minimal shape used by the UI.
 * Keeping normalisation separate makes unit testing straightforward.
 * @param {object} raw - Raw OWM /weather response
 * @returns {WeatherData}
 */
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
