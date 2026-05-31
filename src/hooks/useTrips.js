import { useState, useCallback } from 'react'
import { loadTrips, addTrip, deleteTrip } from '../utils/storage'

/**
 * Synchronizes the saved-trips list with localStorage.
 * Initializes lazily so we only hit localStorage on first render.
 */
export function useTrips() {
  const [trips, setTrips] = useState(() => loadTrips())

  const save = useCallback((trip) => {
    setTrips(addTrip(trip))
  }, [])

  const remove = useCallback((id) => {
    setTrips(deleteTrip(id))
  }, [])

  return { trips, save, remove }
}
