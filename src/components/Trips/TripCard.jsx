import { formatDate, formatBudget, nightsBetween, truncate } from '../../utils/formatters'

/**
 * @param {{ trip: object, onDelete: (id: string) => void, onView: (trip: object) => void }} props
 */
export default function TripCard({ trip, onDelete, onView }) {
  const nights = nightsBetween(trip.startDate, trip.endDate)

  return (
    <article
      className="card hover:shadow-md transition-shadow duration-200"
      aria-label={`Saved trip to ${trip.destination}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{trip.destination}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {formatDate(trip.startDate)}
            {trip.endDate ? ` → ${formatDate(trip.endDate)}` : ''}
            {nights > 0 ? ` · ${nights} night${nights > 1 ? 's' : ''}` : ''}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
          {formatBudget(trip.budget)}
        </span>
      </div>

      {trip.summary && (
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          {truncate(trip.summary, 140)}
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
          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500
                     hover:bg-red-50 active:scale-95 transition-all duration-150
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
          aria-label={`Delete trip to ${trip.destination}`}
        >
          Delete
        </button>
      </div>
    </article>
  )
}
