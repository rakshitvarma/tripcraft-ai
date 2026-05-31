import { useState, useCallback } from 'react'
import { loadTrips, addTrip, deleteTrip } from '../utils/storage'

/**
 * Synchronises the saved-trips list with localStorage.
 * State is lazily initialised from storage on first render only.
 *
 * @returns {{ trips: object[], save: (trip: object) => void, remove: (id: string) => void }}
 */
export function useTrips() {
  const [trips, setTrips] = useState(loadTrips) // pass ref, not call — avoids re-running on every render

  const save = useCallback((trip) => {
    setTrips(addTrip(trip))
  }, [])

  const remove = useCallback((id) => {
    setTrips(deleteTrip(id))
  }, [])

  return { trips, save, remove }
}
