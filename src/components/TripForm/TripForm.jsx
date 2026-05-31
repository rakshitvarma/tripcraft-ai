import { useState, lazy, Suspense, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import StyleSelector from './StyleSelector'
import BudgetSlider from './BudgetSlider'
import { useWeather } from '../../hooks/useWeather'
import { nightsBetween } from '../../utils/formatters'

const WeatherWidget = lazy(() => import('../Weather/WeatherWidget'))

const today = new Date().toISOString().split('T')[0]

const INITIAL = {
  destination:  '',
  startDate:    '',
  endDate:      '',
  budget:       3000,
  currency:     'USD',
  travelStyle:  'cultural',
  constraints:  '',
}

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="mt-1 text-xs text-red-500 dark:text-red-400" role="alert">{msg}</p>
}

export default function TripForm() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Use only the city name (before first comma) for weather lookup
  const weatherCity = form.destination.split(',')[0].trim()
  const { weather, loading: wLoading, error: wError } = useWeather(weatherCity)
  const nights = nightsBetween(form.startDate, form.endDate)

  const set = useCallback((field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }, [])

  const validate = useCallback(() => {
    const e = {}
    if (!form.destination.trim()) e.destination = 'Please enter a destination.'
    if (!form.startDate) e.startDate = 'Select a start date.'
    if (!form.endDate) e.endDate = 'Select an end date.'
    if (form.startDate && form.endDate && form.endDate <= form.startDate)
      e.endDate = 'End date must be after start date.'
    return e
  }, [form])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      document.getElementById(Object.keys(errs)[0])?.focus()
      return
    }
    sessionStorage.setItem('tripPrefs', JSON.stringify(form))
    navigate('/result')
  }, [validate, form, navigate])

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Trip preference form" className="space-y-6">

      {/* Destination */}
      <div>
        <label htmlFor="destination" className="label-base">
          Destination <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <LocationInput
          value={form.destination}
          onChange={(v) => set('destination', v)}
          error={errors.destination}
        />
        <FieldError msg={errors.destination} />
        {(weather || wLoading || wError) && (
          <div className="mt-3">
            <Suspense fallback={null}>
              <WeatherWidget weather={weather} loading={wLoading} error={wError} compact />
            </Suspense>
          </div>
        )}
      </div>

      {/* Dates */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="label-base dark:text-slate-300 mb-0">
            When are you going? <span aria-hidden="true" className="text-red-500">*</span>
          </span>
          {nights > 0 && (
            <span className="rounded-full bg-brand-50 dark:bg-brand-900/40 px-3 py-0.5 text-xs font-semibold text-brand-700 dark:text-brand-400">
              {nights} night{nights > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="startDate" className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Start date
            </label>
            <input
              id="startDate"
              type="date"
              className="input-base dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
              value={form.startDate}
              min={today}
              onChange={(e) => set('startDate', e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.startDate}
            />
            <FieldError msg={errors.startDate} />
          </div>
          <div>
            <label htmlFor="endDate" className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              End date
            </label>
            <input
              id="endDate"
              type="date"
              className="input-base dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
              value={form.endDate}
              min={form.startDate || today}
              onChange={(e) => set('endDate', e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.endDate}
            />
            <FieldError msg={errors.endDate} />
          </div>
        </div>
      </div>

      {/* Budget */}
      <BudgetSlider
        value={form.budget}
        onChange={(v) => set('budget', v)}
        currency={form.currency}
        onCurrencyChange={(c) => set('currency', c)}
      />

      {/* Travel style */}
      <StyleSelector value={form.travelStyle} onChange={(v) => set('travelStyle', v)} />

      {/* Constraints */}
      <div>
        <label htmlFor="constraints" className="label-base dark:text-slate-300">
          Special Requirements{' '}
          <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="constraints"
          className="input-base resize-none "
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
