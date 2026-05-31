import { useState, useCallback } from 'react'
import { createProfile, loginProfile, saveSession, loadProfiles } from '../../utils/auth'
import Logo from '../Logo'

const PASSCODE_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/

const FEATURES = [
  { icon: '🤖', label: 'AI Itineraries',  desc: 'Google AI builds your full day-by-day plan instantly.' },
  { icon: '⛅', label: 'Live Weather',    desc: 'Real-time conditions as you plan — no surprises.' },
  { icon: '💰', label: 'Budget Planner',  desc: 'Multi-currency breakdown across food, stays & activities.' },
  { icon: '🔒', label: 'Private Trips',   desc: 'Passcode-protected. Your trips, only yours.' },
]

const ITINERARY_PREVIEW = [
  { time: 'Morning',   title: 'Senso-ji Temple',        type: 'sightseeing', cost: '¥0'    },
  { time: 'Afternoon', title: 'Shibuya Crossing',       type: 'leisure',     cost: '¥500'  },
  { time: 'Evening',   title: 'Ramen at Ichiran',       type: 'food',        cost: '¥1,200'},
]

const TYPE_COLOR = {
  sightseeing: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
  leisure:     'bg-pink-500/20 text-pink-400 border-pink-500/20',
  food:        'bg-orange-500/20 text-orange-400 border-orange-500/20',
}

