export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
      <p>
        &copy; {new Date().getFullYear()} TripCraft — Powered by{' '}
        <span className="font-medium text-slate-700 dark:text-slate-300">Gemini</span> &amp;{' '}
        <span className="font-medium text-slate-700 dark:text-slate-300">OpenWeatherMap</span>
      </p>
      <p className="mt-1">Built for explorers. Travel responsibly.</p>
    </footer>
  )
}
