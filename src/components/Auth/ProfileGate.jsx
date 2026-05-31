import { useState, useCallback } from 'react'
import { createProfile, loginProfile, saveSession, loadProfiles } from '../../utils/auth'

const PASSCODE_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/

function StrengthBar({ passcode }) {
  let strength = 0
  if (passcode.length >= 6) strength++
  if (/[A-Z]/.test(passcode)) strength++
  if (/[0-9]/.test(passcode)) strength++
  if (/[@$!%*#?&]/.test(passcode)) strength++

  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-500']
  const labels = ['Weak', 'Fair', 'Good', 'Strong']

  if (!passcode) return null

  return (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="flex gap-1 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < strength ? colors[strength - 1] : 'bg-slate-200 dark:bg-slate-700'}`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400 w-12">{labels[strength - 1] ?? ''}</span>
    </div>
  )
}

export default function ProfileGate({ onAuth }) {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [username, setUsername] = useState('')
  const [passcode, setPasscode] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const hasExistingProfiles = loadProfiles().length > 0

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim()) { setError('Please enter a username.'); return }
    if (!passcode) { setError('Please enter a passcode.'); return }

    if (mode === 'signup' && !PASSCODE_REGEX.test(passcode)) {
      setError('Passcode must be at least 6 characters and include both letters and numbers.')
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
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-r from-brand-400/20 via-violet-400/20 to-accent-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gradient-to-tl from-pink-400/15 to-violet-400/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="lgGate" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="50%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#f43f5e"/>
                </linearGradient>
              </defs>
              <path d="M28 12.5L20 16l-6-8-2 1 3 8.5L9 19l-2-2.5-1.5.5 1.5 4.5L8.5 26l1.5-.5-.5-3 2.5-1.5 5.5 7 2-1-1-9L26 14l2-1.5z" fill="url(#lgGate)"/>
            </svg>
            <span className="text-2xl font-extrabold gradient-text">TripCraft</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {mode === 'login' ? 'Welcome back' : 'Create your profile'}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {mode === 'login' ? 'Sign in to access your saved trips.' : 'Your trips are stored privately under your passcode.'}
          </p>
        </div>

        <div className="card-glass p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                {mode === 'signup' && (
                  <span className="ml-1 font-normal text-slate-400 text-xs">(letters + numbers, min 6 chars)</span>
                )}
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
                  onClick={() => setShowPass((v) => !v)}
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
              <p className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 px-4 py-2.5 text-sm text-red-600 dark:text-red-400" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary w-full py-3" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  {mode === 'signup' ? 'Creating profile…' : 'Signing in…'}
                </span>
              ) : mode === 'signup' ? 'Create Profile' : 'Sign In'}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            {mode === 'login' ? (
              <>No profile yet?{' '}
                <button type="button" onClick={() => { setMode('signup'); setError('') }} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  Create one
                </button>
              </>
            ) : (
              <>Already have a profile?{' '}
                <button type="button" onClick={() => { setMode('login'); setError('') }} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>

          {/* Security note */}
          <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
            🔒 Passcodes are hashed with SHA-256 and never stored in plaintext.
          </p>
        </div>
      </div>
    </div>
  )
}
