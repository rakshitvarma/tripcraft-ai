import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StyleSelector from './StyleSelector'
import BudgetSlider from './BudgetSlider'
import { useWeather } from '../../hooks/useWeather'
import WeatherWidget from '../Weather/WeatherWidget'

const today = new Date().toISOString().split('T')[0]

const INITIAL = {
  destination:  '',
  startDate:    '',
  endDate:      '',
  budget:       3000,
  travelStyle:  'cultural',
  constraints:  '',
}

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="mt-1 text-xs text-red-600" role="alert">{msg}</p>
}

/**
 * Core trip preference form.  On submit, stashes prefs in sessionStorage and
 * navigates to /result where generation occurs — keeping the form page clean.
 */
export default function TripForm() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Live weather preview as the user types a destination
  const { weather, loading: wLoading, error: wError } = useWeather(form.destination)

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.destination.trim()) e.destination = 'Please enter a destination.'
    if (!form.startDate) e.startDate = 'Select a start date.'
    if (!form.endDate) e.endDate = 'Select an end date.'
    if (form.startDate && form.endDate && form.endDate <= form.startDate)
      e.endDate = 'End date must be after start date.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      // Move focus to the first error field for accessibility
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.focus()
      return
    }
    sessionStorage.setItem('tripPrefs', JSON.stringify(form))
    navigate('/result')
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Trip preference form"
      className="space-y-6"
    >
      {/* Destination */}
      <div>
        <label htmlFor="destination" className="label-base">
          Destination <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="destination"
          type="text"
          className="input-base"
          placeholder="e.g. Tokyo, Japan"
          value={form.destination}
          onChange={(e) => set('destination', e.target.value)}
          autoComplete="off"
          aria-required="true"
          aria-describedby={errors.destination ? 'destination-error' : undefined}
          aria-invalid={!!errors.destination}
        />
        <FieldError msg={errors.destination} />

        {/* Inline weather preview */}
        {(weather || wLoading || wError) && (
          <div className="mt-3">
            <WeatherWidget weather={weather} loading={wLoading} error={wError} compact />
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="label-base">
            Arrival Date <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="startDate"
            type="date"
            className="input-base"
            value={form.startDate}
            min={today}
            onChange={(e) => set('startDate', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.startDate}
          />
          <FieldError msg={errors.startDate} />
        </div>

        <div>
          <label htmlFor="endDate" className="label-base">
            Departure Date <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="endDate"
            type="date"
            className="input-base"
            value={form.endDate}
            min={form.startDate || today}
            onChange={(e) => set('endDate', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.endDate}
          />
          <FieldError msg={errors.endDate} />
        </div>
      </div>

      {/* Budget */}
      <BudgetSlider value={form.budget} onChange={(v) => set('budget', v)} />

      {/* Travel style */}
      <StyleSelector value={form.travelStyle} onChange={(v) => set('travelStyle', v)} />

      {/* Constraints */}
      <div>
        <label htmlFor="constraints" className="label-base">
          Special Requirements{' '}
          <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="constraints"
          className="input-base resize-none"
          rows={3}
          placeholder="Dietary restrictions, mobility needs, must-see spots, things to avoid…"
          value={form.constraints}
          onChange={(e) => set('constraints', e.target.value)}
          maxLength={500}
        />
        <p className="mt-1 text-right text-xs text-slate-400">
          {form.constraints.length}/500
        </p>
      </div>

      <button type="submit" className="btn-primary w-full py-3 text-base">
        Generate My Itinerary ✈️
      </button>
    </form>
  )
}
