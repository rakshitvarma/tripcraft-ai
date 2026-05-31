import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/',      label: 'Home'      },
  { to: '/plan',  label: 'Plan Trip' },
  { to: '/trips', label: 'My Trips'  },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 rounded"
          aria-label="WanderAI home"
        >
          <span aria-hidden="true">✈️</span>
          WanderAI
        </NavLink>

        {/* Skip-to-content for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-brand-600 focus:px-3 focus:py-1 focus:text-sm focus:text-white focus:z-50"
        >
          Skip to content
        </a>

        <ul className="flex items-center gap-1" role="list">
          {NAV.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
