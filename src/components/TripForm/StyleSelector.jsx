const STYLES = [
  { value: 'adventure',   label: 'Adventure',    icon: '🏔️' },
  { value: 'cultural',    label: 'Cultural',     icon: '🏛️' },
  { value: 'relaxation',  label: 'Relaxation',   icon: '🏖️' },
  { value: 'foodie',      label: 'Foodie',       icon: '🍜' },
  { value: 'budget',      label: 'Budget',       icon: '💰' },
  { value: 'luxury',      label: 'Luxury',       icon: '🥂' },
  { value: 'family',      label: 'Family',       icon: '👨‍👩‍👧' },
  { value: 'solo',        label: 'Solo',         icon: '🎒' },
]

/**
 * @param {{ value: string, onChange: (v: string) => void }} props
 */
export default function StyleSelector({ value, onChange }) {
  return (
    <fieldset>
      <legend className="label-base">Travel Style</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Travel style">
        {STYLES.map((s) => {
          const selected = value === s.value
          return (
            <label
              key={s.value}
              className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 p-3 text-sm font-medium transition-all duration-150 select-none
                ${selected
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
            >
              <input
                type="radio"
                name="travelStyle"
                value={s.value}
                checked={selected}
                onChange={() => onChange(s.value)}
                className="sr-only"
                aria-label={s.label}
              />
              <span className="text-2xl" aria-hidden="true">{s.icon}</span>
              <span>{s.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
