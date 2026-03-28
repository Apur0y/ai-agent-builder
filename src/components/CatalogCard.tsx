interface CatalogCardProps {
  id: string
  title: string
  subtitle?: string
  description: string
  accentColor?: string
  isSelected: boolean
  onDragStart: (id: string, e: React.DragEvent) => void
  onClick: (id: string) => void
}

export default function CatalogCard({
  id,
  title,
  subtitle,
  description,
  accentColor,
  isSelected,
  onDragStart,
  onClick,
}: CatalogCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', id)
        onDragStart(id, e)
      }}
      onClick={() => onClick(id)}
      style={
        accentColor && isSelected
          ? { borderLeftColor: accentColor }
          : accentColor
          ? { borderLeftColor: accentColor + '44' }
          : undefined
      }
      className={`
        group relative p-3 rounded-md cursor-pointer select-none transition-all duration-150
        border-l-[3px]
        ${
          isSelected
            ? 'bg-amber-500/10 border border-amber-500/40 border-l-amber-400'
            : 'bg-white/3 border border-white/[0.07] hover:bg-white/6 hover:border-white/[0.14]'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-sm font-semibold text-zinc-100 font-mono leading-snug">
          {title}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          {subtitle && (
            <span className="text-[10px] text-zinc-500 border border-zinc-700 rounded px-1.5 py-px">
              {subtitle}
            </span>
          )}
          {isSelected && (
            <span className="text-amber-400 text-xs">✓</span>
          )}
        </div>
      </div>
      <p className="text-[12px] text-zinc-500 leading-relaxed">{description}</p>

      {/* Drag hint on hover */}
      <span className="absolute top-2 right-2 text-zinc-700 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        ⠿
      </span>
    </div>
  )
}