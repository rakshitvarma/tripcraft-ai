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
      <div className="relative mx-auto max-w-3xl px-4 py-10">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-gradient-to-r from-brand-400/15 to-violet-400/15 blur-3xl -z-10" aria-hidden="true" />
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
          currency={viewing.currency ?? 'USD'}
        />
      </div>
    )
  }

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-gradient-to-r from-brand-400/15 to-violet-400/15 blur-3xl -z-10" aria-hidden="true" />

      <header className="mb-10 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            My <span className="gradient-text">Trips</span>
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
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
