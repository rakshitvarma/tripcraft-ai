const TRIPS_KEY = 'wander_ai_trips'

/**
 * Load all saved trips from localStorage.
 * @returns {Array}
 */
export function loadTrips() {
  try {
    const raw = localStorage.getItem(TRIPS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Persist the trips array to localStorage.
 * @param {Array} trips
 */
export function saveTrips(trips) {
  try {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips))
  } catch {
    // Storage quota exceeded — fail silently; the UI still works in-memory
  }
}

/**
 * Append a single trip object and return the updated list.
 * @param {object} trip
 * @returns {Array}
 */
export function addTrip(trip) {
  const trips = loadTrips()
  const updated = [{ ...trip, id: crypto.randomUUID(), savedAt: new Date().toISOString() }, ...trips]
  saveTrips(updated)
  return updated
}

/**
 * Remove a trip by id and return the updated list.
 * @param {string} id
 * @returns {Array}
 */
export function deleteTrip(id) {
  const updated = loadTrips().filter((t) => t.id !== id)
  saveTrips(updated)
  return updated
}
