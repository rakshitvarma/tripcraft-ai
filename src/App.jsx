import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import { useDarkMode } from './hooks/useDarkMode'

const Home   = lazy(() => import('./pages/Home'))
const Plan   = lazy(() => import('./pages/Plan'))
const Result = lazy(() => import('./pages/Result'))
const Trips  = lazy(() => import('./pages/Trips'))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent border-b-violet-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useDarkMode()

  return (
    <BrowserRouter>
      <div className={`flex min-h-screen flex-col transition-colors duration-300 ${dark ? 'bg-mesh-dark' : 'bg-mesh'}`}>
        <Header dark={dark} onToggleDark={() => setDark(d => !d)} />
        <main id="main-content" className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"        element={<Home />} />
                <Route path="/plan"    element={<Plan />} />
                <Route path="/result"  element={<Result />} />
                <Route path="/trips"   element={<Trips />} />
                <Route path="*"        element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
