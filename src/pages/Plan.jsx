import TripForm from '../components/TripForm/TripForm'

export default function Plan() {
  return (
    <div className="relative mx-auto max-w-2xl px-4 py-12">
      {/* Decorative background blob */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-gradient-to-r from-brand-400/20 to-violet-400/20 blur-3xl -z-10" aria-hidden="true" />

      <header className="mb-8 text-center">
        <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-lg shadow-brand-500/30">
          <span className="text-2xl" aria-hidden="true">🗺️</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
          Plan Your <span className="gradient-text">Perfect Trip</span>
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Fill in your preferences and let AI craft the perfect itinerary.
        </p>
      </header>

      <div className="card-glass">
        <TripForm />
      </div>
    </div>
  )
}
