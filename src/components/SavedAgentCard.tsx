import { useMemo } from 'react'
import { PROVIDER_COLORS } from '../constants'
import type { AgentData, SavedAgent } from '../types'

interface SavedAgentCardProps {
  agent: SavedAgent
  data: AgentData | null
  onLoad: () => void
  onDelete: () => void
}

export default function SavedAgentCard({
  agent,
  data,
  onLoad,
  onDelete,
}: SavedAgentCardProps) {
  // Memoised lookup — avoids recomputing on every parent re-render
  const profile = useMemo(
    () => data?.agentProfiles.find((p) => p.id === agent.profileId) ?? null,
    [data, agent.profileId]
  )

  const providerColor = agent.provider
    ? PROVIDER_COLORS[agent.provider as keyof typeof PROVIDER_COLORS]
    : undefined

  return (
    <div className="flex flex-col p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]
      min-w-[180px] max-w-[220px] flex-1
      hover:border-amber-500/25 transition-colors duration-150">

      {/* Card header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-semibold text-zinc-100 font-mono leading-snug">
          {agent.name}
        </h3>
        {agent.provider && providerColor && (
          <span
            className="text-[10px] px-1.5 py-px rounded font-mono border shrink-0"
            style={{
              color: providerColor,
              borderColor: providerColor + '44',
              background: providerColor + '18',
            }}
          >
            {agent.provider}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-1 text-xs font-mono text-zinc-600 flex-1">
        <span>
          Profile:{' '}
          <span className="text-zinc-400">{profile?.name ?? '—'}</span>
        </span>
        <span>
          Skills:{' '}
          <span className="text-zinc-400">{agent.skillIds?.length ?? 0}</span>
        </span>
        <span>
          Layers:{' '}
          <span className="text-zinc-400">{agent.layerIds?.length ?? 0}</span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={onLoad}
          className="flex-1 py-1.5 rounded text-xs font-mono
            bg-amber-500/10 border border-amber-500/25 text-amber-400
            hover:bg-amber-500/20 transition-colors"
        >
          Load
        </button>
        <button
          onClick={onDelete}
          className="px-2.5 py-1.5 rounded text-sm
            bg-red-500/10 border border-red-500/20 text-red-400
            hover:bg-red-500/20 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  )
}