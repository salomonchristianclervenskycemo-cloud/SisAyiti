"use client"
import { useRef } from "react"
import { useLang } from "@/lib/lang-context"
import { useApp } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import { useLaboSimulation } from "@/hooks/use-labo-simulation"
import { Zap, AlertTriangle, Building, Waves, Info, Activity, Flame, Target, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LaboPathProgress } from "@/components/labo/labo-path-progress"
import { LaboPresetBanner } from "@/components/labo/labo-preset-banner"
import { LaboScienceNav } from "@/components/labo/labo-science-nav"
import { LaboQuizPanel } from "@/components/labo/labo-quiz-panel"
import { LaboScenarioList } from "@/components/labo/labo-scenario-list"
import type { LaboScenario } from "@/lib/labo-constants"

import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

import { 
  SOIL_OPTIONS, 
  INTENSITY_COLORS, 
  INTENSITY_LABELS, 
  INTENSITY_DESC,
} from "@/lib/labo-constants"
import { pickLabel } from "@/lib/i18n"

import { BuildingDamage } from "./labo/building-damage"
import { PGAGauge } from "./labo/pga-gauge"
import { WaveAnimation } from "./labo/wave-animation"

export default function ModuleLabo() {
  const { lang, t } = useLang()
  const { setActiveModule } = useApp()
  const resultsRef = useRef<HTMLDivElement>(null)
  const {
    magnitude, setMagnitude, distance, setDistance, soilId, setSoilId, soil,
    buildingQuality, setBuildingQuality, shaking, triggerShake,
    fromDiagnostic, presetInfo, dismissPresetBanner,
    pga, intensity, damageProbs, damageState, isDangerous, isFatal,
    tntTons, hiroshimaBombs, feltRadius,
  } = useLaboSimulation()

  let energyText = ""
  if (tntTons < 1000) energyText = `${Math.round(tntTons)} t TNT`
  else if (tntTons < 1000000) energyText = `${(tntTons / 1000).toFixed(1)} kt TNT`
  else energyText = `${(tntTons / 1000000).toFixed(1)} Mt TNT`

  const applyScenario = (s: LaboScenario) => {
    setMagnitude(s.mag)
    setDistance(s.dist)
    setSoilId(s.soil)
    setBuildingQuality("poor")
    triggerShake()
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 relative overflow-hidden font-sans transition-colors duration-300">
        {/* Background Textures */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-background to-red-500/5 dark:from-blue-900/20 dark:to-red-900/10 pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <div className="mb-2">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              {t("labo.title")}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
              {t("labo.subtitleLong")}
            </p>
          </div>

          <LaboPathProgress />

          {fromDiagnostic && presetInfo && (
            <LaboPresetBanner preset={presetInfo} onDismiss={dismissPresetBanner} />
          )}

          <LaboScienceNav />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              <GlassCard className="p-6 space-y-8">
                <div className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
                  <span className="w-2 h-6 bg-primary rounded-full" />
                  {t("labo.params")}
                </div>
                
                {/* Magnitude */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Activity size={16} className="text-primary" />
                      {t("labo.magnitude")} (Mw)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={14} className="text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-card border-border text-foreground">
                          <p className="w-48 text-xs">
                            {t("labo.magnitudeEnergyTip")}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <span className="text-2xl font-black text-primary drop-shadow-sm">{magnitude.toFixed(1)}</span>
                  </div>
                  <Slider 
                    value={[magnitude]} 
                    min={3} max={9.5} step={0.1} 
                    onValueChange={(v) => setMagnitude(v[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>3.0</span><span>9.5</span>
                  </div>
                </div>

                {/* Distance */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Waves size={16} className="text-cyan-500" />
                      {t("labo.distance")} (km)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={14} className="text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-card border-border text-foreground">
                          <p className="w-48 text-xs">
                            {t("labo.distanceTipLong")}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <span className="text-2xl font-black text-cyan-500 drop-shadow-sm">{distance} km</span>
                  </div>
                  <Slider 
                    value={[distance]} 
                    min={0} max={200} step={1} 
                    onValueChange={(v) => setDistance(v[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>0 km</span><span>200 km</span>
                  </div>
                </div>

                {/* Soil type */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground block">
                    {t("labo.soilType")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SOIL_OPTIONS.map(s => (
                      <button key={s.id} onClick={() => setSoilId(s.id)}
                        className={cn("py-3 px-4 rounded-xl text-sm border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1",
                          soilId === s.id
                            ? "bg-primary/10 border-primary text-foreground shadow-[0_0_15px_rgba(59,130,246,0.15)] scale-[0.98]"
                            : "bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border"
                        )}>
                        <div className={cn("font-bold text-center", s.color)}>{pickLabel(s, lang)}</div>
                        <div className="text-xs font-mono opacity-70 mt-1">×{s.factor}</div>
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {(soilId === "alluvial" || soilId === "saturated") && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <div className="mt-3 px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-600 dark:text-orange-400 flex items-start gap-3 shadow-sm">
                          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">
                            {t("labo.ampFactor").replace("{factor}", String(soil.factor))}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Building Quality */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground block">
                    {t("labo.buildQuality")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button onClick={() => setBuildingQuality("poor")}
                      className={cn("py-3 px-4 rounded-xl text-sm border-2 transition-all duration-200 flex flex-col items-center",
                        buildingQuality === "poor"
                          ? "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)] scale-[0.98]"
                          : "bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border"
                      )}>
                      <div className="font-bold">{t("labo.quality.poor")}</div>
                      <div className="text-[10px] opacity-70 mt-1 text-center font-medium">{t("labo.quality.poorHint")}</div>
                    </button>
                    <button onClick={() => setBuildingQuality("fair")}
                      className={cn("py-3 px-4 rounded-xl text-sm border-2 transition-all duration-200 flex flex-col items-center",
                        buildingQuality === "fair"
                          ? "bg-yellow-500/10 border-yellow-500 text-yellow-600 dark:text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)] scale-[0.98]"
                          : "bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border"
                      )}>
                      <div className="font-bold">{t("labo.quality.average")}</div>
                      <div className="text-[10px] opacity-70 mt-1 text-center font-medium">{t("labo.quality.averageHint")}</div>
                    </button>
                    <button onClick={() => setBuildingQuality("good")}
                      className={cn("py-3 px-4 rounded-xl text-sm border-2 transition-all duration-200 flex flex-col items-center",
                        buildingQuality === "good"
                          ? "bg-green-500/10 border-green-500 text-green-600 dark:text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)] scale-[0.98]"
                          : "bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border"
                      )}>
                      <div className="font-bold">{t("labo.quality.excellent")}</div>
                      <div className="text-[10px] opacity-70 mt-1 text-center font-medium">{t("labo.quality.excellentHint")}</div>
                    </button>
                  </div>
                </div>

                {/* DANGER BADGE */}
                <AnimatePresence>
                  {isDangerous && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                      <div className="px-5 py-4 rounded-xl bg-red-500/10 border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle size={18} className="text-red-500 animate-pulse" />
                          <span className="text-sm font-black text-red-600 dark:text-red-400 uppercase tracking-wider">
                            {t("labo.dangerConfig")}
                          </span>
                        </div>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed font-medium">
                          {isFatal ? t("labo.dangerFatal") : t("labo.dangerHigh")}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Simulate button */}
                <button onClick={triggerShake}
                  className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-[0.98]">
                  <Zap size={22} className={cn(shaking && "animate-pulse")} />
                  {t("labo.simulate")}
                </button>
              </GlassCard>
            </div>

            {/* Right Column: Scenarios & Results */}
            <div className="lg:col-span-5 space-y-6">
              {/* Real scenarios */}
              <GlassCard className="p-6 space-y-4">
                <div className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
                  <span className="w-2 h-6 bg-orange-500 rounded-full" />
                  {t("labo.scenarios")}
                </div>
                <LaboScenarioList onApply={applyScenario} />
              </GlassCard>

              {/* Results */}
              <div ref={resultsRef}>
                <GlassCard glowColor={INTENSITY_COLORS[intensity]} className={cn("p-6 space-y-6 transition-all duration-500", shaking && "animate-shake motion-reduce:animate-none")}>
                  <div className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
                    <span className="w-2 h-6 bg-green-500 rounded-full" />
                    {t("labo.results")}
                  </div>

                  <div className="space-y-4">
                    {/* Intensity badge + wave */}
                    <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-secondary/30 border border-border/50 shadow-inner">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        {t("labo.intensity")}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info size={14} className="text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-card border-border text-foreground">
                            <p className="w-48 text-xs">
                              {t("labo.intensityTip")}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="text-6xl font-black drop-shadow-md transition-colors duration-500" style={{ color: INTENSITY_COLORS[intensity] }}>
                        {INTENSITY_LABELS[intensity]}
                      </div>
                      <div className="text-sm font-bold text-center transition-colors duration-500" style={{ color: INTENSITY_COLORS[intensity] }}>
                        {INTENSITY_DESC[lang]?.[intensity] ?? INTENSITY_DESC.fr[intensity]}
                      </div>
                      <div className="mt-4 w-full">
                        <WaveAnimation active={shaking || intensity > 4} ariaLabel={t("labo.svg.waves")} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* PGA gauge */}
                      <div className="flex flex-col items-center justify-between gap-3 p-5 rounded-xl bg-secondary/30 border border-border/50 shadow-inner">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 text-center">
                          PGA
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={14} className="text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-card border-border text-foreground">
                              <p className="w-48 text-xs">
                                {t("labo.pgaTip")}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <PGAGauge pga={pga} max={1.5} />
                        <div className="text-[10px] text-center text-muted-foreground font-medium">
                          {t("labo.pga")}
                        </div>
                      </div>

                      {/* Building Damage */}
                      <div className="flex flex-col items-center justify-between gap-3 p-5 rounded-xl bg-secondary/30 border border-border/50 shadow-inner">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 text-center">
                          <Building size={14} /> {t("labo.buildingState")}
                        </div>
                        <BuildingDamage damageState={damageState} lang={lang} />
                        <div className="w-full mt-2 space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                            <span>{t("labo.collapse")}</span>
                            <span className={cn("transition-colors", damageProbs.complete > 0.5 ? "text-red-500" : "text-foreground")}>
                              {(damageProbs.complete * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border/50">
                            <div 
                              className="h-full bg-red-500 transition-all duration-500 ease-out" 
                              style={{ width: `${damageProbs.complete * 100}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Soil Amplification Details */}
                      <div className="flex flex-col items-center justify-between gap-3 p-5 rounded-xl bg-secondary/30 border border-border/50 shadow-inner">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 text-center">
                          <Waves size={14} className="text-cyan-500" /> {t("labo.amplification")}
                        </div>
                        <div className="text-4xl font-black text-cyan-500 drop-shadow-sm">×{soil.factor}</div>
                        <div className="text-[10px] text-center text-muted-foreground leading-relaxed font-medium">
                          {soilId === "rock"
                            ? t("labo.amp.rock")
                            : soilId === "alluvial"
                              ? t("labo.amp.alluvial")
                              : t("labo.amp.saturated")}
                        </div>
                      </div>

                      {/* Energy & Impact Details */}
                      <div className="flex flex-col items-center justify-between gap-3 p-5 rounded-xl bg-secondary/30 border border-border/50 shadow-inner">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 text-center">
                          <Flame size={14} className="text-orange-500" /> {t("labo.energy")}
                        </div>
                        <div className="text-3xl font-black text-orange-500 drop-shadow-sm text-center">
                          {energyText}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-medium text-center">
                          {t("labo.hiroshima").replace("{n}", Math.max(1, Math.round(hiroshimaBombs)).toLocaleString())}
                        </div>
                        <div className="w-full mt-1 pt-3 border-t border-border/50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-wide">
                            <Target size={12} className="text-primary" /> {t("labo.feltRadius")}
                          </div>
                          <div className="text-sm font-black text-foreground">~{feltRadius.toLocaleString()} km</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>

          <LaboQuizPanel />

          <button
            type="button"
            onClick={() => setActiveModule("prevention")}
            className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-primary/30 bg-primary/5 text-sm font-bold hover:bg-primary/10 transition-colors"
          >
            <ShieldCheck size={18} /> {t("labo.cta.prevention")}
          </button>
        </div>
      </div>
    </TooltipProvider>
  )
}
