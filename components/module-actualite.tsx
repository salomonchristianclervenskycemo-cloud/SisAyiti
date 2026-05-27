"use client"

import { useState, useMemo, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { useSeismicStore } from "@/lib/seismic-store"
import { useLang } from "@/lib/lang-context"
import { cn } from "@/lib/utils"
import { format, formatDistanceToNow } from "date-fns"
import { fr, enUS, es } from "date-fns/locale"
import {
  Activity, AlertTriangle, Clock, Globe,
  MapPin, Search, ShieldAlert, Waves,
  ChevronRight, Filter, Info, BarChart3,
  Radio, Zap, Layers, History
} from "lucide-react"

import { SeismicEventUI, RiskLevel } from "@/lib/seismic-types"

const LiveWorldMap = dynamic(
  () => import("@/components/ui/live-world-map").then((m) => m.LiveWorldMap),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[250px] bg-secondary/20 animate-pulse rounded-xl" /> }
)
const EventMiniMap = dynamic(
  () => import("@/components/ui/event-mini-map").then((m) => m.EventMiniMap),
  { ssr: false }
)
const ActualiteCharts = dynamic(
  () => import("@/components/actualite/actualite-charts").then((m) => m.ActualiteCharts),
  { ssr: false, loading: () => <div className="h-[200px] animate-pulse bg-secondary/20 rounded-xl" /> }
)

// --- Configuration Visuelle ---
const RISK_COLORS: Record<RiskLevel, string> = {
  critical: "#ef4444", // Red
  high: "#f97316",     // Orange
  medium: "#eab308",   // Yellow
  low: "#3b82f6",      // Blue
}

const CATEGORIES = [
  { id: "all", labelKey: "act.cat.all", icon: Clock },
  { id: "critical", labelKey: "act.cat.critical", icon: AlertTriangle },
  { id: "tectonic", labelKey: "act.cat.tectonic", icon: Activity },
  { id: "tsunami", labelKey: "act.cat.tsunami", icon: Waves },
  { id: "history", labelKey: "act.cat.history", icon: History },
]

function dateLocale(lang: string) {
  if (lang === "fr") return fr
  if (lang === "es") return es
  if (lang === "en") return enUS
  return undefined
}

// --- Composants Utilitaires ---
const GlassCard = ({ children, className, glowColor }: { children: React.ReactNode, className?: string, glowColor?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl",
    "shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500",
    className
  )}>
    {glowColor && (
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-30 dark:opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: glowColor }}
      />
    )}
    {children}
  </div>
)

const PulseIndicator = ({ color }: { color: string }) => (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }}></span>
    <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: color }}></span>
  </span>
)

