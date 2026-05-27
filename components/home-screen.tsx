"use client"
import { useApp, type ModuleId } from "@/lib/app-context"
import { useLang } from "@/lib/lang-context"
import {
  BookOpen, FlaskConical, Building2, Map, ShieldCheck,
  Mountain, Stethoscope, ChevronRight, Radio
} from "lucide-react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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

const modules: {
  id: ModuleId
  icon: React.ReactNode
  labelKey: string
  descKey: string
  color: string
  bg: string
}[] = [
  { id: "actualite",    icon: <Radio size={24} />,        labelKey: "nav.actualite",    descKey: "m0.desc", color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20" },
  { id: "comprendre",   icon: <BookOpen size={24} />,     labelKey: "nav.comprendre",   descKey: "m1.desc", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
  { id: "labo",         icon: <FlaskConical size={24} />, labelKey: "nav.labo",         descKey: "m2.desc", color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20" },
  { id: "ville",        icon: <Building2 size={24} />,    labelKey: "nav.ville",        descKey: "m3.desc", color: "text-teal-400",   bg: "bg-teal-500/10 border-teal-500/20" },
  { id: "carte",        icon: <Map size={24} />,          labelKey: "nav.carte",        descKey: "m4.desc", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { id: "prevention",   icon: <ShieldCheck size={24} />,  labelKey: "nav.prevention",   descKey: "m5.desc", color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
  { id: "multirisques", icon: <Mountain size={24} />,     labelKey: "nav.multirisques", descKey: "m6.desc", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { id: "diagnostic",   icon: <Stethoscope size={24} />,  labelKey: "nav.diagnostic",   descKey: "m7.desc", color: "text-rose-400",   bg: "bg-rose-500/10 border-rose-500/20" },
]

function SeismicWaveSVG() {
  const pathRef = useRef<SVGPathElement>(null)
  useEffect(() => {
    let frame = 0
    let raf: number
    function animate() {
      frame += 0.03
      if (pathRef.current) {
        const w = 800, amp = 22, freq = 0.02
        let d = `M 0 60`
        for (let x = 0; x <= w; x += 4) {
          const y = 60 + amp * Math.sin(freq * x + frame) * Math.cos(0.01 * x + frame * 0.4)
          d += ` L ${x} ${y}`
        }
        pathRef.current.setAttribute("d", d)
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <svg viewBox="0 0 800 120" className="w-full h-20 opacity-80" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#1A5E9A" stopOpacity="0" />
          <stop offset="20%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1A5E9A" stopOpacity="0" />
        </linearGradient>
        <filter id="waveGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path ref={pathRef} stroke="url(#waveGrad)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#waveGlow)"/>
    </svg>
  )
}

function HaitiSilhouette() {
  return (
    <svg viewBox="0 0 320 180" className="w-80 h-48 md:w-96 md:h-56 opacity-60 dark:opacity-40 drop-shadow-[0_0_25px_rgba(46,139,192,0.4)]" aria-hidden="true">
      <defs>
        <linearGradient id="haitiGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1A5E9A" stopOpacity="0.1" />
        </linearGradient>
        <filter id="haitiGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Simplified Haiti silhouette path */}
      <path
        d="M 60 90 C 55 80 60 65 75 60 C 90 55 110 50 130 48 C 150 46 165 50 178 48 C 192 46 200 40 215 42 C 230 44 245 52 255 58 C 265 64 270 72 265 80 C 260 88 248 92 238 95 C 228 98 215 96 205 100 C 195 104 190 112 178 115 C 166 118 150 115 140 118 C 130 121 125 130 115 132 C 105 134 92 128 82 122 C 72 116 65 102 60 90 Z"
        fill="url(#haitiGrad)"
        stroke="#60a5fa"
        strokeWidth="1.5"
        filter="url(#haitiGlow)"
      />
      {/* Earthquake pulse at Port-au-Prince */}
      <circle cx="148" cy="92" r="4" fill="#ef4444" opacity="0.9" filter="url(#haitiGlow)">
        <animate attributeName="r" values="4;20;4" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0;0.9" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="148" cy="92" r="3" fill="#ef4444" />
      {/* Fault line EPGF */}
      <line x1="90" y1="100" x2="250" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" opacity="0.7" filter="url(#haitiGlow)">
        <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite" />
      </line>
    </svg>
  )
}

export default function HomeScreen() {
  const { setActiveModule } = useApp()
  const { t } = useLang()

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* System Status */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute top-6 right-6 z-50"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/50 shadow-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {t("home.systemActive")}
          </span>
        </div>
      </motion.div>

      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-12 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: "linear-gradient(rgba(46,139,192,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(46,139,192,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <HaitiSilhouette />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 -mt-8 mb-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4 shadow-[0_0_15px_rgba(46,139,192,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(46,139,192,0.8)]" />
            {t("home.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight text-balance mb-3 drop-shadow-sm">
            Sis<span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">Ayiti</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            {t("home.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-3xl"
        >
          <SeismicWaveSVG />
        </motion.div>
      </section>

      {/* Module cards grid */}
      <section className="px-4 md:px-6 pb-24 md:pb-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 text-center flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-border"></span>
          {t("home.modulesTitle")}
          <span className="h-px w-8 bg-border"></span>
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {modules.map((m, i) => (
            <motion.button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative flex flex-col gap-4 p-5 rounded-2xl border text-left transition-all duration-300",
                "backdrop-blur-xl shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
                m.bg,
                "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              )}
            >
              <div className="flex items-start justify-between">
                <div className={cn(
                  "p-2.5 rounded-xl bg-background/60 shadow-sm border border-white/5 dark:border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                  m.color
                )}>
                  {m.icon}
                </div>
                <div className="w-8 h-8 rounded-full bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  <ChevronRight size={16} className={m.color} />
                </div>
              </div>
              
              <div className="mt-2">
                <div className="font-bold text-foreground text-base leading-snug text-balance group-hover:text-primary transition-colors">
                  {t(m.labelKey)}
                </div>
                <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed text-pretty opacity-80 group-hover:opacity-100 transition-opacity">
                  {t(m.descKey)}
                </div>
              </div>
              
              <div className="mt-auto pt-2">
                <div className={cn(
                  "text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity",
                  m.color
                )}>
                  Module {modules.indexOf(m) + 1}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-auto px-6 py-8 border-t border-border/50 bg-background/50 backdrop-blur-sm relative z-10"
      >
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          {["MENFP", "PNUD", "UNICEF", "USGS", "BME", "TECLA"].map((org) => (
            <span key={org} className="font-bold tracking-wider opacity-50 hover:opacity-100 hover:text-primary transition-all cursor-default">{org}</span>
          ))}
        </div>
        <p className="text-center text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mt-6 opacity-40">
          Données sismiques: USGS · BME · CNBH · © SisAyiti 2024
        </p>
      </motion.footer>
    </div>
  )
}
