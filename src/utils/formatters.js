/**
 * Format an ISO date string (YYYY-MM-DD) to a human-readable label.
 * @param {string} iso
 * @returns {string}
 */
export function formatDate(iso) {
  if (!iso) return ''
  const [year, month, day] = iso.split('-').map(Number)
  // Use UTC to avoid timezone-shift surprises
  const d = new Date(Date.UTC(year, month - 1, day))
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

/**
 * Return the number of nights between two ISO date strings.
 * @param {string} checkIn
 * @param {string} checkOut
 * @returns {number}
 */
export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const msPerDay = 86_400_000
  return Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / msPerDay))
}

/**
 * Format a numeric budget with currency symbol.
 * @param {number} amount
 * @param {string} [currency='USD']
 * @returns {string}
 */
export function formatBudget(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

/**
 * Capitalize the first letter of every word.
 * @param {string} str
 * @returns {string}
 */
export function titleCase(str) {
  if (!str) return ''
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Truncate a string to maxLen characters, appending ellipsis if needed.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(str, maxLen = 120) {
  if (!str || str.length <= maxLen) return str ?? ''
  return str.slice(0, maxLen).trimEnd() + '…'
}
