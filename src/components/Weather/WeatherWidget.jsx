/**
 * @param {{
 *   weather: object|null,
 *   loading: boolean,
 *   error: string|null,
 *   compact?: boolean
 * }} props
 */
export default function WeatherWidget({ weather, loading, error, compact = false }) {
  if (loading) {
    return (
      <div
        className={`flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 ${compact ? 'py-2' : 'py-4'}`}
        role="status"
        aria-label="Loading weather"
      >
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-300 border-t-brand-600" />
        <span className="text-sm text-slate-500">Fetching weather…</span>
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-xs text-amber-600" role="alert">
        Weather unavailable: {error}
      </p>
    )
  }

  if (!weather) return null

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

  if (compact) {
    return (
      <div
        className="flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 px-4 py-2"
        aria-label={`Current weather in ${weather.city}: ${weather.tempC}°C, ${weather.description}`}
      >
        <img src={iconUrl} alt={weather.description} className="h-10 w-10" />
        <div>
          <p className="text-sm font-semibold text-slate-800">
            {weather.city}, {weather.country} — {weather.tempC}°C
          </p>
          <p className="text-xs capitalize text-slate-500">{weather.description}</p>
        </div>
        <div className="ml-auto text-right text-xs text-slate-500">
          <p>Humidity {weather.humidity}%</p>
          <p>Wind {weather.windKph} km/h</p>
        </div>
      </div>
    )
  }

  return (
    <section
      className="card"
      aria-labelledby="weather-heading"
    >
      <h2 id="weather-heading" className="mb-4 text-lg font-semibold text-slate-800">
        Current Weather
      </h2>
      <div className="flex items-center gap-4">
        <img src={iconUrl} alt={weather.description} className="h-16 w-16" />
        <div>
          <p className="text-3xl font-bold text-slate-900">{weather.tempC}°C</p>
          <p className="capitalize text-slate-600">{weather.description}</p>
          <p className="text-sm text-slate-500">
            {weather.city}, {weather.country}
          </p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
        {[
          { label: 'Feels like', value: `${weather.feelsLikeC}°C` },
          { label: 'Humidity',   value: `${weather.humidity}%`    },
          { label: 'Wind',       value: `${weather.windKph} km/h` },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg bg-slate-50 py-2 px-3">
            <dt className="text-xs text-slate-500">{label}</dt>
            <dd className="font-semibold text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
