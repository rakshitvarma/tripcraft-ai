import { memo } from 'react'
import { formatDate, formatBudget, nightsBetween, truncate } from '../../utils/formatters'

const SUMMARY_MAX_LEN = 140

const DESTINATION_GRADIENTS = [
  'from-brand-500 to-violet-600',
  'from-sky-400 to-blue-600',
  'from-emerald-400 to-teal-600',
  'from-amber-400 to-orange-500',
  'from-pink-400 to-rose-600',
  'from-purple-400 to-indigo-600',
]

function getGradient(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return DESTINATION_GRADIENTS[Math.abs(hash) % DESTINATION_GRADIENTS.length]
}

function TripCard({ trip, onDelete, onView }) {
  const nights = nightsBetween(trip.startDate, trip.endDate)
  const nightLabel = nights > 0 ? ` · ${nights} night${nights !== 1 ? 's' : ''}` : ''
  const dateRange = [
    formatDate(trip.startDate),
    trip.endDate ? ` → ${formatDate(trip.endDate)}` : '',
    nightLabel,
  ].join('')

  const gradient = getGradient(trip.destination ?? '')

  return (
    <article
      className="card-glass group hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 overflow-hidden"
      aria-label={`Saved trip to ${trip.destination}`}
    >
      {/* Gradient header bar */}
      <div className={`-mx-6 -mt-6 mb-4 h-2 bg-gradient-to-r ${gradient}`} aria-hidden="true" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate text-base">
            {trip.destination}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{dateRange}</p>
        </div>
        <span className={`shrink-0 rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-bold text-white shadow-sm`}>
          {formatBudget(trip.budget, trip.currency ?? 'USD')}
        </span>
      </div>

      {trip.summary && (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {truncate(trip.summary, SUMMARY_MAX_LEN)}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onView(trip)}
          className="btn-primary flex-1 py-2 text-xs"
          aria-label={`View itinerary for ${trip.destination}`}
        >
          View Itinerary
        </button>
        <button
          type="button"
          onClick={() => onDelete(trip.id)}
          className="rounded-xl border border-red-200 dark:border-red-800/60 px-3 py-2 text-xs font-semibold
                     text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                     active:scale-95 transition-all duration-150
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
          aria-label={`Delete trip to ${trip.destination}`}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default memo(TripCard)
