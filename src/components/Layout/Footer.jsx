export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
      <p>
        &copy; {new Date().getFullYear()} WanderAI — Powered by{' '}
        <span className="font-medium text-slate-700">Gemini</span> &amp;{' '}
        <span className="font-medium text-slate-700">OpenWeatherMap</span>
      </p>
      <p className="mt-1">Built for explorers. Travel responsibly.</p>
    </footer>
  )
}
