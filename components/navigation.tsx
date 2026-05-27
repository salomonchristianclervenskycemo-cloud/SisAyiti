"use client"
import { useApp, type ModuleId } from "@/lib/app-context"
import { useLang } from "@/lib/lang-context"
import { cn } from "@/lib/utils"
import {
  BookOpen, FlaskConical, Building2, Map, ShieldCheck,
  Mountain, Stethoscope, Home, Radio
} from "lucide-react"

const modules: { id: ModuleId; icon: React.ReactNode; labelKey: string; color: string }[] = [
  { id: "home",          icon: <Home size={18} />,         labelKey: "nav.accueil",      color: "text-sky-400" },
  { id: "actualite",     icon: <Radio size={18} />,        labelKey: "nav.actualite",    color: "text-red-400" },
  { id: "comprendre",    icon: <BookOpen size={18} />,     labelKey: "nav.comprendre",   color: "text-blue-400" },
  { id: "labo",          icon: <FlaskConical size={18} />, labelKey: "nav.labo",         color: "text-cyan-400" },
  { id: "ville",         icon: <Building2 size={18} />,    labelKey: "nav.ville",        color: "text-teal-400" },
  { id: "carte",         icon: <Map size={18} />,          labelKey: "nav.carte",        color: "text-indigo-400" },
  { id: "prevention",    icon: <ShieldCheck size={18} />,  labelKey: "nav.prevention",   color: "text-green-400" },
  { id: "multirisques",  icon: <Mountain size={18} />,     labelKey: "nav.multirisques", color: "text-orange-400" },
  { id: "diagnostic",    icon: <Stethoscope size={18} />,  labelKey: "nav.diagnostic",   color: "text-rose-400" },
]

export function Sidebar() {
  const { activeModule, setActiveModule } = useApp()
  const { t } = useLang()

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-card/80 backdrop-blur-xl border-r border-border fixed top-0 left-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.05)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      {/* Logo */}
      <div className="p-5 border-b border-border transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent/80 border border-primary/40 flex items-center justify-center shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M2 12 L6 8 L10 14 L14 6 L18 13 L22 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"/>
            </svg>
          </div>
          <div>
            <div className="font-bold text-foreground text-sm leading-tight">SéismoHaïti</div>
            <div className="text-xs text-muted-foreground font-medium">v1.0</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Navigation principale">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            aria-current={activeModule === m.id ? "page" : undefined}
            className={cn(
              "w-full flex items-center gap-3 px-3 min-h-11 rounded-lg text-sm font-medium transition-all duration-200",
              activeModule === m.id
                ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg scale-[1.02]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 active:scale-95"
            )}
          >
            <span className={cn(
              "transition-all duration-200",
              activeModule === m.id ? "text-primary-foreground scale-110" : m.color
            )}>
              {m.icon}
            </span>
            <span className="text-balance">{t(m.labelKey)}</span>
            {activeModule === m.id && (
              <span className="ml-auto w-2 h-2 rounded-full bg-primary-foreground animate-pulse-seismo" />
            )}
          </button>
        ))}
      </nav>

      {/* Footer info */}
      <div className="p-3 border-t border-border transition-all duration-300">
        <p className="text-xs text-muted-foreground text-center font-medium">MENFP · PNUD · USGS · BME</p>
      </div>
    </aside>
  )
}

export function BottomNav() {
  const { activeModule, setActiveModule } = useApp()
  const { t } = useLang()
  const visibleModules = modules.slice(0, 5) // show first 5 on mobile

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-xl border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.2)] transition-all duration-300"
      aria-label="Navigation mobile"
    >
      <div className="flex">
        {visibleModules.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            aria-current={activeModule === m.id ? "page" : undefined}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 py-2.5 px-1 text-xs font-medium transition-all duration-200",
              activeModule === m.id
                ? "text-primary scale-110"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="transition-all duration-200">{m.icon}</span>
            <span className="truncate w-full text-center text-[10px]">
              {t(m.labelKey).slice(0, 7)}
            </span>
            {activeModule === m.id && (
              <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
