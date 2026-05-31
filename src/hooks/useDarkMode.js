import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('wander_ai_dark')
    if (stored !== null) return stored === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('wander_ai_dark', dark)
  }, [dark])

  return [dark, setDark]
}
