import { formatBudget } from '../../utils/formatters'

const MIN = 200
const MAX = 20_000
const STEP = 100

/**
 * @param {{ value: number, onChange: (n: number) => void }} props
 */
export default function BudgetSlider({ value, onChange }) {
  const pct = ((value - MIN) / (MAX - MIN)) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor="budget-slider" className="label-base mb-0">
          Total Budget
        </label>
        <span
          className="rounded-full bg-brand-50 px-3 py-0.5 text-sm font-semibold text-brand-700"
          aria-live="polite"
          aria-label={`Budget: ${formatBudget(value)}`}
        >
          {formatBudget(value)}
        </span>
      </div>

      <input
        id="budget-slider"
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none rounded-full bg-slate-200 cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-brand-600"
        style={{ background: `linear-gradient(to right, #2563eb ${pct}%, #e2e8f0 ${pct}%)` }}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={value}
        aria-valuetext={formatBudget(value)}
      />

      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{formatBudget(MIN)}</span>
        <span>{formatBudget(MAX)}</span>
      </div>
    </div>
  )
}
