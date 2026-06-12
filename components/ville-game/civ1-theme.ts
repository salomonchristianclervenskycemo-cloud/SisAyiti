/** Thème hybride : grille tactique + design system SisAyiti (glass, primary, teal). */
import { cn } from "@/lib/utils"

export const villeTile = cn(
  "relative aspect-square rounded-md border-2 overflow-hidden transition-all duration-200",
  "border-slate-600/80 dark:border-slate-500/70",
  "hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
)

export const villeTileSelected = cn(
  "border-amber-400 z-10",
  "ring-2 ring-amber-400/80 ring-offset-1 ring-offset-background"
)

export const villePanel = cn(
  "relative overflow-hidden rounded-2xl border border-border/40",
  "bg-card/60 backdrop-blur-xl shadow-sm",
  "dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]"
)

export const villePanelTitle = cn(
  "px-3 py-2 border-b border-border/50 bg-primary/10",
  "text-xs font-bold uppercase tracking-wider text-primary"
)

export const villeBtn = cn(
  "min-h-11 px-3 py-2 rounded-xl border border-border/60",
  "bg-secondary/50 font-semibold text-sm text-foreground",
  "hover:bg-primary/10 hover:border-primary/40 transition-all",
  "active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed"
)

export const villeBtnActive = cn(
  "border-primary bg-primary/15 text-primary shadow-sm"
)

export const villeBtnDanger = cn(
  "bg-destructive/90 text-destructive-foreground border-destructive",
  "hover:bg-destructive shadow-[0_0_20px_rgba(220,38,38,0.25)]"
)

export const villeAdvisor = cn(
  "p-4 rounded-2xl border border-teal-500/30",
  "bg-teal-500/10 dark:bg-teal-500/15 text-foreground text-sm",
  "backdrop-blur-sm"
)

export const villeMapFrame = cn(
  "p-3 rounded-xl border-2 border-slate-600/40 dark:border-slate-500/50",
  "bg-gradient-to-br from-[#2d5a3d]/25 via-primary/8 to-teal-600/10",
  "shadow-[inset_0_2px_12px_rgba(0,0,0,0.15)]"
)

/** @deprecated — alias compat */
export const CIV1 = {
  grass: "transparent",
  select: "hsl(var(--primary))",
  gold: "hsl(var(--primary))",
  text: "hsl(var(--foreground))",
} as const

export const civ1Tile = villeTile
export const civ1Panel = villePanel
export const civ1Btn = villeBtn
export const civ1BtnActive = villeBtnActive
export const civ1Advisor = villeAdvisor
