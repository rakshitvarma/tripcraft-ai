import TripCard from './TripCard'

/**
 * @param {{ trips: object[], onDelete: fn, onView: fn }} props
 */
export default function TripList({ trips, onDelete, onView }) {
  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center" role="status">
        <span className="text-5xl" aria-hidden="true">🗺️</span>
        <p className="text-slate-600 font-medium">No saved trips yet.</p>
        <p className="text-sm text-slate-400">
          Plan a trip and save the itinerary — it'll appear here.
        </p>
      </div>
    )
  }

  return (
    <ul
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Saved trips"
      role="list"
    >
      {trips.map((trip) => (
        <li key={trip.id}>
          <TripCard trip={trip} onDelete={onDelete} onView={onView} />
        </li>
      ))}
    </ul>
  )
}
