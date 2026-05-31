import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '🤖', title: 'AI Itineraries',  desc: 'Gemini 1.5 Flash builds a day-by-day plan tailored to your style and budget.' },
  { icon: '⛅', title: 'Live Weather',    desc: 'Real-time conditions for your destination appear as you type.' },
  { icon: '💾', title: 'Save & Revisit',  desc: 'Itineraries are stored locally — access them any time, no account needed.' },
  { icon: '♿', title: 'Accessible',      desc: 'Full keyboard navigation, screen-reader labels, and WCAG-compliant contrast.' },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      {/* Hero */}
      <section className="text-center" aria-labelledby="hero-heading">
        <p className="text-5xl mb-6" aria-hidden="true">✈️</p>
        <h1 id="hero-heading" className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Your AI Travel Companion
        </h1>
        <p className="mt-5 mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
          Tell WanderAI where you want to go and we'll generate a personalised itinerary
          — complete with activities, budget breakdown, packing list, and live weather.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/plan" className="btn-primary text-base px-8 py-3">
            Plan a Trip
          </Link>
          <Link to="/trips" className="btn-secondary text-base px-8 py-3">
            My Trips
          </Link>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mt-20" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Features</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {FEATURES.map(({ icon, title, desc }) => (
            <li key={title} className="card text-center">
              <span className="text-4xl" aria-hidden="true">{icon}</span>
              <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA banner */}
      <section
        className="mt-16 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-900 px-8 py-10 text-center text-white"
        aria-labelledby="cta-heading"
      >
        <h2 id="cta-heading" className="text-2xl font-bold">Ready to explore?</h2>
        <p className="mt-2 text-brand-100">
          Create your free itinerary in under a minute. No sign-up required.
        </p>
        <Link to="/plan" className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-sm font-bold text-brand-700 hover:bg-brand-50 transition-colors active:scale-95">
          Get Started →
        </Link>
      </section>
    </div>
  )
}
