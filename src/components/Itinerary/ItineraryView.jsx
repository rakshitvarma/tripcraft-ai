import { useMemo, memo } from 'react'
import DayCard from './DayCard'
import { formatBudget } from '../../utils/formatters'

const BudgetRow = memo(function BudgetRow({ label, value, total, currency }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <dt className="w-32 shrink-0 text-sm capitalize text-slate-600 dark:text-slate-400 font-medium">{label}</dt>
      <div className="flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700/60 h-2.5" role="presentation">
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <dd className="w-24 text-right text-sm font-bold text-slate-800 dark:text-slate-200">
        {formatBudget(value, currency)}
      </dd>
    </div>
  )
})

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
    <div className="space-y-6">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-violet-600 to-accent-500 text-white shadow-2xl shadow-brand-500/30"
        aria-labelledby="itinerary-heading"
      >
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="relative p-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Your Itinerary</p>
            <h1 id="itinerary-heading" className="text-3xl font-extrabold">{destination}</h1>
            <p className="mt-3 text-white/80 leading-relaxed max-w-lg text-sm">{summary}</p>
          </div>
          <button
            type="button"
            onClick={onSave}
            disabled={saved}
            className="shrink-0 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-white
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
        <h2 id="schedule-heading" className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-xs text-white shadow-sm">📅</span>
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
        <section className="card-glass" aria-labelledby="budget-heading">
          <h2 id="budget-heading" className="mb-5 text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-xs text-white shadow-sm">💰</span>
            Budget Breakdown
          </h2>
          <dl className="space-y-3">
            {budgetEntries.map(([key, val]) => (
              <BudgetRow key={key} label={key} value={val} total={total} currency={currency} />
            ))}
          </dl>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total estimate</p>
            <p className="text-xl font-extrabold gradient-text-subtle">{formatBudget(total, currency)}</p>
          </div>
        </section>
      )}

      {/* Packing & Emergency */}
      <div className="grid gap-5 sm:grid-cols-2">
        {packingEssentials.length > 0 && (
          <section className="card-glass" aria-labelledby="packing-heading">
            <h2 id="packing-heading" className="mb-3 font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-xs text-white shadow-sm">🎒</span>
              Packing Essentials
            </h2>
            <ul className="space-y-2" aria-label="Packing list">
              {packingEssentials.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-500 to-violet-500 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {emergencyEntries.length > 0 && (
          <section className="card-glass" aria-labelledby="emergency-heading">
            <h2 id="emergency-heading" className="mb-3 font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-400 to-rose-600 text-xs text-white shadow-sm">🆘</span>
              Emergency Contacts
            </h2>
            <dl className="space-y-2 text-sm">
              {emergencyEntries.map(([key, val]) => (
                <div key={key} className="flex justify-between items-center">
                  <dt className="capitalize text-slate-500 dark:text-slate-400">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </dt>
                  <dd className="font-bold text-slate-800 dark:text-slate-200">{val}</dd>
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
