"use client"

import type { BuildingType, TerrainType } from "@/shared/ville-game"
import { VILLE_PALETTE as P } from "./ville-palette"

const SVG_STROKE = { stroke: P.outline, strokeWidth: 1.2, strokeLinejoin: "round" as const }

/** Tuile terrain — contraste élevé + relief type Civ1 */
export function CivTerrainTile({
  terrain,
  revealed,
}: {
  terrain: TerrainType | null
  revealed: boolean
}) {
  if (!revealed || !terrain) {
    return (
      <div className="absolute inset-0" style={{ backgroundColor: P.fogBg }}>
        <svg className="absolute inset-0 w-full h-full opacity-50" aria-hidden>
          <defs>
            <pattern id="fogGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill={P.fogBg} />
              <path d="M0 8 L8 0" stroke={P.fogPattern} strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fogGrid)" />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            textShadow: `0 0 8px ${P.outline}, 0 2px 0 ${P.outline}`,
          }}
        >
          <span className="text-2xl font-black" style={{ color: P.fogMark }}>
            ?
          </span>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ background: `linear-gradient(to top, ${P.outline}66, transparent)` }}
        />
      </div>
    )
  }

  const t = P.terrain[terrain]

  return (
    <svg viewBox="0 0 32 32" className="absolute inset-0 w-full h-full" aria-hidden preserveAspectRatio="none">
      <rect width="32" height="32" fill={P.grassBase} />
      <rect x="1" y="1" width="30" height="30" fill={t.fill} />
      <rect x="1" y="1" width="30" height="4" fill={t.light} opacity="0.45" />
      <rect x="1" y="27" width="30" height="4" fill={t.accent} opacity="0.55" />
      {terrain === "rock" && (
        <polygon
          points="8,24 16,10 24,24"
          fill={t.light}
          stroke={P.outline}
          strokeWidth="1.2"
        />
      )}
      {terrain === "soft" && (
        <>
          <ellipse cx="11" cy="18" rx="4" ry="2" fill={t.light} opacity="0.7" />
          <ellipse cx="22" cy="20" rx="3" ry="1.5" fill={t.light} opacity="0.6" />
        </>
      )}
      {terrain === "clay" && (
        <path
          d="M4 26 Q16 12 28 26"
          fill="none"
          stroke={t.accent}
          strokeWidth="1.5"
          opacity="0.8"
        />
      )}
    </svg>
  )
}

export function BuildingArt({ type, level = 0 }: { type: BuildingType; level?: number }) {
  if (!type) return null
  const wrap = "w-[74%] h-[74%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]"
  switch (type) {
    case "school":
      return <SchoolSprite level={level} className={wrap} />
    case "house":
      return <HouseSprite level={level} className={wrap} />
    case "hospital":
      return <HospitalSprite level={level} className={wrap} />
    case "rescue":
      return <RescueArt level={level} className={wrap} />
    default:
      return null
  }
}

function SchoolSprite({ level, className }: { level: number; className: string }) {
  const b = P.building.school
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="5" y="14" width="22" height="14" fill={b.main} rx="1" {...SVG_STROKE} />
      <polygon points="16,5 27,14 5,14" fill={b.roof} {...SVG_STROKE} />
      <rect x="13" y="18" width="6" height="10" fill={b.door} stroke={P.outline} strokeWidth="1" />
      {level > 0 && <rect x="7" y="16" width="4" height="9" fill={b.highlight} {...SVG_STROKE} />}
      {level > 1 && <rect x="21" y="16" width="4" height="9" fill={b.highlight} {...SVG_STROKE} />}
    </svg>
  )
}

function HouseSprite({ level, className }: { level: number; className: string }) {
  const b = P.building.house
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="7" y="16" width="18" height="12" fill={b.main} rx="1" {...SVG_STROKE} />
      <polygon points="16,7 27,16 5,16" fill={b.roof} {...SVG_STROKE} />
      <rect x="14" y="20" width="4" height="8" fill={b.door} stroke={P.outline} strokeWidth="1" />
      {level > 0 && (
        <rect x="9" y="18" width="5" height="5" fill={b.window} stroke={P.outline} strokeWidth="0.8" />
      )}
    </svg>
  )
}

function HospitalSprite({ level, className }: { level: number; className: string }) {
  const b = P.building.hospital
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="11" width="24" height="17" fill={b.wall} stroke={b.stroke} strokeWidth="2" rx="2" />
      <rect x="14" y="15" width="4" height="13" fill={b.cross} />
      <rect x="10" y="19" width="12" height="4" fill={b.cross} />
      <rect x="14" y="15" width="4" height="13" fill="none" stroke={P.outlineLight} strokeWidth="0.6" />
      {level > 0 && (
        <circle cx="25" cy="9" r="4" fill={b.badge} stroke={P.outline} strokeWidth="1" />
      )}
    </svg>
  )
}

function RescueArt({ level, className }: { level: number; className: string }) {
  const b = P.building.rescue
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="6" y="14" width="20" height="13" fill={b.main} rx="1" {...SVG_STROKE} />
      <polygon points="16,6 25,14 7,14" fill={b.roof} {...SVG_STROKE} />
      <path
        d="M16 18v8M13 21h6"
        stroke={P.outline}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M16 18v8M13 21h6" stroke={b.cross} strokeWidth="1.8" strokeLinecap="round" />
      {level > 0 && <rect x="21" y="16" width="3" height="10" fill={b.roof} {...SVG_STROKE} />}
    </svg>
  )
}

export function DamageOverlay({ damage }: { damage: "damaged" | "collapsed" | null }) {
  if (!damage) return null
  if (damage === "collapsed") {
    const s = P.status.collapsed
    return (
      <div
        className="absolute inset-0 flex items-center justify-center rounded-md"
        style={{ backgroundColor: `${s.bg}cc`, border: `2px solid ${s.border}` }}
      >
        <span
          className="text-3xl font-black leading-none"
          style={{ color: s.icon, textShadow: `0 0 6px ${P.outline}` }}
        >
          ✕
        </span>
      </div>
    )
  }
  const s = P.status.damaged
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none rounded-md"
        style={{ border: `2px dashed ${s.border}`, backgroundColor: `${s.bg}55` }}
      />
      <svg className="absolute top-1 right-1 w-5 h-5" viewBox="0 0 16 16" aria-hidden>
        <path
          d="M1 14 L8 3 L15 14 Z"
          fill={s.bg}
          stroke={s.border}
          strokeWidth="1.5"
        />
        <path d="M5 11 L11 11" stroke={s.icon} strokeWidth="1.5" />
      </svg>
      <div
        className="absolute bottom-1 left-1 right-1 h-2 rounded-sm"
        style={{ backgroundColor: s.border }}
      />
    </>
  )
}

export function TerrainTexture(props: { terrain: string | null; revealed: boolean }) {
  return (
    <CivTerrainTile terrain={props.terrain as TerrainType | null} revealed={props.revealed} />
  )
}
