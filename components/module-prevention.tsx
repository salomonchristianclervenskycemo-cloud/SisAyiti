'use client'

import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { AlertTriangle, Shield, Stethoscope } from 'lucide-react'
import { cn } from '@/lib/utils'
import { l } from '@/lib/i18n'
import {
  preventionSections,
  PHASE_SECTIONS,
  countAllPreventionItems,
  type PreventionPhase,
  type PreventionSectionKey,
} from '@/lib/translations/prevention'
import { isCrisisMode } from '@/lib/crisis-journey'
import { loadPreventionProgress, savePreventionProgress } from '@/lib/offline-education'
import { ScienceCallout } from '@/components/comprendre/science-callout'
import { BpkGestureDemo } from '@/components/prevention/bpk-gesture-demo'
import { HaitiScenarios } from '@/components/prevention/haiti-scenarios'
import { KitPrintPanel } from '@/components/prevention/kit-print-panel'
import { PreventionQuizPanel } from '@/components/prevention/prevention-quiz-panel'
import { PreventionPathProgress } from '@/components/prevention/prevention-path-progress'
import { PreventionPhaseNav } from '@/components/prevention/prevention-phase-nav'
import { PreventionChecklist, type ChecklistItem } from '@/components/prevention/prevention-checklist'
import { NonParasismicPanel } from '@/components/prevention/non-parasismic-panel'

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-sm',
      className
    )}
  >
    {children}
  </div>
)

const PHASE_SCIENCE: Record<PreventionPhase, { what: string; why: string; haiti: string; limits: string; impact: string }> = {
  avant: {
    what: 'prev.science.avant.what',
    why: 'prev.science.avant.why',
    haiti: 'prev.science.avant.haiti',
    limits: 'prev.science.avant.limits',
    impact: 'prev.science.avant.impact',
  },
  pendant: {
    what: 'prev.science.pendant.what',
    why: 'prev.science.pendant.why',
    haiti: 'prev.science.pendant.haiti',
    limits: 'prev.science.pendant.limits',
    impact: 'prev.science.pendant.impact',
  },
  apres: {
    what: 'prev.science.apres.what',
    why: 'prev.science.apres.why',
    haiti: 'prev.science.apres.haiti',
    limits: 'prev.science.apres.limits',
    impact: 'prev.science.apres.impact',
  },
}

const PHASE_QUIZ_INDEX: Record<PreventionPhase, 0 | 1 | 2> = {
  avant: 0,
  pendant: 1,
  apres: 2,
}

function mapSection(section: PreventionSectionKey, lang: ReturnType<typeof useLang>['lang']): ChecklistItem[] {
  return preventionSections[section].map((item) => ({
    id: item.id,
    icon: item.icon,
    title: l(item.title, lang),
    description: l(item.description, lang),
  }))
}

function isNpSection(key: PreventionSectionKey): boolean {
  return key.endsWith('_np')
}

