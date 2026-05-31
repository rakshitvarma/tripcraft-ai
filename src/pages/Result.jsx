import { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useItinerary } from '../hooks/useItinerary'
import { useTrips } from '../hooks/useTrips'
import { useWeather } from '../hooks/useWeather'
import ItineraryView from '../components/Itinerary/ItineraryView'

const WeatherWidget = lazy(() => import('../components/Weather/WeatherWidget'))

function Skeleton() {
  return (
    <div className="space-y-5 animate-pulse" role="status" aria-label="Generating itinerary">
      <div className="h-44 rounded-2xl bg-gradient-to-r from-brand-200/60 to-violet-200/60 dark:from-brand-900/40 dark:to-violet-900/40" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 backdrop-blur-sm" />
      ))}
      <div className="flex flex-col items-center gap-3 pt-4">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
          <div className="absolute inset-0 h-10 w-10 rounded-full border-4 border-transparent border-b-violet-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          ✨ Crafting your personalised itinerary…
        </p>
      </div>
    </div>
  )
}

export default function Result() {
  const navigate = useNavigate()
  const { itinerary, loading, error, generate } = useItinerary()
  const { save } = useTrips()
  const [saved, setSaved] = useState(false)
  const [prefs, setPrefs] = useState(null)

  const { weather, loading: wLoading, error: wError } = useWeather(prefs?.destination ?? '')

  useEffect(() => {
    const raw = sessionStorage.getItem('tripPrefs')
    if (!raw) { navigate('/plan'); return }
    const parsed = JSON.parse(raw)
    setPrefs(parsed)
    generate(parsed)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = useCallback(() => {
    if (!itinerary || !prefs) return
    save({
      ...prefs,
      destination:     itinerary.destination ?? prefs.destination,
      summary:         itinerary.summary,
      days:            itinerary.days,
      budgetBreakdown: itinerary.budgetBreakdown,
    })
    setSaved(true)
  }, [itinerary, prefs, save])

  return (
    <div className="relative mx-auto max-w-3xl px-4 py-10">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-gradient-to-r from-brand-400/15 to-violet-400/15 blur-3xl -z-10" aria-hidden="true" />

      <div className="mb-6 flex items-center gap-3">
        <Link to="/plan" className="btn-secondary py-1.5 px-3 text-xs">
          ← Edit Preferences
        </Link>
        {itinerary && (
          <Link to="/trips" className="btn-secondary py-1.5 px-3 text-xs">
            My Trips
          </Link>
        )}
      </div>

      {loading && <Skeleton />}

      {error && (
        <div className="card-glass text-center" role="alert">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/20 mb-4">
            <span className="text-3xl" aria-hidden="true">⚠️</span>
          </div>
          <p className="font-bold text-slate-800 dark:text-slate-100 text-lg">Something went wrong</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">{error}</p>
          <button
            type="button"
            onClick={() => prefs && generate(prefs)}
            className="btn-primary mt-6"
          >
            Try Again
          </button>
        </div>
      )}

      {itinerary && !loading && (
        <div className="space-y-8">
          <Suspense fallback={null}>
            <WeatherWidget weather={weather} loading={wLoading} error={wError} />
          </Suspense>

          <ItineraryView itinerary={itinerary} onSave={handleSave} saved={saved} currency={prefs?.currency ?? 'USD'} />
        </div>
      )}
    </div>
  )
}
