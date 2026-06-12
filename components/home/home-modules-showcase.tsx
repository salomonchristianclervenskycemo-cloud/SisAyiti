'use client'

import type { ReactNode } from 'react'
import {
  BookOpen, FlaskConical, Building2, Map, ShieldCheck,
  Mountain, Stethoscope, Radio, ArrowRight,
} from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useApp, type ModuleId } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import { recordHomeModuleVisited } from '@/lib/offline-education'
import { GlassCard } from '@/components/surveillance/glass-card'
import { HomeSection } from './home-section'

type Mod = {
  id: ModuleId
  icon: ReactNode
  labelKey: string
  descKey: string
  accent: string
}

const MODULES: Mod[] = [
  { id: 'actualite', icon: <Radio size={22} />, labelKey: 'nav.actualite', descKey: 'm0.desc', accent: 'border-red-500/30' },
  { id: 'comprendre', icon: <BookOpen size={22} />, labelKey: 'nav.comprendre', descKey: 'm1.desc', accent: 'border-blue-500/30' },
  { id: 'labo', icon: <FlaskConical size={22} />, labelKey: 'nav.labo', descKey: 'm2.desc', accent: 'border-cyan-500/30' },
  { id: 'ville', icon: <Building2 size={22} />, labelKey: 'nav.ville', descKey: 'm3.desc', accent: 'border-teal-500/30' },
  { id: 'carte', icon: <Map size={22} />, labelKey: 'nav.carte', descKey: 'm4.desc', accent: 'border-indigo-500/30' },
  { id: 'prevention', icon: <ShieldCheck size={22} />, labelKey: 'nav.prevention', descKey: 'm5.desc', accent: 'border-green-500/30' },
  { id: 'multirisques', icon: <Mountain size={22} />, labelKey: 'nav.multirisques', descKey: 'm6.desc', accent: 'border-orange-500/30' },
  { id: 'diagnostic', icon: <Stethoscope size={22} />, labelKey: 'nav.diagnostic', descKey: 'm7.desc', accent: 'border-rose-500/30' },
]

export function HomeModulesShowcase() {
  const { t } = useLang()
  const { setActiveModule } = useApp()

  return (
    <HomeSection
      id="modules"
      alternate
      title={t('home.landing.modules.title')}
      subtitle={t('home.landing.modules.subtitle')}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MODULES.map((m) => (
          <GlassCard key={m.id} className={cn('flex flex-col h-full border-2', m.accent)}>
            <div className="p-5 flex flex-col flex-1">
              <div className="p-2.5 rounded-xl bg-muted/50 w-fit text-primary mb-3">{m.icon}</div>
              <h3 className="font-bold text-foreground text-sm leading-snug">{t(m.labelKey)}</h3>
              <p className="text-xs text-muted-foreground mt-2 flex-1 leading-relaxed">{t(m.descKey)}</p>
              <button
                type="button"
                onClick={() => {
                  recordHomeModuleVisited(m.id)
                  setActiveModule(m.id)
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
              >
                {t('home.landing.modules.action')}
                <ArrowRight size={12} />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </HomeSection>
  )
}
