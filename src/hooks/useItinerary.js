import { useState, useCallback } from 'react'
import { generateItinerary } from '../utils/gemini'

/**
 * Manages async lifecycle of AI itinerary generation.
 * Exposes stable `generate` and `reset` callbacks to avoid unnecessary re-renders.
 *
 * @returns {{
 *   itinerary: object|null,
 *   loading: boolean,
 *   error: string|null,
 *   generate: (prefs: object) => Promise<object|null>,
 *   reset: () => void
 * }}
 */
export function useItinerary() {
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)

  const generate = useCallback(async (prefs) => {
    setLoading(true)
    setError(null)
    setItinerary(null)
    try {
      const result = await generateItinerary(prefs)
      setItinerary(result)
      return result
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setItinerary(null)
    setError(null)
  }, [])

  return { itinerary, loading, error, generate, reset }
}
