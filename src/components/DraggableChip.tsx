interface DraggableChipProps {
  label: string
  sublabel?: string
  accentColor?: string
  onRemove: () => void
}

export default function DraggableChip({
  label,
  sublabel,
  accentColor,
  onRemove,
}: DraggableChipProps) {
  return (
    <div
      draggable
      style={accentColor ? { borderLeftColor: accentColor } : undefined}
      className="group flex items-center gap-2 px-3 py-2 rounded
        bg-white/[0.04] border border-white/10 border-l-[3px]
        cursor-grab active:cursor-grabbing
        hover:border-amber-500/30 transition-all duration-150"
    >
      {/* Drag handle */}
      <span className="text-zinc-700 text-xs shrink-0 group-hover:text-zinc-500 transition-colors">
        ⠿
      </span>

      {/* Label */}
      <span className="flex-1 text-sm text-zinc-200 font-mono truncate">
        {label}
        {sublabel && (
          <span className="ml-2 text-[10px] text-zinc-600">{sublabel}</span>
        )}
      </span>

      {/* Remove button */}
      <button
        onClick={onRemove}
        className="text-zinc-600 hover:text-red-400 transition-colors text-base leading-none shrink-0"
        title="Remove"
      >
        ×
      </button>
    </div>
  )
}