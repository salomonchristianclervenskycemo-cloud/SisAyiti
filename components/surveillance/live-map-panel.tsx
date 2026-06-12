"use client"

import dynamic from "next/dynamic"
import { Globe } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { cn } from "@/lib/utils"
import type { SeismicEventUI } from "@/lib/seismic-types"
import { GlassCard } from "./glass-card"

const LiveWorldMap = dynamic(
  () => import("@/components/ui/live-world-map").then((m) => m.LiveWorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[220px] surveillance-shimmer rounded-lg" />
    ),
  }
)

type Props = {
  events: SeismicEventUI[]
  selectedEventId: string | null
  onSelectEvent: (e: SeismicEventUI) => void
  className?: string
}

export function SurveillanceLiveMapPanel({
  events,
  selectedEventId,
  onSelectEvent,
  className,
}: Props) {
  const { t } = useLang()

  return (
    <GlassCard
      className={cn("p-1.5 flex flex-col relative", className ?? "min-h-[260px]")}
    >
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 text-[11px] font-semibold bg-background/90 px-2.5 py-1.5 rounded-lg backdrop-blur-md border border-border/50 shadow-sm">
        <Globe size={14} className="text-primary" aria-hidden />
        {t("act.liveMap")}
      </div>
      <div className="absolute top-3 right-3 z-10 text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/25">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 motion-safe:animate-pulse mr-1" aria-hidden />
        LIVE
      </div>
      <div className="flex-1 rounded-lg overflow-hidden min-h-[220px]">
        <LiveWorldMap
          events={events}
          selectedEventId={selectedEventId}
          onSelectEvent={onSelectEvent}
        />
      </div>
    </GlassCard>
  )
}
