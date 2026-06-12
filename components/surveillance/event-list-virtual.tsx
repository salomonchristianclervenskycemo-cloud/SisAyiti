"use client"

import { useCallback, useMemo, useRef, useState, memo } from "react"
import { Search } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import type { SeismicEventUI } from "@/lib/seismic-types"
import { SurveillanceEventListItem } from "./event-list-item"

const ROW_HEIGHT = 96
const OVERSCAN = 5

type Props = {
  events: SeismicEventUI[]
  selectedId: string | null
  onSelect: (e: SeismicEventUI) => void
  height?: number
}

function SurveillanceEventListVirtualInner({
  events,
  selectedId,
  onSelect,
  height = 520,
}: Props) {
  const { t, lang } = useLang()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const rafRef = useRef<number | null>(null)

  const onScroll = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      if (scrollRef.current) setScrollTop(scrollRef.current.scrollTop)
    })
  }, [])

  const { start, end, offsetY, totalHeight } = useMemo(() => {
    const visible = Math.ceil(height / ROW_HEIGHT) + OVERSCAN * 2
    const startIdx = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN)
    const endIdx = Math.min(events.length, startIdx + visible)
    return {
      start: startIdx,
      end: endIdx,
      offsetY: startIdx * ROW_HEIGHT,
      totalHeight: events.length * ROW_HEIGHT,
    }
  }, [scrollTop, height, events.length])

  const slice = useMemo(() => events.slice(start, end), [events, start, end])
  const unknownRegion = t("act.unknownRegion")

  if (events.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-14 px-6 text-center rounded-2xl border border-dashed border-border/60 bg-muted/20"
        role="status"
      >
        <Search size={36} className="text-muted-foreground/30 mb-3" aria-hidden />
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{t("act.noEvents")}</p>
      </div>
    )
  }

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="surveillance-scroll overflow-y-auto pr-1 relative rounded-xl border border-border/40 bg-muted/10"
      style={{ height }}
      role="listbox"
      aria-label={t("act.eventFeed")}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {slice.map((event) => (
            <SurveillanceEventListItem
              key={event.id}
              event={event}
              isSelected={selectedId === event.id}
              lang={lang}
              unknownRegion={unknownRegion}
              onSelect={onSelect}
              style={{ height: ROW_HEIGHT - 10 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const SurveillanceEventListVirtual = memo(SurveillanceEventListVirtualInner)
