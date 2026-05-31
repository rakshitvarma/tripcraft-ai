import { memo } from 'react'

/** @type {Array<{value: string, label: string, icon: string}>} */
const TRAVEL_STYLES = [
  { value: 'adventure',  label: 'Adventure',  icon: '🏔️' },
  { value: 'cultural',   label: 'Cultural',   icon: '🏛️' },
  { value: 'relaxation', label: 'Relaxation', icon: '🏖️' },
  { value: 'foodie',     label: 'Foodie',     icon: '🍜' },
  { value: 'budget',     label: 'Budget',     icon: '💰' },
  { value: 'luxury',     label: 'Luxury',     icon: '🥂' },
  { value: 'family',     label: 'Family',     icon: '👨‍👩‍👧' },
  { value: 'solo',       label: 'Solo',       icon: '🎒' },
]

const SELECTED_CLS = 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-400'
const DEFAULT_CLS  = 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
const BASE_CLS     = 'flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 p-3 text-sm font-medium transition-all duration-150 select-none'

/**
 * Radio-button grid for selecting a travel style.
 * @param {{ value: string, onChange: (v: string) => void }} props
 */
function StyleSelector({ value, onChange }) {
  return (
    <fieldset>
      <legend className="label-base">Travel Style</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TRAVEL_STYLES.map((style) => {
          const selected = value === style.value
          return (
            <label
              key={style.value}
              className={`${BASE_CLS} ${selected ? SELECTED_CLS : DEFAULT_CLS}`}
            >
              <input
                type="radio"
                name="travelStyle"
                value={style.value}
                checked={selected}
                onChange={() => onChange(style.value)}
                className="sr-only"
                aria-label={style.label}
              />
              <span className="text-2xl" aria-hidden="true">{style.icon}</span>
              <span>{style.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default memo(StyleSelector)
