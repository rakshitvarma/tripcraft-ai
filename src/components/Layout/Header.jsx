import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/',      label: 'Home'      },
  { to: '/plan',  label: 'Plan Trip' },
  { to: '/trips', label: 'My Trips'  },
]

export default function Header({ dark, onToggleDark }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-brand-700 dark:text-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded"
          aria-label="TripCraft home"
        >
          <span aria-hidden="true">✈️</span>
          TripCraft
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
                    `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                      isActive
                        ? 'bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
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
            className="ml-2 rounded-lg p-2 text-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  )
}
