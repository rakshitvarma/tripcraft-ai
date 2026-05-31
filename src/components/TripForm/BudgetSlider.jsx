import { formatBudget } from '../../utils/formatters'

const MIN = 200
const MAX = 20_000
const STEP = 100

export const CURRENCIES = [
  { code: 'USD', label: 'USD – US Dollar',        symbol: '$'  },
  { code: 'EUR', label: 'EUR – Euro',              symbol: '€'  },
  { code: 'GBP', label: 'GBP – British Pound',    symbol: '£'  },
  { code: 'INR', label: 'INR – Indian Rupee',      symbol: '₹'  },
  { code: 'JPY', label: 'JPY – Japanese Yen',      symbol: '¥'  },
  { code: 'AUD', label: 'AUD – Australian Dollar', symbol: 'A$' },
  { code: 'CAD', label: 'CAD – Canadian Dollar',   symbol: 'C$' },
  { code: 'SGD', label: 'SGD – Singapore Dollar',  symbol: 'S$' },
  { code: 'AED', label: 'AED – UAE Dirham',        symbol: 'د.إ'},
  { code: 'CHF', label: 'CHF – Swiss Franc',       symbol: 'Fr' },
]

/**
 * @param {{ value: number, onChange: (n: number) => void, currency: string, onCurrencyChange: (c: string) => void }} props
 */
export default function BudgetSlider({ value, onChange, currency, onCurrencyChange }) {
  const pct = ((value - MIN) / (MAX - MIN)) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 gap-3 flex-wrap">
        <label htmlFor="budget-slider" className="label-base mb-0 dark:text-slate-300">
          Total Budget
        </label>
        <div className="flex items-center gap-2">
          {/* Currency picker */}
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            aria-label="Select currency"
            className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800
                       text-slate-700 dark:text-slate-200 text-xs font-medium px-2 py-1.5
                       focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>

          <span
            className="rounded-full bg-brand-50 dark:bg-brand-900/40 px-3 py-0.5 text-sm font-semibold text-brand-700 dark:text-brand-400"
            aria-live="polite"
            aria-label={`Budget: ${formatBudget(value, currency)}`}
          >
            {formatBudget(value, currency)}
          </span>
        </div>
      </div>

      <input
        id="budget-slider"
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-brand-600"
        style={{ background: `linear-gradient(to right, #2563eb ${pct}%, ${pct}%)` }}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={value}
        aria-valuetext={formatBudget(value, currency)}
      />

      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{formatBudget(MIN, currency)}</span>
        <span>{formatBudget(MAX, currency)}</span>
      </div>
    </div>
  )
}
