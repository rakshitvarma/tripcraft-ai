import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('tripcraft_dark')
      if (stored !== null) return stored === 'true'
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try { localStorage.setItem('tripcraft_dark', String(dark)) } catch {}
  }, [dark])

  return [dark, setDark]
}
