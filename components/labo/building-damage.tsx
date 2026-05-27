import { DamageState } from "@/lib/seismic-engine"
import type { Lang } from "@/lib/i18n"
import { l } from "@/lib/i18n"

interface BuildingDamageProps {
  damageState: DamageState
  lang: Lang
}

const COLLAPSE_BANNER = { fr: "EFFONDREMENT", kr: "TONBE", en: "COLLAPSE", es: "COLAPSO" }

const DAMAGE_LABELS: Record<DamageState, { fr: string; kr: string; en: string; es: string }> = {
  none: { fr: "Intact", kr: "An entegrite", en: "Intact", es: "Intacto" },
  slight: { fr: "Fissuré", kr: "Fisire", en: "Cracked", es: "Agrietado" },
  moderate: { fr: "Fissuré", kr: "Fisire", en: "Cracked", es: "Agrietado" },
  extensive: { fr: "Endommagé", kr: "Domaje", en: "Damaged", es: "Dañado" },
  complete: { fr: "Effondré", kr: "Tonbe", en: "Collapsed", es: "Colapsado" },
}

export function BuildingDamage({ damageState, lang }: BuildingDamageProps) {
  const cracked = damageState === "slight" || damageState === "moderate"
  const damaged = damageState === "extensive"
  const collapsed = damageState === "complete"

  const getLabel = () => l(DAMAGE_LABELS[damageState], lang)

  return (
    <svg viewBox="0 0 120 160" className="w-24 h-32 md:w-28 md:h-36" aria-label={l({ fr: "Dommages au bâtiment", kr: "Domaj sou bilding", en: "Building damage", es: "Daños al edificio" }, lang)}>
      <defs>
        <linearGradient id="buildGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={collapsed ? "#7f1d1d" : damaged ? "#b91c1c" : cracked ? "#f97316" : "#1A5E9A"}/>
          <stop offset="100%" stopColor={collapsed ? "#450a0a" : damaged ? "#7f1d1d" : cracked ? "#c2410c" : "#0D2B55"}/>
        </linearGradient>
      </defs>
      {/* Roof */}
      {!collapsed && (
        <polygon
          points={damaged ? "10,60 60,20 110,60" : "20,55 60,15 100,55"}
          fill={damaged ? "#b91c1c" : cracked ? "#f97316" : "#2E8BC0"}
          opacity="0.9"
          transform={damaged ? "rotate(8, 60, 40)" : undefined}
          style={{ transition: "all 0.5s ease" }}
        />
      )}
      {/* Body */}
      <rect
        x={collapsed ? "5" : "15"}
        y={collapsed ? "100" : "55"}
        width={collapsed ? "110" : "90"}
        height={collapsed ? "55" : "95"}
        fill="url(#buildGrad)"
        transform={collapsed ? undefined : damaged ? "skewX(-8) translate(8,0)" : undefined}
        rx="2"
        style={{ transition: "all 0.5s ease" }}
      />
      {/* Windows */}
      {!collapsed && [0,1,2].map(row => [0,1].map(col => (
        <rect key={`${row}${col}`}
          x={30 + col*30}
          y={65 + row*28}
          width="18" height="18" rx="2"
          fill={cracked ? "#fca5a5" : "#93c5fd"}
          opacity={damaged ? 0.3 : 0.7}
          style={{ transition: "all 0.5s ease" }}
        />
      )))}
      {/* Cracks */}
      {cracked && !collapsed && (
        <>
          <line x1="40" y1="65" x2="35" y2="100" stroke="#fca5a5" strokeWidth="1.5" opacity="0.7"/>
          <line x1="80" y1="70" x2="85" y2="110" stroke="#fca5a5" strokeWidth="1.5" opacity="0.7"/>
        </>
      )}
      {/* Rubble */}
      {collapsed && (
        <>
          {[10,25,40,55,70,85,100].map(x => (
            <rect key={x} x={x} y={130 + Math.sin(x)*8} width="14" height="12" rx="1" fill="#b91c1c" opacity="0.7" transform={`rotate(${x*3})`}/>
          ))}
          <text x="60" y="155" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">
            {l(COLLAPSE_BANNER, lang)}
          </text>
        </>
      )}
      {/* Status label */}
      <text x="60" y="13" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">
        {getLabel()}
      </text>
    </svg>
  )
}
