import { useMemo, memo } from 'react'
import DayCard from './DayCard'
import { formatBudget } from '../../utils/formatters'

/**
 * Renders a single budget category row with a proportional progress bar.
 * Extracted to keep ItineraryView readable and enable targeted memoisation.
 * @param {{ label: string, value: number, total: number, currency: string }} props
 */
const BudgetRow = memo(function BudgetRow({ label, value, total, currency }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <dt className="w-32 shrink-0 text-sm capitalize text-slate-600 dark:text-slate-400">{label}</dt>
      <div className="flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700 h-2" role="presentation">
        <div className="h-2 rounded-full bg-brand-500 transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
      <dd className="w-24 text-right text-sm font-medium text-slate-800 dark:text-slate-200">
        {formatBudget(value, currency)}
      </dd>
    </div>
  )
})

/**
 * Full itinerary display: hero, day schedule, budget, packing, emergency contacts.
 * @param {{ itinerary: object, onSave: () => void, saved: boolean, currency?: string }} props
 */
function ItineraryView({ itinerary, onSave, saved, currency = 'USD' }) {
  const {
    destination,
    summary,
    days = [],
    budgetBreakdown = {},
    packingEssentials = [],
    emergencyContacts = {},
  } = itinerary

  const total = useMemo(
    () => Object.values(budgetBreakdown).reduce((sum, v) => sum + (v ?? 0), 0),
    [budgetBreakdown],
  )

  const budgetEntries = useMemo(
    () => Object.entries(budgetBreakdown).filter(([, v]) => v > 0),
    [budgetBreakdown],
  )

  const emergencyEntries = useMemo(
    () => Object.entries(emergencyContacts),
    [emergencyContacts],
  )

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section
        className="card bg-gradient-to-br from-brand-600 to-brand-900 text-white"
        aria-labelledby="itinerary-heading"
      >
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
                       disabled:opacity-60 disabled:cursor-not-allowed
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label={saved ? 'Trip already saved' : 'Save this trip'}
          >
            {saved ? '✓ Saved' : '🔖 Save Trip'}
          </button>
        </div>
      </section>

      {/* Day-by-day schedule */}
      <section aria-labelledby="schedule-heading">
        <h2 id="schedule-heading" className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
          Day-by-Day Schedule
        </h2>
        <div className="space-y-3">
          {days.map((day, i) => (
            <DayCard key={day.day} day={day} defaultOpen={i === 0} currency={currency} />
          ))}
        </div>
      </section>

      {/* Budget breakdown */}
      {total > 0 && (
        <section className="card" aria-labelledby="budget-heading">
          <h2 id="budget-heading" className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
            Budget Breakdown
          </h2>
          <dl className="space-y-2">
            {budgetEntries.map(([key, val]) => (
              <BudgetRow key={key} label={key} value={val} total={total} currency={currency} />
            ))}
          </dl>
          <p className="mt-4 text-right text-sm font-bold text-slate-900 dark:text-slate-100">
            Total estimate: {formatBudget(total, currency)}
          </p>
        </section>
      )}

      {/* Packing & Emergency */}
      <div className="grid gap-6 sm:grid-cols-2">
        {packingEssentials.length > 0 && (
          <section className="card" aria-labelledby="packing-heading">
            <h2 id="packing-heading" className="mb-3 font-semibold text-slate-800 dark:text-slate-100">
              🎒 Packing Essentials
            </h2>
            <ul className="space-y-1.5" aria-label="Packing list">
              {packingEssentials.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {emergencyEntries.length > 0 && (
          <section className="card" aria-labelledby="emergency-heading">
            <h2 id="emergency-heading" className="mb-3 font-semibold text-slate-800 dark:text-slate-100">
              🆘 Emergency Contacts
            </h2>
            <dl className="space-y-1.5 text-sm">
              {emergencyEntries.map(([key, val]) => (
                <div key={key} className="flex justify-between">
                  <dt className="capitalize text-slate-500 dark:text-slate-400">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </dt>
                  <dd className="font-medium text-slate-800 dark:text-slate-200">{val}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>
    </div>
  )
}

export default memo(ItineraryView)
