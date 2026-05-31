import { useState } from 'react'
import { formatBudget } from '../../utils/formatters'

const SLIDER_MIN = 200
const SLIDER_MAX = 20_000
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

export default function BudgetSlider({ value, onChange, currency, onCurrencyChange }) {
  // Raw string for the custom input so users can type freely
  const [inputVal, setInputVal] = useState(String(value))
  const [customMode, setCustomMode] = useState(false)

  const pct = Math.min(100, ((value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100)

  function commitCustom(raw) {
    const n = parseInt(raw.replace(/\D/g, ''), 10)
    if (!isNaN(n) && n >= 1) {
      onChange(n)
      setInputVal(String(n))
    } else {
      setInputVal(String(value))
    }
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        <label htmlFor="budget-slider" className="label-base mb-0 dark:text-slate-300">
          Total Budget
        </label>

        <div className="flex items-center gap-2 flex-wrap">
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

          {/* Toggle between slider and custom input */}
          <button
            type="button"
            onClick={() => {
              setCustomMode((m) => !m)
              setInputVal(String(value))
            }}
            className="text-xs text-brand-600 dark:text-brand-400 underline underline-offset-2 hover:text-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 rounded"
            aria-label={customMode ? 'Switch to slider' : 'Enter custom amount'}
          >
            {customMode ? 'Use slider' : 'Custom amount'}
          </button>
        </div>
      </div>

      {customMode ? (
        /* Free-text input for any budget */
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500 pointer-events-none">
            {CURRENCIES.find(c => c.code === currency)?.symbol ?? currency}
          </span>
          <input
            type="number"
            min={1}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onBlur={(e) => commitCustom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && commitCustom(inputVal)}
            placeholder="Enter any amount"
            className="input-base pl-8"
            aria-label={`Custom budget in ${currency}`}
          />
        </div>
      ) : (
        /* Slider capped at 20 000 */
        <>
          <input
            id="budget-slider"
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={STEP}
            value={Math.min(value, SLIDER_MAX)}
            onChange={(e) => {
              const n = Number(e.target.value)
              onChange(n)
              setInputVal(String(n))
            }}
            className="w-full h-2 appearance-none rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-brand-600"
            style={{ background: `linear-gradient(to right, #2563eb ${pct}%, transparent ${pct}%)` }}
            aria-valuemin={SLIDER_MIN}
            aria-valuemax={SLIDER_MAX}
            aria-valuenow={value}
            aria-valuetext={formatBudget(value, currency)}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{formatBudget(SLIDER_MIN, currency)}</span>
            <span className="font-semibold text-brand-600 dark:text-brand-400">{formatBudget(value, currency)}</span>
            <span>{formatBudget(SLIDER_MAX, currency)}</span>
          </div>
        </>
      )}
    </div>
  )
}
