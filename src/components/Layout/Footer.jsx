import { NavLink } from 'react-router-dom'
import Logo from '../Logo'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-white/[0.06] bg-white/50 dark:bg-black/40 backdrop-blur-xl mt-8">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
          <Logo size={22} />
          <span className="text-sm font-extrabold tracking-tight gradient-text">TripCraft AI</span>
        </NavLink>

        {/* Links */}
        <nav className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500" aria-label="Footer navigation">
          <NavLink to="/"      className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Home</NavLink>
          <NavLink to="/plan"  className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Plan Trip</NavLink>
          <NavLink to="/trips" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">My Trips</NavLink>
        </nav>

        {/* Credits */}
        <p className="text-xs text-slate-400 dark:text-slate-600">
          Powered by Gemini AI &amp; OpenWeatherMap · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