// --- Composant Principal ---
export default function ModuleActualite() {
  const { lang, t } = useLang()
  const events = useSeismicStore((s) => s.events)
  const liveConnected = useSeismicStore((s) => s.liveConnected)
  const lastSync = useSeismicStore((s) => s.lastSync)
  
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<SeismicEventUI | null>(null)

  // --- Filtrage des données ---
  const filteredEvents = useMemo(() => {
    let filtered = [...events]

    // Filtre par catégorie
    if (activeCategory === "critical") filtered = filtered.filter(e => e.risk === "critical" || e.magnitude >= 6.0)
    if (activeCategory === "tsunami") filtered = filtered.filter(e => e.tsunami)
    if (activeCategory === "tectonic") filtered = filtered.filter(e => e.depth > 50) // Séismes profonds
    if (activeCategory === "history") filtered = filtered.filter(e => e.magnitude >= 7.0 || (e.id.includes("hist")))

    // Recherche textuelle
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(e => 
        e.region?.toLowerCase().includes(q) || 
        e.district?.toLowerCase().includes(q) ||
        e.magnitude.toString().includes(q)
      )
    }

    // Tri par date (le plus récent en premier)
    return filtered.sort((a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime())
  }, [events, activeCategory, searchQuery])

  // --- Données pour les graphiques ---
  const chartData = useMemo(() => {
    // Regrouper par jour pour la timeline (sur les 30 derniers jours par ex)
    const last30Days = filteredEvents.slice(0, 50).reverse() // Simplification pour la démo
    return last30Days.map(e => ({
      time: format(new Date(e.eventTime), "dd MMM HH:mm", { locale: dateLocale(lang) }),
      magnitude: e.magnitude,
      depth: e.depth,
      risk: e.risk
    }))
  }, [filteredEvents, lang])

  const magDistribution = useMemo(() => {
    const dist = [
      { name: "3-4", count: 0, color: RISK_COLORS.low },
      { name: "4-5", count: 0, color: RISK_COLORS.medium },
      { name: "5-6", count: 0, color: RISK_COLORS.high },
      { name: "6+", count: 0, color: RISK_COLORS.critical },
    ]
    filteredEvents.forEach(e => {
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
    filteredEvents.forEach(e => {
      if (e.depth < 20) dist[0].count++
      else if (e.depth < 70) dist[1].count++
      else if (e.depth < 300) dist[2].count++
      else dist[3].count++
    })
    return dist
  }, [filteredEvents])

  const regionalActivity = useMemo(() => {
    const regions: Record<string, number> = {}
    filteredEvents.forEach(e => {
      const r = e.region || t("act.unknownRegion")
      regions[r] = (regions[r] || 0) + 1
    })
    return Object.entries(regions)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))
  }, [filteredEvents])

  // Auto-sélectionner le premier événement
  useEffect(() => {
    if (filteredEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(filteredEvents[0])
    }
  }, [filteredEvents, selectedEvent])

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Background Textures */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-background to-red-500/5 dark:from-blue-900/20 dark:to-red-900/10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        
        {/* HEADER & KPIs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/50">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg border border-blue-500/20 dark:border-blue-500/30">
                    <Radio className="text-blue-500 dark:text-blue-400" size={24} />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                    {t("act.title")}
                  </h1>
                </div>
                <p className="text-muted-foreground text-sm max-w-xl">
                  {t("act.subtitle")}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                    {liveConnected ? (
                      <><PulseIndicator color="#22c55e" /> <span className="text-green-600 dark:text-green-400">{t("act.connected")}</span></>
                    ) : (
                      <><PulseIndicator color="#ef4444" /> <span className="text-red-600 dark:text-red-400">{t("act.disconnected")}</span></>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    {t("act.lastUpdate")}: {lastSync ? format(new Date(lastSync), "HH:mm:ss ('UTC')") : "..."}
                  </div>
                </div>
              </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard className="p-4 border-l-4 border-l-blue-500 bg-card/80">
                <div className="text-xs text-muted-foreground mb-1">{t("act.quakesToday")}</div>
                <div className="text-2xl font-black text-foreground">{filteredEvents.length}</div>
                <div className="text-[10px] text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                  <Activity size={10} /> +12% vs hier
                </div>
              </GlassCard>
              <GlassCard className="p-4 border-l-4 border-l-red-500 bg-card/80">
                <div className="text-xs text-muted-foreground mb-1">{t("act.maxMagnitude")}</div>
                <div className="text-2xl font-black text-red-600 dark:text-red-500">
                  M {Math.max(...filteredEvents.map(e => e.magnitude), 0).toFixed(1)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                  {t("act.last24h")}
                </div>
              </GlassCard>
              <GlassCard className="p-4 border-l-4 border-l-orange-500 bg-card/80">
                <div className="text-xs text-muted-foreground mb-1">{t("act.activeAlerts")}</div>
                <div className="text-2xl font-black text-orange-600 dark:text-orange-400">
                  {filteredEvents.filter(e => e.risk === 'critical' || e.risk === 'high').length}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                  <AlertTriangle size={10} /> {t("act.needsAttention")}
                </div>
              </GlassCard>
              <GlassCard className="p-4 border-l-4 border-l-cyan-500 bg-card/80">
                <div className="text-xs text-muted-foreground mb-1">{t("act.avgDepth")}</div>
                <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
                  {filteredEvents.length > 0 ? (filteredEvents.reduce((a,b) => a+b.depth, 0) / filteredEvents.length).toFixed(1) : 0} km
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">{t("act.global")}</div>
              </GlassCard>
            </div>
          </div>

          {/* World Map Live */}
          <div className="lg:col-span-4 h-full min-h-[250px]">
            <GlassCard className="h-full p-1 flex flex-col relative">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs font-bold text-foreground bg-background/80 px-2 py-1 rounded-md backdrop-blur-md border border-border/50">
                <Globe size={14} className="text-blue-500 dark:text-blue-400" /> {t("act.liveMap")}
              </div>
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-500 bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
              </div>
              <div className="flex-1 rounded-lg overflow-hidden">
                <LiveWorldMap events={filteredEvents} selectedEventId={selectedEvent?.id} onSelectEvent={setSelectedEvent} />
              </div>
            </GlassCard>
          </div>
        </div>

        {/* NAVIGATION & SEARCH */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border",
                    isActive 
                      ? "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/50 text-blue-600 dark:text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
                      : "bg-secondary/50 border-border/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon size={14} />
                  {t(cat.labelKey)}
                </button>
              )
            })}
          </div>

          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text"
              placeholder={t("act.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-full py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* LEFT COLUMN: LIVE FEED */}
          <div className="lg:col-span-4 space-y-4 flex flex-col h-[600px]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Activity size={18} className="text-blue-500 dark:text-blue-400" />
                {t("act.eventFeed")}
              </h2>
              <span className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground font-medium border border-border/50">
                {filteredEvents.length} {t("act.results")}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              <AnimatePresence>
                {filteredEvents.map((event, i) => {
                  const isSelected = selectedEvent?.id === event.id
                  const color = RISK_COLORS[event.risk]
                  
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedEvent(event)}
                      className={cn(
                        "group cursor-pointer p-4 rounded-xl border transition-all duration-300 relative overflow-hidden",
                        isSelected 
                          ? "bg-card border-border shadow-md" 
                          : "bg-card/50 border-border/50 hover:bg-card hover:border-border"
                      )}
                      style={{
                        boxShadow: isSelected ? `0 0 20px -5px ${color}40` : 'none'
                      }}
                    >
                      {/* Ligne de couleur de risque avec glow */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
                      
                      <div className="flex justify-between items-start mb-2 pl-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black tracking-tighter drop-shadow-sm" style={{ color }}>
                            {event.magnitude.toFixed(1)}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                            Mw
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-full">
                          <Clock size={10} />
                          {formatDistanceToNow(new Date(event.eventTime), { addSuffix: true, locale: dateLocale(lang) })}
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-1 pl-2">
                        {event.region || event.district || t("act.unknownRegion")}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground pl-2">
                        <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
                          <Layers size={10} className="text-cyan-500" /> {event.depth.toFixed(1)} km
                        </span>
                        <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
                          <Activity size={10} className="text-orange-500" /> 
                          {event.depth < 20 ? t("act.fault.shallow") : event.depth < 70 ? t("act.fault.intraplate") : t("act.fault.subduction")}
                        </span>
                        {event.tsunami && (
                          <span className="flex items-center gap-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold px-2 py-1 rounded-md animate-pulse">
                            <Waves size={10} /> Tsunami
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-border/50 rounded-xl">
                  <Search size={32} className="mx-auto mb-3 opacity-20" />
                  <p>{t("act.noEvents")}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: ANALYTICS & DETAILS */}
          <div className="lg:col-span-8 space-y-6 flex flex-col">
            
            {/* SELECTED EVENT DETAILS (The "Mini-Map" / Focus area) */}
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key={selectedEvent.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard glowColor={RISK_COLORS[selectedEvent.risk]} className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      
                      {/* Infos */}
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-secondary text-foreground border border-border/50">
                              {t("act.detailedAnalysis")}
                            </span>
                            {selectedEvent.risk === "critical" && (
                              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-red-500/20 text-red-600 dark:text-red-400 flex items-center gap-1 animate-pulse">
                                <AlertTriangle size={10} /> {t("act.majorAlert")}
                              </span>
                            )}
                          </div>
                          <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight drop-shadow-sm">
                            {selectedEvent.region || selectedEvent.district || t("act.unknownRegion")}
                          </h2>
                          <p className="text-muted-foreground text-sm mt-2 flex items-center gap-2">
                            <Clock size={14} className="text-blue-500" />
                            {format(new Date(selectedEvent.eventTime), "dd MMMM yyyy 'à' HH:mm:ss", { locale: dateLocale(lang) })}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 relative overflow-hidden group hover:border-border transition-colors">
                            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                              <Activity size={64} />
                            </div>
                            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Magnitude</div>
                            <div className="text-4xl font-black drop-shadow-md" style={{ color: RISK_COLORS[selectedEvent.risk] }}>
                              {selectedEvent.magnitude.toFixed(1)} <span className="text-sm text-muted-foreground font-medium">Mw</span>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 relative overflow-hidden group hover:border-border transition-colors">
                            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                              <Layers size={64} />
                            </div>
                            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Profondeur</div>
                            <div className="text-4xl font-black text-foreground drop-shadow-md">
                              {selectedEvent.depth.toFixed(1)} <span className="text-sm text-muted-foreground font-medium">km</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-2 rounded-lg border border-border/50 hover:bg-secondary transition-colors cursor-default">
                            <MapPin size={14} className="text-blue-500" />
                            {selectedEvent.latitude.toFixed(4)}°, {selectedEvent.longitude.toFixed(4)}°
                          </div>
                          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-2 rounded-lg border border-border/50 hover:bg-secondary transition-colors cursor-default">
                            <Globe size={14} className="text-blue-500" />
                            Source: {selectedEvent.source.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      {/* Visualisation spatiale (Mini-Map MapLibre) */}
                      <div className="relative h-full min-h-[200px] rounded-xl border border-border/50 bg-card overflow-hidden flex items-center justify-center">
                        <EventMiniMap event={selectedEvent} color={RISK_COLORS[selectedEvent.risk]} />
                      </div>

                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <GlassCard className="p-8 flex items-center justify-center h-[300px]">
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Activity size={18} /> {t("act.selectEvent")}
                  </p>
                </GlassCard>
              )}
            </AnimatePresence>

            <ActualiteCharts
              chartData={chartData}
              magDistribution={magDistribution}
              depthDistribution={depthDistribution}
            />
          </div>
        </div>

        {/* LIVE TICKER FOOTER */}
        <div className="w-full bg-card/90 backdrop-blur-md border-t border-border/50 py-2 px-4 flex items-center gap-4 overflow-hidden rounded-b-2xl shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-500 whitespace-nowrap shrink-0">
            <Radio size={14} className="animate-pulse" /> {t("act.liveFeed")}
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs text-muted-foreground">
              {filteredEvents.slice(0, 15).map(e => (
                <span key={`ticker-${e.id}`} className="flex items-center gap-2">
                  <span className="text-muted-foreground">{format(new Date(e.eventTime), "HH:mm")}</span>
                  <span className="font-bold" style={{ color: RISK_COLORS[e.risk] }}>M {e.magnitude.toFixed(1)}</span>
                  <span>- {e.region || e.district || t("act.unknownRegion")}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(128, 128, 128, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(128, 128, 128, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(128, 128, 128, 0.4);
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
