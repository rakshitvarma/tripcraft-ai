import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/',      label: 'Home'      },
  { to: '/plan',  label: 'Plan Trip' },
  { to: '/trips', label: 'My Trips'  },
]

export default function Header({ dark, onToggleDark }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/20 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded-lg"
          aria-label="TripCraft home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 shadow-md shadow-brand-500/30">
            <span className="text-sm" aria-hidden="true">✈️</span>
          </div>
          <span className="text-xl font-bold gradient-text">TripCraft</span>
        </NavLink>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-brand-600 focus:px-3 focus:py-1 focus:text-sm focus:text-white focus:z-50"
        >
          Skip to content
        </a>

        <div className="flex items-center gap-1">
          <ul className="flex items-center gap-1" role="list">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                      isActive
                        ? 'bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50/50 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-2 rounded-xl p-2 text-slate-500 dark:text-slate-400
                       bg-slate-100/80 dark:bg-slate-800/80
                       hover:bg-brand-50 dark:hover:bg-slate-700
                       hover:text-brand-600 dark:hover:text-brand-400
                       transition-all duration-150
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
