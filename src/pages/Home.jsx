import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI-Powered Plans',
    desc: 'Gemini 2.5 Flash crafts a day-by-day itinerary tailored to your style and budget.',
    gradient: 'from-brand-500 to-violet-600',
    bg: 'bg-brand-50 dark:bg-brand-900/20',
  },
  {
    icon: '⛅',
    title: 'Live Weather',
    desc: 'Real-time conditions for your destination appear as you type — no surprises.',
    gradient: 'from-sky-400 to-blue-600',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
  },
  {
    icon: '💾',
    title: 'Save & Revisit',
    desc: 'Itineraries stored locally — access them any time, no account needed.',
    gradient: 'from-emerald-400 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: '🌍',
    title: 'Multi-Currency',
    desc: 'Plan in USD, EUR, INR, GBP and 6 more — costs always shown in your currency.',
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
]

const STATS = [
  { value: '10+', label: 'Currencies' },
  { value: 'AI', label: 'Powered' },
  { value: '∞', label: 'Destinations' },
  { value: '0', label: 'Sign-ups needed' },
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pt-20 pb-24 text-center" aria-labelledby="hero-heading">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-r from-brand-400/20 via-violet-400/20 to-accent-400/10 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/60 dark:border-brand-700/40 bg-brand-50/80 dark:bg-brand-900/30 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Powered by Gemini 2.5 Flash AI
          </div>

          <h1 id="hero-heading" className="text-5xl font-extrabold tracking-tight sm:text-7xl leading-none">
            <span className="gradient-text">Plan Smarter.</span>
            <br />
            <span className="text-slate-800 dark:text-slate-100">Travel Better.</span>
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Describe your dream trip and TripCraft's AI generates a complete itinerary —
            activities, budget breakdown, packing list, and live weather. In seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/plan" className="btn-primary text-base px-8 py-3.5 text-shadow">
              ✈️ Plan a Trip
            </Link>
            <Link to="/trips" className="btn-secondary text-base px-8 py-3.5">
              My Trips →
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map(({ value, label }) => (
              <div key={label} className="card-glass text-center py-4 px-3">
                <p className="text-2xl font-extrabold gradient-text-subtle">{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-20" aria-labelledby="features-heading">
        <div className="text-center mb-12">
          <h2 id="features-heading" className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Everything you need to plan
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">No more tab-switching. All in one place.</p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {FEATURES.map(({ icon, title, desc, gradient, bg }) => (
            <li key={title} className={`card-glass group hover:scale-[1.02] transition-all duration-300 cursor-default`}>
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-4`}>
                <span className="text-2xl" aria-hidden="true">{icon}</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24" aria-labelledby="cta-heading">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-violet-600 to-accent-500 px-8 py-16 text-center text-white shadow-2xl shadow-brand-500/30">
          <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="relative">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-extrabold">Ready to explore?</h2>
            <p className="mt-3 text-white/80 text-lg">
              Create your free itinerary in under a minute. No sign-up required.
            </p>
            <Link
              to="/plan"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-brand-700 hover:bg-brand-50 transition-all duration-200 active:scale-95 shadow-xl"
            >
              Get Started → Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
