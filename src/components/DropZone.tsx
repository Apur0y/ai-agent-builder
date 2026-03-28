import { useState } from 'react'

interface DropZoneProps {
  label: string
  icon: string
  count: number
  emptyText: string
  onDrop: (id: string) => void
  children: React.ReactNode
}

export default function DropZone({
  label,
  icon,
  count,
  emptyText,
  onDrop,
  children,
}: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      {/* Label row */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono tracking-[0.12em] text-amber-500/80">
          {icon} {label}
        </span>
        <span className="text-[10px] font-mono px-1.5 py-px rounded-full bg-amber-500/10 text-amber-500/60">
          {count}
        </span>
      </div>

      {/* Drop target */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          const id = e.dataTransfer.getData('text/plain')
          if (id) onDrop(id)
        }}
        className={`min-h-[90px] rounded-lg p-3 flex flex-col gap-2 transition-all duration-150
          ${
            isDragOver
              ? 'border-2 border-dashed border-amber-400/60 bg-amber-500/5'
              : 'border-2 border-dashed border-white/[0.08] bg-white/[0.02]'
          }`}
      >
        {count === 0 ? (
          <p className="m-auto text-xs font-mono text-zinc-700">
            {isDragOver ? '⬇ Drop here' : emptyText}
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  )
}