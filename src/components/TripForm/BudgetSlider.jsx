import { useState } from 'react'

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
  const [inputVal, setInputVal] = useState(String(value))
  const symbol = CURRENCIES.find(c => c.code === currency)?.symbol ?? currency

  function commit(raw) {
    const n = parseInt(String(raw).replace(/\D/g, ''), 10)
    if (!isNaN(n) && n >= 1) {
      onChange(n)
      setInputVal(String(n))
    } else {
      setInputVal(String(value))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
        <label htmlFor="budget-input" className="label-base mb-0">
          Total Budget
        </label>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          aria-label="Select currency"
          className="rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5
                     text-slate-700 dark:text-slate-300 text-xs font-medium px-2.5 py-1.5
                     focus:outline-none focus:ring-2 focus:ring-brand-500/40 cursor-pointer backdrop-blur-sm"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500 pointer-events-none select-none">
          {symbol}
        </span>
        <input
          id="budget-input"
          type="number"
          min={1}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && commit(inputVal)}
          placeholder="Enter your budget"
          className="input-base pl-9"
          aria-label={`Budget amount in ${currency}`}
        />
      </div>
      <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-600">
        Covers local transport, accommodation, food, activities &amp; misc only.
      </p>
    </div>
  )
}
