import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTrips } from '../hooks/useTrips'
import TripList from '../components/Trips/TripList'
import ItineraryView from '../components/Itinerary/ItineraryView'

export default function Trips() {
  const { trips, remove } = useTrips()
  const [viewing, setViewing] = useState(null)

  if (viewing) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <button
          type="button"
          onClick={() => setViewing(null)}
          className="btn-secondary mb-6 py-1.5 px-3 text-xs"
        >
          ← Back to My Trips
        </button>
        <ItineraryView
          itinerary={{
            destination: viewing.destination,
            summary:     viewing.summary ?? '',
            days:        viewing.days ?? [],
            budgetBreakdown: viewing.budgetBreakdown ?? {},
            packingEssentials: viewing.packingEssentials ?? [],
            emergencyContacts: viewing.emergencyContacts ?? {},
          }}
          onSave={() => {}}
          saved
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Trips</h1>
          <p className="mt-1 text-slate-500">
            {trips.length} saved {trips.length === 1 ? 'trip' : 'trips'}
          </p>
        </div>
        <Link to="/plan" className="btn-primary">
          + Plan New Trip
        </Link>
      </header>

      <TripList trips={trips} onDelete={remove} onView={setViewing} />
    </div>
  )
}
