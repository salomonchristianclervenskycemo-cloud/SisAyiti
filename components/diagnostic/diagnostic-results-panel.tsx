'use client'

import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import { AlertTriangle, CheckCircle, Zap, RotateCcw, FlaskConical, BookOpen, Shield } from 'lucide-react'
import {
  type BuildingAssessmentResult,
  type BuildingAnswers,
  getFactorBreakdown,
  resiliencePercent,
} from '@/lib/building-vulnerability'
import { saveLaboPreset } from '@/lib/offline-education'
import { DiagnosticExportButton } from '@/components/diagnostic/diagnostic-export-button'
import { FactorBreakdown } from '@/components/diagnostic/factor-breakdown'
import { BuildingDiagram } from '@/components/diagnostic/building-diagram'

type Props = {
  result: BuildingAssessmentResult
  answers: BuildingAnswers
  levelLabel: string
  recommendations: string[]
  saveStatus: 'idle' | 'saved' | 'offline'
  onRestart: () => void
}

export function DiagnosticResultsPanel({
  result,
  answers,
  levelLabel,
  recommendations,
  saveStatus,
  onRestart,
}: Props) {
  const { t } = useLang()
  const { setActiveModule } = useApp()
  const factors = getFactorBreakdown(answers)
  const resilience = resiliencePercent(answers)

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 sm:p-10 space-y-8 text-center',
          result.level === 'resilient' && 'shadow-[0_0_40px_rgba(34,197,94,0.08)]',
          result.level === 'moderate' && 'shadow-[0_0_40px_rgba(234,179,8,0.08)]',
          result.level === 'vulnerable' && 'shadow-[0_0_40px_rgba(239,68,68,0.08)]'
        )}
      >
        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-secondary" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path
                className={cn(
                  'transition-all duration-1000 ease-out',
                  result.level === 'resilient' ? 'text-green-500' : result.level === 'moderate' ? 'text-yellow-500' : 'text-red-500'
                )}
                strokeWidth="3"
                strokeDasharray={`${resilience}, 100`}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-foreground">{result.grade}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Grade</span>
            </div>
          </div>
          <BuildingDiagram structure={answers.structure} />
        </div>

        <div>
          <h3 className="text-2xl font-black text-foreground mb-2">{t('multi.results')}</h3>
          <div
            className={cn(
              'inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm border',
              result.level === 'resilient' && 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
              result.level === 'moderate' && 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
              result.level === 'vulnerable' && 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
            )}
          >
            {result.level === 'resilient' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            {levelLabel}
          </div>
          <p className="text-sm font-bold text-primary mt-3">
            {t('diag.results.resilience')}: {resilience}%
          </p>
          {saveStatus !== 'idle' && (
            <p className="text-xs text-muted-foreground mt-2">
              {saveStatus === 'saved' ? t('crisis.diag.saved') : t('crisis.diag.savedOffline')}
            </p>
          )}
        </div>

        <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 text-left space-y-4">
          <FactorBreakdown factors={factors} />
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-left">
          <p className="text-xs text-muted-foreground leading-relaxed">{t('diag.results.context2010')}</p>
        </div>

        <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 text-left">
          <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap size={18} className="text-primary" /> {t('multi.recommendations')}
          </h4>
          <ul className="space-y-3">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={12} />
                </div>
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => setActiveModule('comprendre')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
          >
            <BookOpen size={14} /> {t('diag.results.ctaComprendre')}
          </button>
          <button
            type="button"
            onClick={() => setActiveModule('prevention')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-xs font-bold hover:border-primary/30"
          >
            <Shield size={14} /> {t('diag.results.ctaPrevention')}
          </button>
        </div>

        {result.laboPreset && (
          <button
            type="button"
            onClick={() => {
              saveLaboPreset(result.laboPreset!)
              setActiveModule('labo')
            }}
            className="w-full px-6 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <FlaskConical size={18} /> {t('diag.results.ctaLabo')}
          </button>
        )}

        <DiagnosticExportButton
          grade={result.grade}
          levelLabel={levelLabel}
          score={resilience}
          recommendations={recommendations}
        />

        <button
          type="button"
          onClick={onRestart}
          className="w-full px-6 py-4 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl font-bold transition-all border border-border flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} /> {t('multi.restart')}
        </button>
      </div>
    </div>
  )
}
