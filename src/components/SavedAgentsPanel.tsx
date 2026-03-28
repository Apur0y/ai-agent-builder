
import type { AgentData, SavedAgent } from '../types'
import SavedAgentCard from './SavedAgentCard'

interface SavedAgentsPanelProps {
  agents: SavedAgent[]
  data: AgentData | null
  onLoad: (agent: SavedAgent) => void
  onDelete: (index: number) => void
  onClearAll: () => void
}

export default function SavedAgentsPanel({
  agents,
  data,
  onLoad,
  onDelete,
  onClearAll,
}: SavedAgentsPanelProps) {
  if (agents.length === 0) return null

  return (
    <section className="px-6 py-5 border-t border-white/5 bg-white/1">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[10px] font-mono tracking-[0.14em] text-zinc-600">
            SAVED AGENTS
          </h2>
          <span className="text-[10px] font-mono px-1.5 py-px rounded-full bg-amber-500/10 text-amber-500/60">
            {agents.length}
          </span>
        </div>

        <button
          onClick={onClearAll}
          className="text-[11px] font-mono px-3 py-1 rounded cursor-pointer
            bg-red-500/10 border border-red-500/20 text-red-400
            hover:bg-red-500/18 transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-3">
        {agents.map((agent, index) => (
          <SavedAgentCard
            key={index}
            agent={agent}
            data={data}
            onLoad={() => onLoad(agent)}
            onDelete={() => onDelete(index)}
          />
        ))}
      </div>
    </section>
  )
}