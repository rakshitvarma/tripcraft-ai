import { loadTrips, saveTrips, addTrip, deleteTrip } from '../utils/storage'

// jsdom provides a basic localStorage stub
beforeEach(() => localStorage.clear())

describe('loadTrips', () => {
  it('returns empty array when storage is empty', () => {
    expect(loadTrips()).toEqual([])
  })
  it('returns parsed array from storage', () => {
    localStorage.setItem('wander_ai_trips', JSON.stringify([{ id: '1' }]))
    expect(loadTrips()).toEqual([{ id: '1' }])
  })
  it('returns empty array on corrupt JSON', () => {
    localStorage.setItem('wander_ai_trips', 'not-json')
    expect(loadTrips()).toEqual([])
  })
})

describe('saveTrips / loadTrips round-trip', () => {
  it('persists and retrieves trips', () => {
    const trips = [{ id: 'abc', destination: 'Paris' }]
    saveTrips(trips)
    expect(loadTrips()).toEqual(trips)
  })
})

describe('addTrip', () => {
  it('prepends a trip with generated id and savedAt', () => {
    const result = addTrip({ destination: 'Tokyo' })
    expect(result).toHaveLength(1)
    expect(result[0].destination).toBe('Tokyo')
    expect(result[0].id).toBeDefined()
    expect(result[0].savedAt).toBeDefined()
  })
  it('prepends to existing trips', () => {
    addTrip({ destination: 'First' })
    const result = addTrip({ destination: 'Second' })
    expect(result[0].destination).toBe('Second')
    expect(result).toHaveLength(2)
  })
})

describe('deleteTrip', () => {
  it('removes the trip with the matching id', () => {
    const [trip] = addTrip({ destination: 'Rome' })
    // addTrip returns array, trip is first element
    const trips = addTrip({ destination: 'Rome' })
    const id = trips[0].id
    const after = deleteTrip(id)
    expect(after.find((t) => t.id === id)).toBeUndefined()
  })
  it('is a no-op when id does not exist', () => {
    addTrip({ destination: 'Oslo' })
    const before = loadTrips().length
    const after = deleteTrip('nonexistent')
    expect(after).toHaveLength(before)
  })
})
