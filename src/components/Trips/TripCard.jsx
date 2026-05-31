import { memo } from 'react'
import { formatDate, formatBudget, nightsBetween, truncate } from '../../utils/formatters'

const SUMMARY_MAX_LEN = 140

/**
 * Card displaying a saved trip with view and delete actions.
 * @param {{ trip: object, onDelete: (id: string) => void, onView: (trip: object) => void }} props
 */
function TripCard({ trip, onDelete, onView }) {
  const nights = nightsBetween(trip.startDate, trip.endDate)
  const nightLabel = nights > 0 ? ` · ${nights} night${nights !== 1 ? 's' : ''}` : ''
  const dateRange = [
    formatDate(trip.startDate),
    trip.endDate ? ` → ${formatDate(trip.endDate)}` : '',
    nightLabel,
  ].join('')

  return (
    <article
      className="card hover:shadow-md transition-shadow duration-200"
      aria-label={`Saved trip to ${trip.destination}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
            {trip.destination}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{dateRange}</p>
        </div>
        <span className="shrink-0 rounded-full bg-brand-50 dark:bg-brand-900/40 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:text-brand-400">
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
          className="btn-secondary flex-1 py-1.5 text-xs"
          aria-label={`View itinerary for ${trip.destination}`}
        >
          View Itinerary
        </button>
        <button
          type="button"
          onClick={() => onDelete(trip.id)}
          className="rounded-lg border border-red-200 dark:border-red-800 px-3 py-1.5 text-xs font-semibold
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
