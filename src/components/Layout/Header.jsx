import { NavLink } from 'react-router-dom'
import Logo from '../Logo'

const NAV = [
  { to: '/',      label: 'Home'      },
  { to: '/plan',  label: 'Plan Trip' },
  { to: '/trips', label: 'My Trips'  },
]

export default function Header({ dark, onToggleDark, session, onLogout }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 dark:border-white/[0.06] bg-white/70 dark:bg-black/60 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 group"
          aria-label="TripCraft home"
        >
          <Logo size={26} className="group-hover:scale-110 transition-transform duration-200 drop-shadow-sm" />
          <span className="text-lg font-extrabold tracking-tight gradient-text">TripCraft</span>
        </NavLink>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-brand-600 focus:px-3 focus:py-1 focus:text-sm focus:text-white focus:z-50"
        >
          Skip to content
        </a>

        {/* Nav + controls */}
        <div className="flex items-center gap-1">
          <ul className="flex items-center gap-0.5" role="list">
            {NAV.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-2 flex items-center gap-1.5">
            {/* User chip */}
            {session && (
              <>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {session.username}
                </span>
                <button
                  type="button"
                  onClick={onLogout}
                  aria-label="Sign out"
                  className="rounded-lg p-1.5 text-slate-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            )}

            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={onToggleDark}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-150"
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
        </div>
      </nav>
    </header>
  )
}
