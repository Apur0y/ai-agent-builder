import { useState, useEffect } from 'react'

export function useSessionTimer(): number {
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setSessionTime((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  return sessionTime
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}