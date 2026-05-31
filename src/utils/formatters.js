/** @type {Map<string, Intl.NumberFormat>} */
const currencyFormatters = new Map()

/**
 * Returns a cached Intl.NumberFormat instance for the given currency.
 * Avoids constructing a new formatter on every render cycle.
 * @param {string} currency
 * @returns {Intl.NumberFormat}
 */
function getCurrencyFormatter(currency) {
  if (!currencyFormatters.has(currency)) {
    currencyFormatters.set(
      currency,
      new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }),
    )
  }
  return currencyFormatters.get(currency)
}

/** Cached date formatter — locale and options never change. */
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
})

/** Milliseconds in one day — avoids magic number repetition. */
const MS_PER_DAY = 86_400_000

/**
 * Format an ISO date string (YYYY-MM-DD) to a human-readable label.
 * Uses UTC to avoid timezone-shift surprises across locales.
 * @param {string} iso
 * @returns {string}
 */
export function formatDate(iso) {
  if (!iso) return ''
  const [year, month, day] = iso.split('-').map(Number)
  return dateFormatter.format(new Date(Date.UTC(year, month - 1, day)))
}

/**
 * Return the number of nights between two ISO date strings.
 * @param {string} checkIn
 * @param {string} checkOut
 * @returns {number}
 */
export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  return Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / MS_PER_DAY))
}

/**
 * Format a numeric amount as a localised currency string.
 * Formatter instances are cached by currency code for performance.
 * @param {number} amount
 * @param {string} [currency='USD']
 * @returns {string}
 */
export function formatBudget(amount, currency = 'USD') {
  return getCurrencyFormatter(currency).format(amount)
}

/**
 * Capitalise the first letter of every word.
 * @param {string} str
 * @returns {string}
 */
export function titleCase(str) {
  if (!str) return ''
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Truncate a string to maxLen characters, appending an ellipsis if needed.
 * @param {string|null|undefined} str
 * @param {number} [maxLen=120]
 * @returns {string}
 */
export function truncate(str, maxLen = 120) {
  if (!str) return ''
  return str.length <= maxLen ? str : `${str.slice(0, maxLen).trimEnd()}…`
}
