import { lazy, Suspense, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import ProfileGate from './components/Auth/ProfileGate'
import { useDarkMode } from './hooks/useDarkMode'
import { loadSession, clearSession } from './utils/auth'

const Home   = lazy(() => import('./pages/Home'))
const Plan   = lazy(() => import('./pages/Plan'))
const Result = lazy(() => import('./pages/Result'))
const Trips  = lazy(() => import('./pages/Trips'))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-brand-500/20 border-t-brand-500 animate-spin" />
        <div className="absolute inset-1 rounded-full border-2 border-violet-500/20 border-b-violet-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.6s' }} />
      </div>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useDarkMode()
  const [session, setSession] = useState(loadSession)

  const handleAuth   = useCallback((s) => setSession(s), [])
  const handleLogout = useCallback(() => { clearSession(); setSession(null) }, [])

  const bgClass = dark ? 'bg-mesh-dark' : 'bg-mesh'

  if (!session) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${bgClass}`}>
        <ProfileGate onAuth={handleAuth} dark={dark} onToggleDark={() => setDark(d => !d)} />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className={`flex min-h-screen flex-col transition-colors duration-300 ${bgClass}`}>
        <Header dark={dark} onToggleDark={() => setDark(d => !d)} session={session} onLogout={handleLogout} />
        <main id="main-content" className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"       element={<Home />} />
                <Route path="/plan"   element={<Plan />} />
                <Route path="/result" element={<Result />} />
                <Route path="/trips"  element={<Trips />} />
                <Route path="*"       element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
