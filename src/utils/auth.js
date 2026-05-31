/**
 * Auth utilities — passcode-based profiles with SHA-256 hashing.
 * Passcodes are NEVER stored in plaintext. Only salted SHA-256 hashes are persisted.
 */

const PROFILES_KEY = 'tripcraft_profiles'
const SESSION_KEY  = 'tripcraft_session'

/**
 * Hash a passcode using SHA-256 salted with the username.
 * @param {string} username
 * @param {string} passcode
 * @returns {Promise<string>} hex digest
 */
export async function hashPasscode(username, passcode) {
  const salted = `${username.toLowerCase()}:${passcode}`
  const buf    = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salted))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Load all profiles from localStorage.
 * @returns {{ username: string, hash: string, createdAt: string }[]}
 */
export function loadProfiles() {
  try {
    return JSON.parse(localStorage.getItem(PROFILES_KEY) ?? '[]')
  } catch {
    return []
  }
}

/**
 * Create a new profile. Rejects if username already taken.
 * @param {string} username
 * @param {string} passcode
 * @returns {Promise<{ username: string, hash: string }>}
 */
export async function createProfile(username, passcode) {
  const profiles = loadProfiles()
  if (profiles.some((p) => p.username.toLowerCase() === username.toLowerCase())) {
    throw new Error('Username already taken. Choose a different one.')
  }
  const hash    = await hashPasscode(username, passcode)
  const profile = { username, hash, createdAt: new Date().toISOString() }
  localStorage.setItem(PROFILES_KEY, JSON.stringify([...profiles, profile]))
  return { username, hash }
}

/**
 * Verify passcode for an existing profile.
 * @param {string} username
 * @param {string} passcode
 * @returns {Promise<{ username: string, hash: string }>}
 */
export async function loginProfile(username, passcode) {
  const profiles = loadProfiles()
  const profile  = profiles.find((p) => p.username.toLowerCase() === username.toLowerCase())
  if (!profile) throw new Error('No account found with that username.')
  const hash = await hashPasscode(username, passcode)
  if (hash !== profile.hash) throw new Error('Incorrect passcode.')
  return { username: profile.username, hash }
}

/**
 * Persist the current session to sessionStorage (cleared on tab close).
 * @param {{ username: string, hash: string }} session
 */
export function saveSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

/**
 * Load current session from sessionStorage.
 * @returns {{ username: string, hash: string } | null}
 */
export function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/** Clear current session (logout). */
export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

/**
 * Returns the localStorage key for a user's trips.
 * @param {string} hash
 * @returns {string}
 */
export function tripsKey(hash) {
  return `tripcraft_trips_${hash}`
}
