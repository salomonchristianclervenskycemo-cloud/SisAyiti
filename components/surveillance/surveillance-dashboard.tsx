"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { format } from "date-fns"
import { Activity, Clock, Radio } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/app-context"
import { useSeismicStore } from "@/lib/seismic-store"
import { useSurveillanceDashboard } from "@/hooks/use-surveillance-dashboard"
import { useSurveillanceRealtime } from "@/hooks/use-surveillance-realtime"
import { computeSurveillanceAlerts } from "@/lib/surveillance/alerts"
import { surveillanceEventsToUI } from "@/lib/surveillance/bridge-to-ui"
import { prepareMapNavigationForEvent } from "@/lib/map-navigation"
import { mergeWithHistoricalEvents } from "@/lib/seismic-events-merge"
import { enrichSeismicEvents } from "@/lib/seismic-event-enrich"
import {
  isHistoricalCatalogEvent,
  pickDefaultSurveillanceEvent,
  sortEventsByTimeDesc,
} from "@/lib/surveillance/selection"
import type { SeismicEventUI } from "@/lib/seismic-types"
import { SurveillanceStatusBar } from "./surveillance-status-bar"
import { SurveillanceKpiRow } from "./kpi-row"
import { SurveillanceFilters, type SurveillanceCategory } from "./surveillance-filters"
import { SurveillanceEventListVirtual } from "./event-list-virtual"
import { SurveillanceEventInspector } from "./event-inspector"
import { SurveillanceLiveMapPanel } from "./live-map-panel"
import { SurveillanceMethodologyPanel } from "./methodology-panel"
import { SurveillanceAlertsPanel } from "./alerts-panel"
import { SurveillanceLiveTicker } from "./live-ticker"
import { SurveillanceSectionHeading } from "./section-heading"
import { SurveillanceDashboardSkeleton } from "./dashboard-skeleton"
import { SurveillanceEmptyState } from "./empty-state"
import { ActualiteEducationSection } from "@/components/actualite/actualite-education-section"
import { recordActualiteEventInspected, recordActualiteFilter } from "@/lib/offline-education"

const ActualiteCharts = dynamic(
  () => import("@/components/actualite/actualite-charts").then((m) => m.ActualiteCharts),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 h-[220px] rounded-2xl surveillance-shimmer border border-border/40" />
        <div className="h-[220px] rounded-2xl surveillance-shimmer border border-border/40" />
        <div className="h-[220px] rounded-2xl surveillance-shimmer border border-border/40" />
      </div>
    ),
  }
)

function filterEvents(
  events: SeismicEventUI[],
  category: SurveillanceCategory,
  searchQuery: string,
  minMag: number
): SeismicEventUI[] {
  let filtered = events.filter((e) => e.magnitude >= minMag)

  if (category === "critical") {
    filtered = filtered.filter((e) => e.risk === "critical" || e.magnitude >= 6)
  } else if (category === "tsunami") {
    filtered = filtered.filter((e) => e.tsunami)
  } else if (category === "tectonic") {
    filtered = filtered.filter((e) => e.depth > 50)
  } else if (category === "history") {
    filtered = filtered.filter((e) => e.magnitude >= 7 || e.id.includes("hist"))
  } else if (category === "haiti") {
    filtered = filtered.filter(
      (e) =>
        e.district?.includes("Haïti") ||
        e.district?.includes("Hispaniola") ||
        e.region?.toLowerCase().includes("haiti")
    )
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (e) =>
        e.region?.toLowerCase().includes(q) ||
        e.district?.toLowerCase().includes(q) ||
        e.magnitude.toString().includes(q)
    )
  }

  return sortEventsByTimeDesc(filtered)
}

