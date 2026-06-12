"use client"

import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"
import type { HaitiEarthquakePhase } from "@/shared/ville-game"
import { villeBtn, villeBtnActive } from "./civ1-theme"

type Props = {
  phases: HaitiEarthquakePhase[]
  phaseIndex: number
  phaseReports: { magnitude: number }[]
}

export function PhaseCampaignBar({ phases, phaseIndex, phaseReports }: Props) {
  const { t } = useLang()

  return (
    <div className="flex flex-wrap gap-1.5">
      {phases.map((ph, i) => {
        const done = i < phaseReports.length
        const active = i === phaseIndex
        return (
          <div
            key={ph.id}
            className={cn(
              villeBtn,
              "flex-1 min-w-[72px] text-center text-[10px] py-2 px-1",
              active && villeBtnActive,
              done && !active && "bg-green-500/15 border-green-500/40"
            )}
            title={t(ph.detailKey)}
          >
            <div className="font-black text-primary">M{ph.magnitude}</div>
            <div className="truncate opacity-80">{done ? "✓" : `${t("ville.phase")} ${i + 1}`}</div>
          </div>
        )
      })}
    </div>
  )
}
