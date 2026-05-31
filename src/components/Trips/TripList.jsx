import { memo } from 'react'
import TripCard from './TripCard'

const EMPTY_STATE_CLS = 'flex flex-col items-center gap-4 py-20 text-center'

/**
 * Renders a responsive grid of TripCard components, or an empty-state prompt.
 * @param {{ trips: object[], onDelete: (id: string) => void, onView: (trip: object) => void }} props
 */
function TripList({ trips, onDelete, onView }) {
  if (trips.length === 0) {
    return (
      <div className={EMPTY_STATE_CLS} role="status">
        <span className="text-5xl" aria-hidden="true">🗺️</span>
        <p className="text-slate-600 dark:text-slate-400 font-medium">No saved trips yet.</p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Plan a trip and save the itinerary — it&apos;ll appear here.
        </p>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Saved trips" role="list">
      {trips.map((trip) => (
        <li key={trip.id}>
          <TripCard trip={trip} onDelete={onDelete} onView={onView} />
        </li>
      ))}
    </ul>
  )
}

export default memo(TripList)
