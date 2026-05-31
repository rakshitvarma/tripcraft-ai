import { useState, useCallback } from 'react'
import { generateItinerary } from '../utils/gemini'

/**
 * Manages the async lifecycle of itinerary generation.
 * Returns the generated itinerary plus loading/error state and a generate fn.
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
