import { useState, memo } from 'react'
import { formatDate } from '../../utils/formatters'

const TYPE_STYLE = {
  food:          'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  sightseeing:   'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  transport:     'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  accommodation: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  leisure:       'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
}

const DAY_GRADIENTS = [
  'from-brand-500 to-violet-600',
  'from-sky-400 to-blue-600',
  'from-emerald-400 to-teal-600',
  'from-amber-400 to-orange-500',
  'from-pink-400 to-rose-500',
  'from-purple-400 to-indigo-600',
  'from-cyan-400 to-blue-500',
]

function DayCard({ day, defaultOpen = false, currency = 'USD' }) {
  const [open, setOpen] = useState(defaultOpen)
  const gradient = DAY_GRADIENTS[(day.day - 1) % DAY_GRADIENTS.length]

  return (
    <article className="overflow-hidden rounded-2xl border border-white/40 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/70 backdrop-blur-md shadow-sm" aria-label={`Day ${day.day}: ${day.theme}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500 hover:bg-white/30 dark:hover:bg-slate-700/30 transition-colors duration-150"
        aria-expanded={open}
        aria-controls={`day-${day.day}-content`}
      >
        <div className="flex items-center gap-3">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-md`}>
            {day.day}
          </span>
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">{day.theme}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(day.date)}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div id={`day-${day.day}-content`} className="border-t border-slate-200/60 dark:border-slate-600/40 bg-white/30 dark:bg-slate-900/30 px-6 py-4 space-y-4">
          <ol className="space-y-4" aria-label={`Activities for day ${day.day}`}>
            {day.activities.map((act, i) => (
              <li key={i} className="flex gap-3">
                <time
                  className="shrink-0 w-14 text-xs font-mono text-slate-400 dark:text-slate-500 pt-0.5"
                  dateTime={act.time}
                >
                  {act.time}
                </time>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <p className="font-semibold text-slate-900 dark:text-white">{act.title}</p>
                    {act.type && (
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_STYLE[act.type] ?? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                        {act.type}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{act.description}</p>
                  {(act.estimatedCost ?? act.estimatedCostUSD) > 0 && (
                    <p className="mt-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                      ~{new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(act.estimatedCost ?? act.estimatedCostUSD)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {day.tips && (
            <div className="rounded-xl bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-700/30 backdrop-blur-sm px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
              <span className="font-bold">💡 Local tip: </span>
              {day.tips}
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default memo(DayCard)
