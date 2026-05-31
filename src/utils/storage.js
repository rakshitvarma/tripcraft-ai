import { tripsKey } from './auth'

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
 * Get the current user hash from sessionStorage.
 * Falls back to a shared anonymous key if no session exists.
 * @returns {string}
 */
function currentKey() {
  try {
    const raw = sessionStorage.getItem('tripcraft_session')
    const session = raw ? JSON.parse(raw) : null
    return session?.hash ? tripsKey(session.hash) : 'tripcraft_trips'
  } catch {
    return 'tripcraft_trips'
  }
}

/**
 * Load all saved trips for the current user.
 * @returns {object[]}
 */
export function loadTrips() {
  try {
    const raw = localStorage.getItem(currentKey())
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Persist the full trips array for the current user.
 * @param {object[]} trips
 */
export function saveTrips(trips) {
  try {
    localStorage.setItem(currentKey(), JSON.stringify(trips))
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
  const updated  = [{ ...trip, id: uuid(), savedAt: new Date().toISOString() }, ...existing]
  saveTrips(updated)
  return updated
}

/**
 * Remove the trip matching `id` and persist.
 * @param {string} id
 * @returns {object[]} Updated trips list
 */
export function deleteTrip(id) {
  const updated = loadTrips().filter((t) => t.id !== id)
  saveTrips(updated)
  return updated
}