export function ModulePrevention() {
  const { lang, t } = useLang()
  const { setActiveModule } = useApp()
  const [crisisMode, setCrisisModeFlag] = useState(false)
  const [phase, setPhase] = useState<PreventionPhase>('pendant')
  const [checkedBySection, setCheckedBySection] = useState<Record<string, number[]>>({})

  useEffect(() => {
    setCrisisModeFlag(isCrisisMode())
    if (isCrisisMode()) setPhase('pendant')
    setCheckedBySection(loadPreventionProgress())
  }, [])

  const sections = PHASE_SECTIONS[phase]

  const phaseItems = useMemo(() => {
    const all: ChecklistItem[] = []
    for (const key of sections) {
      all.push(...mapSection(key, lang))
    }
    return all
  }, [sections, lang])

  const checkedInPhase = useMemo(() => {
    const set = new Set<number>()
    for (const key of sections) {
      for (const id of checkedBySection[key] ?? []) set.add(id)
    }
    return set
  }, [checkedBySection, sections])

  const phaseProgress = useMemo(() => {
    if (phaseItems.length === 0) return 0
    const n = phaseItems.filter((i) => checkedInPhase.has(i.id)).length
    return Math.round((n / phaseItems.length) * 100)
  }, [phaseItems, checkedInPhase])

  const persistSection = useCallback((section: string, ids: number[]) => {
    setCheckedBySection((prev) => {
      const next = { ...prev, [section]: ids }
      savePreventionProgress(next)
      return next
    })
  }, [])

  const toggleItem = (section: PreventionSectionKey, id: number) => {
    const arr = checkedBySection[section] ?? []
    const set = new Set(arr)
    if (set.has(id)) set.delete(id)
    else set.add(id)
    persistSection(section, [...set])
  }

  const kitChecked = useMemo(() => new Set(checkedBySection.kit ?? []), [checkedBySection])
  const science = PHASE_SCIENCE[phase]
  const progressHint = t('prev.progress.hint')
    .replace('{done}', String(phaseItems.filter((i) => checkedInPhase.has(i.id)).length))
    .replace('{total}', String(phaseItems.length))

  const renderSection = (sectionKey: PreventionSectionKey, opts?: { highlight?: boolean; title?: string }) => {
    const items = mapSection(sectionKey, lang)
    const checked = new Set(checkedBySection[sectionKey] ?? [])
    const content = (
      <>
        {opts?.title && <h4 className="text-sm font-bold text-foreground mb-3">{opts.title}</h4>}
        <PreventionChecklist
          items={items}
          checked={checked}
          onToggle={(id) => toggleItem(sectionKey, id)}
          highlight={opts?.highlight}
          large={crisisMode}
        />
      </>
    )
    if (opts?.highlight) {
      return <NonParasismicPanel key={sectionKey}>{content}</NonParasismicPanel>
    }
    return <div key={sectionKey}>{content}</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 relative overflow-hidden font-sans">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-background to-orange-500/5 pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">{t('prev.title')}</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{t('prev.subtitleLong')}</p>
          {crisisMode && (
            <p className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-300">
              <Shield size={14} /> {t('crisis.mode.active')}
            </p>
          )}
        </div>

        {!crisisMode && <PreventionPathProgress />}

        {!crisisMode ? (
          <PreventionPhaseNav active={phase} onChange={setPhase} />
        ) : (
          <PreventionPhaseNav active="pendant" onChange={() => {}} compact />
        )}

        {phase === 'pendant' && <BpkGestureDemo compact={crisisMode} />}

        {!crisisMode && (
          <ScienceCallout
            whatKey={science.what}
            whyKey={science.why}
            haitiKey={science.haiti}
            limitsKey={science.limits}
            impactKey={science.impact}
          />
        )}

        {phase === 'pendant' && !crisisMode && <HaitiScenarios />}

        <GlassCard className="p-5 flex items-center gap-6">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-secondary" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path
                className="text-primary transition-all duration-700"
                strokeWidth="3"
                strokeDasharray={`${phaseProgress}, 100`}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">{phaseProgress}%</div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{t(`prev.phase.${phase}`)}</h3>
            <p className="text-sm text-muted-foreground">{progressHint}</p>
          </div>
        </GlassCard>

        <div className="space-y-6">
          {sections.map((key) => {
            if (isNpSection(key)) {
              return renderSection(key, { highlight: true })
            }
            if (key === 'kit') {
              return (
                <div key={key} className="space-y-3">
                  {renderSection(key, { title: t('prev.section.kit') })}
                  <KitPrintPanel checkedIds={kitChecked} />
                </div>
              )
            }
            if (key === 'dangers') {
              return renderSection(key, { title: t('prev.section.dangers') })
            }
            return renderSection(key, { title: t('prev.section.general') })
          })}
        </div>

        {phase === 'avant' && !crisisMode && (
          <button
            type="button"
            onClick={() => setActiveModule('diagnostic')}
            className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-primary/30 bg-primary/5 text-sm font-bold hover:bg-primary/10 transition-colors"
          >
            <Stethoscope size={18} /> {t('prev.path.ctaDiagnostic')}
          </button>
        )}

        {!crisisMode && <PreventionQuizPanel tabIndex={PHASE_QUIZ_INDEX[phase]} />}

        <GlassCard className="p-6 border-l-4 border-l-destructive bg-destructive/5">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={20} className="text-destructive" />
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-2">{t('prev.reminder.title')}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('prev.reminder.body')}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
