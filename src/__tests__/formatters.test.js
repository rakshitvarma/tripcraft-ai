import { formatDate, nightsBetween, formatBudget, titleCase, truncate } from '../utils/formatters'

describe('formatDate', () => {
  it('formats an ISO date string', () => {
    expect(formatDate('2025-03-15')).toBe('Mar 15, 2025')
  })
  it('returns empty string for falsy input', () => {
    expect(formatDate('')).toBe('')
    expect(formatDate(null)).toBe('')
  })
})

describe('nightsBetween', () => {
  it('calculates nights correctly', () => {
    expect(nightsBetween('2025-06-01', '2025-06-08')).toBe(7)
  })
  it('returns 0 for same dates', () => {
    expect(nightsBetween('2025-06-01', '2025-06-01')).toBe(0)
  })
  it('returns 0 for reversed dates', () => {
    expect(nightsBetween('2025-06-10', '2025-06-05')).toBe(0)
  })
  it('returns 0 for missing input', () => {
    expect(nightsBetween('', '')).toBe(0)
  })
})

describe('formatBudget', () => {
  it('formats USD by default', () => {
    expect(formatBudget(3000)).toBe('$3,000')
  })
  it('formats EUR when specified', () => {
    expect(formatBudget(1500, 'EUR')).toMatch(/1.500|1,500/)
  })
})

describe('titleCase', () => {
  it('capitalises each word', () => {
    expect(titleCase('hello world')).toBe('Hello World')
  })
  it('handles empty string', () => {
    expect(titleCase('')).toBe('')
  })
})

describe('truncate', () => {
  it('returns the string unchanged if within limit', () => {
    expect(truncate('short', 120)).toBe('short')
  })
  it('truncates and appends ellipsis', () => {
    const long = 'a'.repeat(200)
    const result = truncate(long, 120)
    expect(result.endsWith('…')).toBe(true)
    expect(result.length).toBeLessThanOrEqual(121) // 120 chars + ellipsis char
  })
  it('handles null/undefined', () => {
    expect(truncate(null)).toBe('')
    expect(truncate(undefined)).toBe('')
  })
})
