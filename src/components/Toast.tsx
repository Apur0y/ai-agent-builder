import { useEffect } from 'react'

interface ToastProps {
  message: string
  onDismiss: () => void
}

export default function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 border border-amber-500/40 text-amber-400 text-sm font-mono shadow-2xl animate-slide-up">
      <span className="text-amber-400">✓</span>
      {message}
    </div>
  )
}