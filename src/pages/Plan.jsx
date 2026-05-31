import TripForm from '../components/TripForm/TripForm'

export default function Plan() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Plan Your Trip</h1>
        <p className="mt-2 text-slate-500">
          Fill in your preferences and let AI craft the perfect itinerary.
        </p>
      </header>
      <div className="card">
        <TripForm />
      </div>
    </div>
  )
}
