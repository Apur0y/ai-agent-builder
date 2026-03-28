import { formatTime } from '../hooks/useSessionTimer'

interface HeaderProps {
  sessionTime: number
  loading: boolean
  onReload: () => void
}

export default function Header({ sessionTime, loading, onReload }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 bg-stone-800/90 backdrop-blur border-b border-white/5">
      {/* Logo + title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-linear-to-br from-purple-700 to-indigo-700 flex items-center justify-center text-white font-black text-base select-none">
          ⬡
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-widest text-zinc-100 font-mono">
            AGENT FORGE
          </h1>
          <p className="text-[10px] tracking-widest text-zinc-600 font-mono">
            AI AGENT CONFIGURATION SYSTEM
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Session timer */}
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {formatTime(sessionTime)}
        </div>

        {/* Reload button */}
        <button
          onClick={onReload}
          disabled={loading}
          className="px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-30
            bg-amber-500/10 border border-amber-500/30 text-amber-400
            hover:bg-amber-500/20 hover:border-amber-500/50
            active:scale-95"
        >
          {loading ? '↻ SYNCING…' : '↻ RELOAD'}
        </button>
      </div>
    </header>
  )
}