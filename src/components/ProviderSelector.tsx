import { PROVIDERS, PROVIDER_COLORS } from '../constants'

interface ProviderSelectorProps {
  selected: string
  onToggle: (provider: string) => void
}

export default function ProviderSelector({
  selected,
  onToggle,
}: ProviderSelectorProps) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 border-b border-white/5 flex-wrap">
      <span className="text-[10px] tracking-[0.14em] text-zinc-600 font-mono shrink-0">
        PROVIDER
      </span>

      {PROVIDERS.map((p) => {
        const isActive = selected === p
        const color = PROVIDER_COLORS[p]

        return (
          <button
            key={p}
            onClick={() => onToggle(p)}
            style={
              isActive
                ? {
                    borderColor: color + '66',
                    backgroundColor: color + '1a',
                    color,
                  }
                : undefined
            }
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono
              transition-all duration-150 border
              ${
                isActive
                  ? ''
                  : 'border-white/10 bg-white/[0.03] text-zinc-500 hover:border-white/20 hover:text-zinc-300'
              }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: color }}
            />
            {p}
          </button>
        )
      })}
    </div>
  )
}