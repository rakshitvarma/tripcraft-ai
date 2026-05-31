import { useState, useEffect, useRef, useCallback } from 'react'

const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

/**
 * Location input with live city autocomplete via OpenWeatherMap Geocoding API.
 */
export default function LocationInput({ value, onChange, error }) {
  const [query, setQuery]         = useState(value)
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen]           = useState(false)
  const [loading, setLoading]     = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const containerRef              = useRef(null)
  const key                       = import.meta.env.VITE_OPENWEATHER_API_KEY

  const debouncedQuery = useDebounce(query, 350)

  // Fetch suggestions
  useEffect(() => {
    const q = debouncedQuery.trim()
    if (q.length < 2) { setSuggestions([]); setOpen(false); return }

    let cancelled = false
    setLoading(true)
    fetch(`${GEO_URL}?q=${encodeURIComponent(q)}&limit=6&appid=${key}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        const seen = new Set()
        const results = (Array.isArray(data) ? data : [])
          .map(c => ({
            label: [c.name, c.state, c.country].filter(Boolean).join(', '),
            name:  c.name,
          }))
          .filter(c => {
            if (seen.has(c.label)) return false
            seen.add(c.label)
            return true
          })
        setSuggestions(results)
        setOpen(results.length > 0)
        setActiveIdx(-1)
      })
      .catch(() => setSuggestions([]))
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [debouncedQuery, key])

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = useCallback((label) => {
    setQuery(label)
    onChange(label)
    setSuggestions([])
    setOpen(false)
    setActiveIdx(-1)
  }, [onChange])

  function handleKeyDown(e) {
    if (!open || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      select(suggestions[activeIdx].label)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          id="destination"
          type="text"
          className={`input-base pr-9 ${error ? 'border-red-400 focus:ring-red-400/40' : ''}`}
          placeholder="e.g. Tokyo, Japan"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onChange(e.target.value)
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          autoComplete="off"
          aria-required="true"
          aria-invalid={!!error}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="location-suggestions"
          aria-activedescendant={activeIdx >= 0 ? `suggestion-${activeIdx}` : undefined}
          role="combobox"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <svg className="h-4 w-4 animate-spin text-brand-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </span>
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <ul
          id="location-suggestions"
          role="listbox"
          aria-label="Location suggestions"
          className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-700 shadow-xl dark:shadow-black/40 backdrop-blur-xl"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.label}
              id={`suggestion-${i}`}
              role="option"
              aria-selected={i === activeIdx}
              onMouseDown={(e) => { e.preventDefault(); select(s.label) }}
              onMouseEnter={() => setActiveIdx(i)}
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors duration-100
                ${i === activeIdx
                  ? 'bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                }
                ${i !== suggestions.length - 1 ? 'border-b border-slate-100 dark:border-white/5' : ''}
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{s.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
