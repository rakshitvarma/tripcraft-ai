import { useState, memo } from 'react'
import { formatDate } from '../../utils/formatters'

const TYPE_COLOR = {
  food:          'bg-orange-100 text-orange-700',
  sightseeing:   'bg-blue-100 text-blue-700',
  transport:     'bg-purple-100 text-purple-700',
  accommodation: 'bg-green-100 text-green-700',
  leisure:       'bg-pink-100 text-pink-700',
}

/**
 * @param {{ day: object, defaultOpen?: boolean }} props
 */
function DayCard({ day, defaultOpen = false, currency = 'USD' }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <article className="card overflow-hidden p-0" aria-label={`Day ${day.day}: ${day.theme}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-500"
        aria-expanded={open}
        aria-controls={`day-${day.day}-content`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
            {day.day}
          </span>
          <div>
            <p className="font-semibold text-slate-900">{day.theme}</p>
            <p className="text-xs text-slate-500">{formatDate(day.date)}</p>
          </div>
        </div>
        <span
          className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {open && (
        <div id={`day-${day.day}-content`} className="border-t border-slate-100 px-6 py-4 space-y-4">
          <ol className="space-y-4" aria-label={`Activities for day ${day.day}`}>
            {day.activities.map((act, i) => (
              <li key={i} className="flex gap-3">
                <time
                  className="shrink-0 w-14 text-xs font-mono text-slate-400 pt-0.5"
                  dateTime={act.time}
                >
                  {act.time}
                </time>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <p className="font-medium text-slate-900">{act.title}</p>
                    {act.type && (
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLOR[act.type] ?? 'bg-slate-100 text-slate-600'}`}>
                        {act.type}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{act.description}</p>
                  {(act.estimatedCost ?? act.estimatedCostUSD) > 0 && (
                    <p className="mt-1 text-xs text-slate-400">
                      ~{new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(act.estimatedCost ?? act.estimatedCostUSD)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {day.tips && (
            <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
              <span className="font-semibold" aria-hidden="true">💡 </span>
              <span className="font-semibold">Local tip: </span>
              {day.tips}
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default memo(DayCard)
