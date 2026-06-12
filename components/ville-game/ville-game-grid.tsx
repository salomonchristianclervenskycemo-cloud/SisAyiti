"use client"

import { cn } from "@/lib/utils"
import type { ShakeResult, VilleCell } from "@/shared/ville-game"
import { VilleGridCell } from "./ville-grid-cell"
import { villeMapFrame } from "./civ1-theme"

type Props = {
  gridRef: React.RefObject<HTMLDivElement | null>
  grid: VilleCell[]
  gridSize: number
  selectedCell: number | null
  selectedCells: Set<number>
  shakeResults: Record<number, ShakeResult>
  shaking: boolean
  onCellClick: (index: number, ctrlKey: boolean) => void
  ariaLabel: string
}

export function VilleGameGrid({
  gridRef,
  grid,
  gridSize,
  selectedCell,
  selectedCells,
  shakeResults,
  shaking,
  onCellClick,
  ariaLabel,
}: Props) {
  return (
    <div className={cn(villeMapFrame, shaking && "animate-[shake_0.5s_ease-in-out_infinite]")}>
      <div
        ref={gridRef}
        tabIndex={0}
        role="grid"
        aria-label={ariaLabel}
        className="grid gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg p-1"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {grid.map((cell, i) => (
          <VilleGridCell
            key={cell.id}
            cell={cell}
            selected={selectedCell === i || selectedCells.has(i)}
            shakeResult={shakeResults[i] ?? cell.damage}
            shaking={shaking}
            onClick={(e) => onCellClick(i, e.ctrlKey)}
          />
        ))}
      </div>
    </div>
  )
}
