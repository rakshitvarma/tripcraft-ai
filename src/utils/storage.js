/** localStorage key for persisted trips. */
const TRIPS_KEY = 'tripcraft_trips'

/**
 * Cross-environment UUID generator.
 * Prefers the native Web Crypto API; falls back to Math.random for Jest/jsdom.
 * @returns {string}
 */
function uuid() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

/**
 * Load all saved trips from localStorage.
 * Returns an empty array on parse failure or missing data.
 * @returns {object[]}
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
 * Persist the full trips array to localStorage.
 * Fails silently on storage-quota errors so the UI remains functional.
 * @param {object[]} trips
 */
export function saveTrips(trips) {
  try {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips))
  } catch {
    // Quota exceeded — in-memory state is still consistent
  }
}

/**
 * Prepend a new trip (with generated id + timestamp) and persist.
 * @param {object} trip
 * @returns {object[]} Updated trips list
 */
export function addTrip(trip) {
  const existing = loadTrips()
  const updated = [{ ...trip, id: uuid(), savedAt: new Date().toISOString() }, ...existing]
  saveTrips(updated)
  return updated
}

/**
 * Remove the trip matching `id` and persist.
 * No-op if the id is not found.
 * @param {string} id
 * @returns {object[]} Updated trips list
 */
export function deleteTrip(id) {
  const updated = loadTrips().filter((t) => t.id !== id)
  saveTrips(updated)
  return updated
}
