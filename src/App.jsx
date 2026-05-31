import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import { useDarkMode } from './hooks/useDarkMode'

const Home   = lazy(() => import('./pages/Home'))
const Plan   = lazy(() => import('./pages/Plan'))
const Result = lazy(() => import('./pages/Result'))
const Trips  = lazy(() => import('./pages/Trips'))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <div className="h-8 w-8 rounded-full border-4 border-brand-200 border-t-brand-600 animate-spin" />
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useDarkMode()

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <Header dark={dark} onToggleDark={() => setDark(d => !d)} />
        <main id="main-content" className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"        element={<Home />} />
              <Route path="/plan"    element={<Plan />} />
              <Route path="/result"  element={<Result />} />
              <Route path="/trips"   element={<Trips />} />
              <Route path="*"        element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
