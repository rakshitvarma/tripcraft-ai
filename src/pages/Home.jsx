import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '🤖', title: 'AI Itineraries',   desc: 'Day-by-day plans built by Google\'s latest language models — tailored to your style and budget.' },
  { icon: '⛅', title: 'Live Weather',     desc: 'Real-time weather for your destination appears as you type. No surprises on arrival.' },
  { icon: '💾', title: 'Private Trips',    desc: 'Each user\'s trips are stored under a hashed passcode. Private by design, no account needed.' },
  { icon: '🌍', title: 'Multi-Currency',   desc: 'USD, EUR, INR, GBP and 6 more. Every cost shown in the currency you choose.' },
]

const STEPS = [
  { n: '01', title: 'Describe your trip',    desc: 'Enter destination, dates, budget, and travel style.' },
  { n: '02', title: 'AI builds your plan',   desc: 'A complete itinerary generated in seconds using LLMs.' },
  { n: '03', title: 'Save and explore',      desc: 'Keep your favourites. Access them anytime from My Trips.' },
]

/* Animated floating orb */
function Orb({ className }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-30 dark:opacity-20 ${className}`}
      aria-hidden="true"
    />
  )
}

export default function Home() {
  return (
    <div className="relative overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative mx-auto max-w-6xl px-4 pt-24 pb-28 text-center" aria-labelledby="hero-heading">
        {/* Dot grid */}
        <div className="pointer-events-none absolute inset-0 dot-grid-light dark:dot-grid opacity-100" aria-hidden="true" />

        {/* Floating orbs */}
        <Orb className="h-96 w-96 bg-brand-400 top-0 left-1/4 animate-float" />
        <Orb className="h-72 w-72 bg-violet-500 top-10 right-1/4 animate-float-slow" />
        <Orb className="h-56 w-56 bg-accent-400 top-32 left-1/2 animate-float-delay" />

        <div className="relative">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-200/60 dark:border-brand-500/20 bg-brand-50/80 dark:bg-brand-500/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
            Powered by Google AI · Instant itineraries
          </div>

          {/* Headline */}
          <h1 id="hero-heading" className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance">
            <span className="text-slate-900 dark:text-white">Plan Smarter.</span>
            <br />
            <span className="gradient-text">Travel Better.</span>
          </h1>

          <p className="mt-6 mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Describe your trip. Get a full day-by-day itinerary, budget breakdown,
            packing list, and live weather — in seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/plan" className="btn-primary text-base px-8 py-3.5">
              Start planning →
            </Link>
            <Link to="/trips" className="btn-secondary text-base px-8 py-3.5">
              My Trips
            </Link>
          </div>

          {/* Terminal-style stat strip */}
          <div className="mt-14 inline-flex items-center gap-6 rounded-2xl border border-slate-200/80 dark:border-white/8 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md px-8 py-4 text-xs font-mono text-slate-500 dark:text-slate-500">
            <span><span className="text-brand-500 dark:text-brand-400 font-bold">10+</span> currencies</span>
            <span className="text-slate-300 dark:text-white/10">|</span>
            <span><span className="text-violet-500 dark:text-violet-400 font-bold">AI</span> powered</span>
            <span className="text-slate-300 dark:text-white/10">|</span>
            <span><span className="text-accent-500 dark:text-accent-400 font-bold">0</span> sign-ups</span>
            <span className="text-slate-300 dark:text-white/10">|</span>
            <span><span className="text-emerald-500 font-bold">∞</span> destinations</span>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="mx-auto max-w-6xl px-4 pb-24" aria-labelledby="steps-heading">
        <div className="mb-12 text-center">
          <p className="text-xs font-mono font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-widest mb-2">How it works</p>
          <h2 id="steps-heading" className="text-3xl font-bold text-slate-900 dark:text-white">Three steps. One perfect trip.</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map(({ n, title, desc }) => (
            <div
              key={n}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/8 bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm p-8 hover:border-brand-300 dark:hover:border-brand-500/30 transition-all duration-300"
            >
              <div className="pointer-events-none absolute -top-4 -right-4 text-8xl font-black text-slate-100 dark:text-white/[0.03] select-none" aria-hidden="true">{n}</div>
              <p className="text-xs font-mono font-bold text-brand-500 dark:text-brand-400 mb-3">{n}</p>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="mx-auto max-w-6xl px-4 pb-24" aria-labelledby="features-heading">
        <div className="mb-12 text-center">
          <p className="text-xs font-mono font-semibold text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-2">Features</p>
          <h2 id="features-heading" className="text-3xl font-bold text-slate-900 dark:text-white">Everything in one place</h2>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {FEATURES.map(({ icon, title, desc }) => (
            <li
              key={title}
              className="rounded-2xl border border-slate-200/80 dark:border-white/8 bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm p-6 hover:border-brand-300/60 dark:hover:border-brand-500/20 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl mb-4 block" aria-hidden="true">{icon}</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-6xl px-4 pb-24" aria-labelledby="cta-heading">
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-brand-600 via-violet-600 to-accent-500 px-8 py-16 text-center text-white">
          {/* Animated orbs inside CTA */}
          <div className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-2xl animate-float" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl animate-float-slow" aria-hidden="true" />
          <div className="relative">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-extrabold mb-3">Ready to explore the world?</h2>
            <p className="text-white/75 text-base mb-8 max-w-md mx-auto">
              Create your first itinerary in under a minute. No credit card. No sign-up.
            </p>
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-brand-700 hover:bg-brand-50 active:scale-95 transition-all duration-200 shadow-xl"
            >
              Plan a free trip →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