function StrengthBar({ passcode }) {
  let s = 0
  if (passcode.length >= 6) s++
  if (/[A-Z]/.test(passcode)) s++
  if (/[0-9]/.test(passcode)) s++
  if (/[@$!%*#?&]/.test(passcode)) s++
  const colors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-500']
  const labels = ['Weak', 'Fair', 'Good', 'Strong']
  if (!passcode) return null
  return (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="flex gap-1 flex-1">
        {[0,1,2,3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < s ? colors[s-1] : 'bg-white/10'}`} />
        ))}
      </div>
      <span className="text-xs text-slate-500 w-10 text-right">{labels[s-1] ?? ''}</span>
    </div>
  )
}

export default function ProfileGate({ onAuth, dark, onToggleDark }) {
  const [mode, setMode]       = useState(() => loadProfiles().length > 0 ? 'login' : 'signup')
  const [username, setUsername] = useState('')
  const [passcode, setPasscode] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setError('')
    if (!username.trim()) { setError('Please enter a username.'); return }
    if (!passcode)        { setError('Please enter a passcode.'); return }
    if (mode === 'signup' && !PASSCODE_REGEX.test(passcode)) {
      setError('Passcode must be at least 6 characters with letters and numbers.')
      return
    }
    setLoading(true)
    try {
      const session = mode === 'signup'
        ? await createProfile(username.trim(), passcode)
        : await loginProfile(username.trim(), passcode)
      saveSession(session)
      onAuth(session)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [mode, username, passcode, onAuth])

  return (
    <div className="relative flex min-h-screen overflow-hidden">

      {/* ── Animated background orbs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-brand-500/20 blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-accent-500/15 blur-3xl animate-float-delay" />
        <div className="absolute inset-0 dot-grid-light dark:dot-grid" />
      </div>

      {/* ── LEFT — Hero / App Info ── */}
      <div className="relative hidden lg:flex flex-col justify-between flex-1 px-16 py-12 max-w-[58%]">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-xl font-extrabold gradient-text">TripCraft</span>
          </div>
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-lg p-2 text-slate-400 dark:text-slate-500 hover:bg-white/10 transition-colors"
          >
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* Hero text */}
        <div className="my-auto">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
            AI Travel Planner · Free to use
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white mb-5">
            Your trip, planned<br />
            <span className="gradient-text">by AI. In seconds.</span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-md mb-10">
            Tell TripCraft where you're going and we'll build a complete itinerary —
            activities, budget, weather, packing list and emergency contacts.
          </p>

          {/* Feature list */}
          <div className="grid grid-cols-2 gap-3 mb-12">
            {FEATURES.map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl border border-slate-200/60 dark:border-white/8 bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm px-4 py-3">
                <span className="text-xl mt-0.5" aria-hidden="true">{icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Animated itinerary preview card */}
          <div className="rounded-2xl border border-slate-200/60 dark:border-white/8 bg-white/50 dark:bg-white/[0.04] backdrop-blur-md p-5 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-0.5">Sample itinerary</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">Tokyo, Japan · Day 1</p>
              </div>
              <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-500">AI Generated</span>
            </div>
            <div className="space-y-2.5">
              {ITINERARY_PREVIEW.map(({ time, title, type, cost }, i) => (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-slate-100 dark:border-white/5 px-3 py-2.5 animate-fade-up"
                  style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
                >
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-600 w-16 shrink-0">{time}</span>
                  <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{title}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${TYPE_COLOR[type]}`}>{type}</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-500 shrink-0">{cost}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400 dark:text-slate-600">Budget breakdown · Packing list · Emergency contacts</span>
              <span className="text-xs font-mono text-brand-400">+6 more days →</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} TripCraft · Powered by Google AI &amp; OpenWeatherMap
        </p>
      </div>

      {/* ── Divider ── */}
      <div className="hidden lg:block w-px bg-slate-200/60 dark:bg-white/[0.06] my-0" aria-hidden="true" />

      {/* ── RIGHT — Auth form ── */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12 lg:max-w-[42%]">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <Logo size={26} />
          <span className="text-xl font-extrabold gradient-text">TripCraft</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {mode === 'login' ? 'Welcome back' : 'Get started free'}
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              {mode === 'login'
                ? 'Sign in to access your private saved trips.'
                : 'Create a profile — your trips stay private under your passcode.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="pg-username" className="label-base">Username</label>
              <input
                id="pg-username"
                type="text"
                className="input-base"
                placeholder="e.g. rakshit"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError('') }}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
              />
            </div>

            {/* Passcode */}
            <div>
              <label htmlFor="pg-passcode" className="label-base">
                Passcode
                {mode === 'signup' && <span className="ml-1 font-normal text-slate-400 text-xs">· min 6 chars, letters + numbers</span>}
              </label>
              <div className="relative">
                <input
                  id="pg-passcode"
                  type={showPass ? 'text' : 'password'}
                  className="input-base pr-10"
                  placeholder="e.g. Travel42x"
                  value={passcode}
                  onChange={(e) => { setPasscode(e.target.value); setError('') }}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  aria-label={showPass ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPass ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {mode === 'signup' && <StrengthBar passcode={passcode} />}
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-4 py-2.5 text-sm text-red-600 dark:text-red-400" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary w-full py-3 text-base" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  {mode === 'signup' ? 'Creating profile…' : 'Signing in…'}
                </span>
              ) : mode === 'signup' ? 'Create Profile →' : 'Sign In →'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-500">
            {mode === 'login' ? (
              <>No profile yet?{' '}
                <button type="button" onClick={() => { setMode('signup'); setError('') }} className="font-semibold text-brand-500 dark:text-brand-400 hover:underline">
                  Create one
                </button>
              </>
            ) : (
              <>Already have a profile?{' '}
                <button type="button" onClick={() => { setMode('login'); setError('') }} className="font-semibold text-brand-500 dark:text-brand-400 hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>

          <div className="mt-8 rounded-xl border border-slate-200/60 dark:border-white/8 bg-white/40 dark:bg-white/[0.03] px-4 py-3 flex items-center gap-3">
            <span className="text-lg" aria-hidden="true">🔒</span>
            <p className="text-xs text-slate-500 dark:text-slate-500 leading-snug">
              Passcodes are hashed with <span className="font-semibold text-slate-700 dark:text-slate-400">SHA-256</span> and never stored in plaintext. Your trips are fully private.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
