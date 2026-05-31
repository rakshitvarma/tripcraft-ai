import DayCard from './DayCard'
import { formatBudget } from '../../utils/formatters'

/**
 * @param {{ itinerary: object, onSave: () => void, saved: boolean }} props
 */
export default function ItineraryView({ itinerary, onSave, saved }) {
  const { destination, summary, days = [], budgetBreakdown = {}, packingEssentials = [], emergencyContacts = {} } = itinerary

  const total = Object.values(budgetBreakdown).reduce((s, v) => s + (v ?? 0), 0)

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="card bg-gradient-to-br from-brand-600 to-brand-900 text-white" aria-labelledby="itinerary-heading">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 id="itinerary-heading" className="text-2xl font-bold">{destination}</h1>
            <p className="mt-2 text-brand-100 leading-relaxed">{summary}</p>
          </div>
          <button
            type="button"
            onClick={onSave}
            disabled={saved}
            className="shrink-0 rounded-lg border-2 border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white
                       hover:bg-white/20 active:scale-95 transition-all duration-150
                       disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label={saved ? 'Trip already saved' : 'Save this trip'}
          >
            {saved ? '✓ Saved' : '🔖 Save Trip'}
          </button>
        </div>
      </section>

      {/* Day cards */}
      <section aria-labelledby="schedule-heading">
        <h2 id="schedule-heading" className="mb-4 text-lg font-semibold text-slate-800">
          Day-by-Day Schedule
        </h2>
        <div className="space-y-3">
          {days.map((day, i) => (
            <DayCard key={day.day} day={day} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* Budget breakdown */}
      {total > 0 && (
        <section className="card" aria-labelledby="budget-heading">
          <h2 id="budget-heading" className="mb-4 text-lg font-semibold text-slate-800">Budget Breakdown</h2>
          <dl className="space-y-2">
            {Object.entries(budgetBreakdown).map(([key, val]) => {
              if (!val) return null
              const pct = Math.round((val / total) * 100)
              return (
                <div key={key} className="flex items-center gap-3">
                  <dt className="w-32 shrink-0 text-sm capitalize text-slate-600">{key}</dt>
                  <div className="flex-1 overflow-hidden rounded-full bg-slate-100 h-2" role="presentation">
                    <div className="h-2 rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                  </div>
                  <dd className="w-20 text-right text-sm font-medium text-slate-800">{formatBudget(val)}</dd>
                </div>
              )
            })}
          </dl>
          <p className="mt-4 text-right text-sm font-bold text-slate-900">
            Total estimate: {formatBudget(total)}
          </p>
        </section>
      )}

      {/* Packing & Emergency in a grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {packingEssentials.length > 0 && (
          <section className="card" aria-labelledby="packing-heading">
            <h2 id="packing-heading" className="mb-3 font-semibold text-slate-800">🎒 Packing Essentials</h2>
            <ul className="space-y-1.5" aria-label="Packing list">
              {packingEssentials.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {Object.keys(emergencyContacts).length > 0 && (
          <section className="card" aria-labelledby="emergency-heading">
            <h2 id="emergency-heading" className="mb-3 font-semibold text-slate-800">🆘 Emergency Contacts</h2>
            <dl className="space-y-1.5 text-sm">
              {Object.entries(emergencyContacts).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="capitalize text-slate-500">{k.replace(/([A-Z])/g, ' $1')}</dt>
                  <dd className="font-medium text-slate-800">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>
    </div>
  )
}
