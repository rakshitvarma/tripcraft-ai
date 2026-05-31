export default function Footer() {
  return (
    <footer className="border-t border-white/20 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl py-8">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-violet-600 shadow-sm">
            <span className="text-xs" aria-hidden="true">✈️</span>
          </div>
          <span className="font-bold gradient-text text-sm">TripCraft</span>
          <span className="hidden sm:inline">—</span>
          <span className="hidden sm:inline">Built for explorers</span>
        </div>
        <p>
          Powered by{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-300">Gemini AI</span>
          {' '}&amp;{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-300">OpenWeatherMap</span>
          {' '}· &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