export function SurveillanceDashboard() {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const setStoreSelected = useSeismicStore((s) => s.setSelectedEvent)

  const liveEnabled = useSeismicStore((s) => s.liveEnabled)
  const liveConnected = useSeismicStore((s) => s.liveConnected)
  const surveillance = useSurveillanceDashboard({ syncToSeismicStore: false })
  useSurveillanceRealtime(liveEnabled, surveillance.refresh)

  const [activeCategory, setActiveCategory] = useState<SurveillanceCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [minMagnitude, setMinMagnitude] = useState(2)
  const [selectedEvent, setSelectedEvent] = useState<SeismicEventUI | null>(null)

  const liveUiEvents = useMemo(
    () => enrichSeismicEvents(surveillanceEventsToUI(surveillance.events)),
    [surveillance.events]
  )

  const uiEvents = useMemo(() => {
    if (activeCategory === "history") {
      return enrichSeismicEvents(mergeWithHistoricalEvents(liveUiEvents))
    }
    return liveUiEvents
  }, [liveUiEvents, activeCategory])

  const alerts = useMemo(
    () => computeSurveillanceAlerts(surveillance.events, { max: 12 }),
    [surveillance.events]
  )

  const selectEvent = useCallback(
    (e: SeismicEventUI) => {
      setSelectedEvent(e)
      setStoreSelected(e)
      recordActualiteEventInspected(e.id)
    },
    [setStoreSelected]
  )

  const handleCategoryChange = useCallback((category: SurveillanceCategory) => {
    setActiveCategory(category)
    recordActualiteFilter(category)
  }, [])

  const openOnMap = useCallback(() => {
    if (!selectedEvent) return
    prepareMapNavigationForEvent(selectedEvent)
    setActiveModule("carte")
  }, [selectedEvent, setActiveModule])

  const focusEventById = useCallback(
    (id: string) => {
      const ev = uiEvents.find((e) => e.id === id)
      if (ev) selectEvent(ev)
    },
    [uiEvents, selectEvent]
  )

  const clearFilters = useCallback(() => {
    setActiveCategory("all")
    setSearchQuery("")
    setMinMagnitude(2)
  }, [])

  const filteredEvents = useMemo(
    () => filterEvents(uiEvents, activeCategory, searchQuery, minMagnitude),
    [uiEvents, activeCategory, searchQuery, minMagnitude]
  )

  const rawSelected = useMemo(
    () => surveillance.events.find((e) => e.id === selectedEvent?.id) ?? null,
    [surveillance.events, selectedEvent?.id]
  )

  useEffect(() => {
    if (filteredEvents.length === 0) {
      setSelectedEvent(null)
      return
    }
    const needsReselect =
      !selectedEvent ||
      !filteredEvents.some((e) => e.id === selectedEvent.id) ||
      (activeCategory !== "history" && isHistoricalCatalogEvent(selectedEvent))

    if (needsReselect) {
      const next = pickDefaultSurveillanceEvent(filteredEvents)
      if (next) selectEvent(next)
    }
  }, [filteredEvents, selectedEvent, selectEvent, activeCategory])

  const chartData = useMemo(
    () =>
      filteredEvents
        .slice(0, 50)
        .reverse()
        .map((e) => ({
          time: format(new Date(e.eventTime), "dd MMM HH:mm"),
          magnitude: e.magnitude,
          depth: e.depth,
          risk: e.risk,
        })),
    [filteredEvents]
  )

  const magDistribution = useMemo(() => {
    const dist = [
      { name: "3-4", count: 0, color: "#3b82f6" },
      { name: "4-5", count: 0, color: "#eab308" },
      { name: "5-6", count: 0, color: "#f97316" },
      { name: "6+", count: 0, color: "#ef4444" },
    ]
    filteredEvents.forEach((e) => {
      if (e.magnitude < 4) dist[0].count++
      else if (e.magnitude < 5) dist[1].count++
      else if (e.magnitude < 6) dist[2].count++
      else dist[3].count++
    })
    return dist
  }, [filteredEvents])

  const depthDistribution = useMemo(() => {
    const dist = [
      { name: "0-20 km", count: 0, color: "#3b82f6" },
      { name: "20-70 km", count: 0, color: "#eab308" },
      { name: "70-300 km", count: 0, color: "#f97316" },
      { name: "> 300 km", count: 0, color: "#ef4444" },
    ]
    filteredEvents.forEach((e) => {
      if (e.depth < 20) dist[0].count++
      else if (e.depth < 70) dist[1].count++
      else if (e.depth < 300) dist[2].count++
      else dist[3].count++
    })
    return dist
  }, [filteredEvents])

  const showInitialSkeleton = surveillance.is_refreshing && uiEvents.length === 0
  const showGlobalEmpty =
    !showInitialSkeleton && uiEvents.length === 0 && !surveillance.is_refreshing
  const showFilteredEmpty =
    !showInitialSkeleton && uiEvents.length > 0 && filteredEvents.length === 0
  const emptyVariant = surveillance.network_error ? "error" : "no-data"
  const resultsBadge = `${filteredEvents.length} ${t("act.results")}`

  return (
    <div className="min-h-full bg-background text-foreground relative">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklch, var(--primary) 18%, transparent), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, color-mix(in oklch, #ef4444 8%, transparent), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[90rem] mx-auto space-y-6 sm:space-y-8 pb-10">
        <SurveillanceStatusBar
          mode={surveillance.mode}
          status_message_key={surveillance.status_message_key}
          last_sync={surveillance.last_sync}
          is_refreshing={surveillance.is_refreshing}
          sources={surveillance.meta?.sources ?? []}
          cache_age_ms={surveillance.cache_age_ms}
          onRefresh={surveillance.refresh}
        />

        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-teal-500/15 border border-primary/25 text-primary shadow-sm">
                <Radio size={22} strokeWidth={2.25} />
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-balance bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
                {t("act.title")}
              </h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty pl-14 sm:pl-0">
              {t("act.subtitle")}
            </p>
            <p className="text-xs text-muted-foreground/90 leading-relaxed max-w-2xl pl-14 sm:pl-0 hidden sm:block">
              {t("act.subtitleLong")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-wide px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5",
                liveConnected && liveEnabled
                  ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "border-border/50 bg-muted/40 text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  liveConnected && liveEnabled
                    ? "bg-emerald-500 motion-safe:animate-pulse"
                    : "bg-muted-foreground/50"
                )}
                aria-hidden
              />
              {liveConnected && liveEnabled ? t("act.connected") : t("act.disconnected")}
            </span>
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 tabular-nums bg-muted/50 border border-border/50 rounded-lg px-3 py-2">
              <Clock size={14} className="text-primary" aria-hidden />
              <span>
                {t("act.lastUpdate")}{" "}
                <strong className="text-foreground font-semibold">
                  {surveillance.last_sync
                    ? format(new Date(surveillance.last_sync), "HH:mm:ss")
                    : "—"}
                </strong>
              </span>
            </p>
          </div>
        </header>

        <ActualiteEducationSection onOpenMap={selectedEvent ? openOnMap : undefined} />

        {showInitialSkeleton ? (
          <SurveillanceDashboardSkeleton />
        ) : (
          <>
            <section aria-labelledby="surv-kpis" className="space-y-4">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
                <div id="surv-kpis" className="xl:col-span-8">
                  <SurveillanceKpiRow kpis={surveillance.kpis} />
                </div>
                <aside className="xl:col-span-4 space-y-4">
                  <SurveillanceLiveMapPanel
                    events={filteredEvents}
                    selectedEventId={selectedEvent?.id ?? null}
                    onSelectEvent={selectEvent}
                    className="min-h-[260px] lg:min-h-[300px]"
                  />
                  <SurveillanceAlertsPanel
                    alerts={alerts}
                    isLoading={surveillance.is_refreshing && alerts.length === 0}
                    onSelectEventId={focusEventById}
                  />
                </aside>
              </div>
            </section>

            <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-background/85 backdrop-blur-lg border-y border-border/40">
              <SurveillanceFilters
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                minMagnitude={minMagnitude}
                onMinMagnitudeChange={setMinMagnitude}
              />
            </div>

            {showGlobalEmpty ? (
              <SurveillanceEmptyState
                variant={emptyVariant}
                onRetry={surveillance.refresh}
                className="min-h-[280px]"
              />
            ) : (
              <section
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
                aria-label={t("act.eventFeed")}
              >
                <div className="lg:col-span-4 flex flex-col gap-3 min-h-0">
                  <SurveillanceSectionHeading
                    icon={Activity}
                    title={t("act.eventFeed")}
                    badge={resultsBadge}
                  />
                  {showFilteredEmpty ? (
                    <SurveillanceEmptyState
                      variant="filtered"
                      onClearFilters={clearFilters}
                      className="min-h-[320px]"
                    />
                  ) : (
                    <SurveillanceEventListVirtual
                      events={filteredEvents}
                      selectedId={selectedEvent?.id ?? null}
                      onSelect={selectEvent}
                    />
                  )}
                </div>

                <div className="lg:col-span-8 space-y-6 min-w-0">
                  {showFilteredEmpty ? (
                    <SurveillanceEmptyState
                      variant="filtered"
                      onClearFilters={clearFilters}
                      className="min-h-[200px]"
                    />
                  ) : (
                    <>
                      <SurveillanceEventInspector
                        uiEvent={selectedEvent}
                        rawEvent={rawSelected}
                        onOpenOnMap={openOnMap}
                      />
                      {filteredEvents.length > 0 && (
                        <div className="content-visibility-auto contain-intrinsic-size-[0_400px]">
                          <ActualiteCharts
                            chartData={chartData}
                            magDistribution={magDistribution}
                            depthDistribution={depthDistribution}
                          />
                        </div>
                      )}
                    </>
                  )}
                  <SurveillanceMethodologyPanel />
                </div>
              </section>
            )}
          </>
        )}

        {!showInitialSkeleton && filteredEvents.length > 0 && (
          <SurveillanceLiveTicker events={filteredEvents} />
        )}
      </div>
    </div>
  )
}
