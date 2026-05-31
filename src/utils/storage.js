const TRIPS_KEY = 'wander_ai_trips'

function uuid() {
  // Use native crypto when available (browser + Node ≥ 19), otherwise fallback
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

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
  const updated = [{ ...trip, id: uuid(), savedAt: new Date().toISOString() }, ...trips]
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
