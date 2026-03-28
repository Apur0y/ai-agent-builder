import { type AgentData, type AgentProfile, type Layer, type Skill } from '../types'
import DropZone from './DropZone'
import DraggableChip from './DraggableChip'

interface BuilderCanvasProps {
  data: AgentData | null
  currentProfile: AgentProfile | null
  currentSkills: Skill[]
  currentLayers: Layer[]
  agentName: string
  onAgentNameChange: (name: string) => void
  onDropProfile: (id: string) => void
  onDropSkill: (id: string) => void
  onDropLayer: (id: string) => void
  onRemoveProfile: () => void
  onRemoveSkill: (id: string) => void
  onRemoveLayer: (id: string) => void
  onSave: () => void
}

export default function BuilderCanvas({
  data,
  currentProfile,
  currentSkills,
  currentLayers,
  agentName,
  onAgentNameChange,
  onDropProfile,
  onDropSkill,
  onDropLayer,
  onRemoveProfile,
  onRemoveSkill,
  onRemoveLayer,
  onSave,
}: BuilderCanvasProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSave()
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      {/* Canvas area */}
      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-5 content-start">

        {/* Profile — spans full width */}
        <div className="md:col-span-2">
          <div className="text-[10px] font-mono tracking-[0.12em] text-amber-500/80 mb-2">
            ◈ BASE PROFILE
          </div>

          {currentProfile ? (
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-amber-500/5 border border-amber-500/25">
              <div>
                <p className="text-sm font-semibold text-zinc-100 mb-1">
                  {currentProfile.name}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {currentProfile.description}
                </p>
              </div>
              <button
                onClick={onRemoveProfile}
                className="text-zinc-600 hover:text-red-400 text-lg leading-none shrink-0 transition-colors cursor-pointer"
              >
                ×
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const id = e.dataTransfer.getData('text/plain')
                if (id && data?.agentProfiles.find((p) => p.id === id)) {
                  onDropProfile(id)
                }
              }}
              className="p-4 rounded-lg border-2 border-dashed border-white/8 bg-white/2
                text-center text-xs font-mono text-zinc-700"
            >
              Click a profile in the catalog, or drag it here
            </div>
          )}
        </div>

        {/* Skills drop zone */}
        <DropZone
          label="SKILLS"
          icon="◆"
          count={currentSkills.length}
          emptyText="Drag skills here"
          onDrop={(id) => {
            if (data?.skills.find((s) => s.id === id)) onDropSkill(id)
          }}
        >
          {currentSkills.map((s) => (
            <DraggableChip
              key={s.id}
              label={s.name}
              sublabel={s.category}
              accentColor="#3b82f6"
              onRemove={() => onRemoveSkill(s.id)}
            />
          ))}
        </DropZone>

        {/* Layers drop zone */}
        <DropZone
          label="PERSONALITY LAYERS"
          icon="◇"
          count={currentLayers.length}
          emptyText="Drag layers here"
          onDrop={(id) => {
            if (data?.layers.find((l) => l.id === id)) onDropLayer(id)
          }}
        >
          {currentLayers.map((l) => (
            <DraggableChip
              key={l.id}
              label={l.name}
              sublabel={l.type}
              accentColor="#a855f7"
              onRemove={() => onRemoveLayer(l.id)}
            />
          ))}
        </DropZone>
      </div>

      {/* Save bar */}
      <div className="px-6 py-4 border-t border-white/5 bg-white/1 flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Name this agent…"
          value={agentName}
          onChange={(e) => onAgentNameChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-45 px-3 py-2 rounded bg-white/4 border border-white/10
            text-zinc-100 font-mono text-sm placeholder:text-zinc-700 outline-none
            focus:border-amber-500/40 transition-colors"
        />
        <button
          onClick={onSave}
          className="px-5 py-2 rounded bg-linear-to-r from-amber-400 to-yellow-300 cursor-pointer
            text-zinc-900 font-mono text-xs font-semibold tracking-widest
            hover:opacity-90 active:scale-95 transition-all"
        >
          SAVE AGENT
        </button>
      </div>
    </div>
  )
}