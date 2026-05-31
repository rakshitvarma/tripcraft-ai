import { normalizeWeather } from '../utils/weather'

const RAW = {
  name: 'Tokyo',
  sys: { country: 'JP' },
  main: { temp: 28.7, feels_like: 31.2, humidity: 72 },
  weather: [{ description: 'few clouds', icon: '02d' }],
  wind: { speed: 3.5 }, // m/s → 12.6 km/h → rounds to 13
}

describe('normalizeWeather', () => {
  it('maps city and country', () => {
    const w = normalizeWeather(RAW)
    expect(w.city).toBe('Tokyo')
    expect(w.country).toBe('JP')
  })

  it('rounds temperature values', () => {
    const w = normalizeWeather(RAW)
    expect(w.tempC).toBe(29)
    expect(w.feelsLikeC).toBe(31)
  })

  it('converts wind speed from m/s to km/h', () => {
    const w = normalizeWeather(RAW)
    expect(w.windKph).toBe(13)
  })

  it('picks description and icon from weather array', () => {
    const w = normalizeWeather(RAW)
    expect(w.description).toBe('few clouds')
    expect(w.icon).toBe('02d')
  })

  it('handles missing optional fields gracefully', () => {
    const w = normalizeWeather({ name: 'Unknown' })
    expect(w.country).toBe('')
    expect(w.tempC).toBe(0)
    expect(w.windKph).toBe(0)
    expect(w.description).toBe('')
    expect(w.icon).toBe('')
  })
})
