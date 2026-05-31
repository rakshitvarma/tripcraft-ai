import { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useItinerary } from '../hooks/useItinerary'
import { useTrips } from '../hooks/useTrips'
import { useWeather } from '../hooks/useWeather'
import ItineraryView from '../components/Itinerary/ItineraryView'

const WeatherWidget = lazy(() => import('../components/Weather/WeatherWidget'))

function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse" role="status" aria-label="Generating itinerary">
      <div className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-700" />
      {[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-2xl bg-slate-100 dark:bg-slate-800" />)}
      <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
        ✨ Crafting your personalised itinerary…
      </p>
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
    <div className="mx-auto max-w-3xl px-4 py-10">
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
        <div className="card text-center" role="alert">
          <p className="text-4xl mb-3" aria-hidden="true">⚠️</p>
          <p className="font-semibold text-slate-800 dark:text-slate-100">Something went wrong</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{error}</p>
          <button
            type="button"
            onClick={() => prefs && generate(prefs)}
            className="btn-primary mt-5"
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
