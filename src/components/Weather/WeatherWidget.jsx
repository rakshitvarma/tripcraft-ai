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
        className={`flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm px-4 ${compact ? 'py-2' : 'py-4'}`}
        role="status"
        aria-label="Loading weather"
      >
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-300 border-t-brand-600" />
        <span className="text-sm text-slate-500 dark:text-slate-400">Fetching weather…</span>
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-xs text-amber-600 dark:text-amber-400" role="alert">
        Weather unavailable: {error}
      </p>
    )
  }

  if (!weather) return null

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

  if (compact) {
    return (
      <div
        className="flex items-center gap-3 rounded-xl border border-brand-200/60 dark:border-brand-700/40 bg-brand-50/80 dark:bg-brand-900/20 backdrop-blur-sm px-4 py-2"
        aria-label={`Current weather in ${weather.city}: ${weather.tempC}°C, ${weather.description}`}
      >
        <img src={iconUrl} alt={weather.description} className="h-10 w-10" />
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {weather.city}, {weather.country} — {weather.tempC}°C
          </p>
          <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{weather.description}</p>
        </div>
        <div className="ml-auto text-right text-xs text-slate-500 dark:text-slate-400">
          <p>Humidity {weather.humidity}%</p>
          <p>Wind {weather.windKph} km/h</p>
        </div>
      </div>
    )
  }

  return (
    <section
      className="card-glass"
      aria-labelledby="weather-heading"
    >
      <h2 id="weather-heading" className="mb-4 text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-xs text-white shadow-sm">⛅</span>
        Current Weather
      </h2>
      <div className="flex items-center gap-4">
        <img src={iconUrl} alt={weather.description} className="h-16 w-16" />
        <div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{weather.tempC}°C</p>
          <p className="capitalize text-slate-600 dark:text-slate-300 font-medium">{weather.description}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
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
          <div key={label} className="rounded-xl bg-white/60 dark:bg-slate-700/60 border border-white/40 dark:border-slate-600/40 py-2.5 px-3 backdrop-blur-sm">
            <dt className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</dt>
            <dd className="font-bold text-slate-800 dark:text-white mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
