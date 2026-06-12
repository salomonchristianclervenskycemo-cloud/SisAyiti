"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ShakeResult, TerrainType, VilleCell } from "@/shared/ville-game"
import { BuildingArt, CivTerrainTile, DamageOverlay } from "./building-art"
import { villeTile, villeTileSelected } from "./civ1-theme"
import { VILLE_PALETTE as P } from "./ville-palette"
import { Wrench, Heart, Shield, HardHat } from "lucide-react"

const TERRAIN_LABEL: Record<TerrainType, string> = {
  rock: "ROC",
  soft: "SM",
  clay: "ARG",
}

type Props = {
  cell: VilleCell
  selected: boolean
  shakeResult: ShakeResult | null
  shaking: boolean
  onClick: (e: React.MouseEvent) => void
}

function TerrainBadge({ terrain }: { terrain: TerrainType }) {
  const t = P.terrain[terrain]
  return (
    <span
      className="absolute top-1 left-1 text-[9px] font-black px-1.5 py-0.5 rounded-sm leading-none z-20"
      style={{
        backgroundColor: P.badge.pill,
        color: t.label,
        border: `1.5px solid ${t.light}`,
        boxShadow: `0 1px 3px ${P.outline}88`,
      }}
    >
      {TERRAIN_LABEL[terrain]}
    </span>
  )
}

export function VilleGridCell({ cell, selected, shakeResult, shaking, onClick }: Props) {
  const damage = cell.damage ?? (shakeResult && shakeResult !== "good" ? shakeResult : null)
  const displayDamage = damage === "damaged" || damage === "collapsed" ? damage : null

  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={shaking ? { x: [-3, 3, -2, 2, 0] } : { x: 0 }}
      transition={shaking ? { duration: 0.1, repeat: Infinity } : { duration: 0.2 }}
      className={cn(
        villeTile,
        "shadow-[inset_1px_1px_0_rgba(255,255,255,0.12),inset_-1px_-1px_0_rgba(0,0,0,0.2)]",
        selected && villeTileSelected,
        displayDamage === "damaged" && "border-amber-500",
        displayDamage === "collapsed" && "border-red-600"
      )}
      style={
        selected
          ? {
              boxShadow: `0 0 0 2px ${P.status.select.ring}, 0 0 16px ${P.status.select.glow}, inset 1px 1px 0 rgba(255,255,255,0.15)`,
            }
          : undefined
      }
    >
      <CivTerrainTile terrain={cell.terrain} revealed={cell.soilRevealed} />

      {cell.building && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center pointer-events-none z-10",
            displayDamage === "collapsed" && "opacity-50 saturate-50"
          )}
        >
          <BuildingArt type={cell.building} level={cell.reinforceLevel} />
        </div>
      )}

      <DamageOverlay damage={displayDamage} />

      {cell.soilRevealed && cell.terrain && <TerrainBadge terrain={cell.terrain} />}

      {displayDamage && (
        <span
          className="absolute top-1 right-1 z-20 p-0.5 rounded-sm flex items-center justify-center"
          style={{ backgroundColor: P.status.repair.bg, color: P.status.repair.fg }}
        >
          <Wrench size={11} strokeWidth={2.5} />
        </span>
      )}

      {cell.reinforceLevel > 0 && !displayDamage && (
        <span
          className="absolute bottom-1 right-1 z-20 flex items-center gap-0.5 px-1 rounded-sm text-[9px] font-bold"
          style={{ backgroundColor: P.badge.pill, color: "#7dd3fc", border: "1px solid #38bdf8" }}
        >
          <HardHat size={10} />
          {cell.reinforceLevel}
        </span>
      )}

      {cell.sensitized && (
        <span
          className="absolute bottom-1 left-1 z-20 p-0.5 rounded-sm"
          style={{ backgroundColor: P.badge.pill }}
        >
          <Heart size={11} className="text-pink-400 fill-pink-500" strokeWidth={2} />
        </span>
      )}

      {cell.zoningLocked && (
        <span
          className="absolute bottom-1 left-6 z-20 p-0.5 rounded-sm"
          style={{ backgroundColor: P.badge.pill }}
        >
          <Shield size={11} className="text-sky-300" strokeWidth={2} />
        </span>
      )}
    </motion.button>
  )
}
