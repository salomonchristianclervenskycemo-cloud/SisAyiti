'use client'

import type { ReactNode } from 'react'
import {
  BookOpen, FlaskConical, Building2, Map, ShieldCheck,
  Mountain, Stethoscope, Radio,
} from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp, type ModuleId } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import { recordHomeModuleVisited } from '@/lib/offline-education'

const MODULES: { id: ModuleId; icon: ReactNode; labelKey: string; color: string }[] = [
  { id: 'actualite', icon: <Radio size={18} />, labelKey: 'nav.actualite', color: 'text-red-500' },
  { id: 'comprendre', icon: <BookOpen size={18} />, labelKey: 'nav.comprendre', color: 'text-blue-500' },
  { id: 'labo', icon: <FlaskConical size={18} />, labelKey: 'nav.labo', color: 'text-cyan-500' },
  { id: 'ville', icon: <Building2 size={18} />, labelKey: 'nav.ville', color: 'text-teal-500' },
  { id: 'carte', icon: <Map size={18} />, labelKey: 'nav.carte', color: 'text-indigo-500' },
  { id: 'prevention', icon: <ShieldCheck size={18} />, labelKey: 'nav.prevention', color: 'text-green-500' },
  { id: 'multirisques', icon: <Mountain size={18} />, labelKey: 'nav.multirisques', color: 'text-orange-500' },
  { id: 'diagnostic', icon: <Stethoscope size={18} />, labelKey: 'nav.diagnostic', color: 'text-rose-500' },
]

export function HomeModuleGrid() {
  const { t } = useLang()
  const { setActiveModule } = useApp()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-1 min-h-0 content-start">
      {MODULES.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => {
            recordHomeModuleVisited(m.id)
            setActiveModule(m.id)
          }}
          className={cn(
            'flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-xl border border-border/50 bg-card/60',
            'hover:bg-card hover:border-primary/30 hover:shadow-sm transition-all text-center min-h-[72px] sm:min-h-[88px]'
          )}
        >
          <span className={cn('p-2 rounded-lg bg-muted/50', m.color)}>{m.icon}</span>
          <span className="text-xs sm:text-sm font-bold text-foreground leading-tight">
            {t(m.labelKey)}
          </span>
        </button>
      ))}
    </div>
  )
}
