import { useState, useEffect, useRef } from 'react'
import { fetchWeather } from '../utils/weather'

const DEBOUNCE_MS = 700

/**
 * Fetches weather for `city`, debounced to avoid hammering the API while
 * the user is still typing.
 * @param {string} city
 * @returns {{ weather: object|null, loading: boolean, error: string|null }}
 */
export function useWeather(city) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const timerRef = useRef(null)
  const abortRef = useRef(null)

  useEffect(() => {
    if (!city || city.trim().length < 2) {
      setWeather(null)
      setError(null)
      return
    }

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      // Cancel any in-flight request
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      setLoading(true)
      setError(null)
      try {
        const data = await fetchWeather(city.trim())
        setWeather(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setWeather(null)
        }
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timerRef.current)
      abortRef.current?.abort()
    }
  }, [city])

  return { weather, loading, error }
}
