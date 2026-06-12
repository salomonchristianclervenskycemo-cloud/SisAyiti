'use client'

import { useLang } from '@/lib/lang-context'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'
import { assessBuilding, type BuildingAnswers } from '@/lib/building-vulnerability'
import { queuePendingDiagnostic, flushPendingDiagnostics } from '@/lib/offline-education'
import { ScienceCallout } from '@/components/comprendre/science-callout'
import { HaitiBuildingTypes } from '@/components/diagnostic/haiti-building-types'
import { DiagnosticWizard, type AssessmentQuestion } from '@/components/diagnostic/diagnostic-wizard'
import { DiagnosticResultsPanel } from '@/components/diagnostic/diagnostic-results-panel'
import { DiagnosticQuizPanel } from '@/components/diagnostic/diagnostic-quiz-panel'

export function DiagnosticTab() {
  const { t } = useLang()
  const [step, setStep] = useState<'intro' | 'questions' | 'results'>('intro')
  const [wizardStep, setWizardStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'offline'>('idle')
  const [assessmentResult, setAssessmentResult] = useState<ReturnType<typeof assessBuilding> | null>(null)

  const assessmentQuestions: AssessmentQuestion[] = useMemo(
    () => [
      {
        id: 'structure',
        factor: t('multi.structure'),
        hintKey: 'diag.wizard.hint.structure',
        options: [
          { value: 'concrete_reinforced', label: t('multi.opt.concreteReinforced'), score: 1 },
          { value: 'concrete_unreinforced', label: t('multi.opt.concreteUnreinforced'), score: 2 },
          { value: 'wood_brick', label: t('multi.opt.woodBrick'), score: 3 },
          { value: 'adobe', label: t('multi.opt.adobe'), score: 4 },
        ],
      },
      {
        id: 'foundation',
        factor: t('multi.foundation'),
        hintKey: 'diag.wizard.hint.foundation',
        options: [
          { value: 'good', label: t('multi.opt.foundationGood'), score: 1 },
          { value: 'adequate', label: t('multi.opt.foundationAdequate'), score: 2 },
          { value: 'poor', label: t('multi.opt.foundationPoor'), score: 3 },
          { value: 'none', label: t('multi.opt.foundationNone'), score: 4 },
        ],
      },
      {
        id: 'condition',
        factor: t('multi.condition'),
        hintKey: 'diag.wizard.hint.condition',
        options: [
          { value: 'excellent', label: t('multi.opt.excellent'), score: 1 },
          { value: 'good', label: t('multi.opt.good'), score: 2 },
          { value: 'fair', label: t('multi.opt.fair'), score: 3 },
          { value: 'poor', label: t('multi.opt.poor'), score: 4 },
        ],
      },
      {
        id: 'age',
        factor: t('multi.age'),
        hintKey: 'diag.wizard.hint.age',
        options: [
          { value: 'recent', label: t('multi.opt.ageRecent'), score: 1 },
          { value: 'moderate', label: t('multi.opt.ageModerate'), score: 2 },
          { value: 'old', label: t('multi.opt.ageOld'), score: 3 },
          { value: 'very_old', label: t('multi.opt.ageVeryOld'), score: 4 },
        ],
      },
      {
        id: 'terrain',
        factor: t('multi.terrain'),
        hintKey: 'diag.wizard.hint.terrain',
        options: [
          { value: 'flat', label: t('multi.opt.terrainFlat'), score: 1 },
          { value: 'slope', label: t('multi.opt.terrainSlope'), score: 3 },
          { value: 'steep', label: t('multi.opt.terrainSteep'), score: 4 },
        ],
      },
    ],
    [t]
  )

  const buildAnswersPayload = (): BuildingAnswers | null => {
    const ids = ['structure', 'foundation', 'condition', 'age', 'terrain'] as const
    const out: Partial<BuildingAnswers> = {}
    for (const id of ids) {
      if (!answers[id]) return null
      out[id] = answers[id]
    }
    return out as BuildingAnswers
  }

  const handleStart = () => {
    setAnswers({})
    setWizardStep(0)
    setStep('questions')
  }

  const handleSubmit = async () => {
    const payload = buildAnswersPayload()
    if (!payload) return
    const result = assessBuilding(payload)
    setAssessmentResult(result)
    setStep('results')
    setSaveStatus('idle')

    const recLabels = result.recommendationKeys.map((k) => t(k))
    const body = {
      ...payload,
      score: result.score,
      vulnerabilityLevel: result.level,
      recommendations: recLabels,
      latitude: null,
      longitude: null,
    }

    try {
      const res = await fetch('/api/diagnostics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setSaveStatus('saved')
        flushPendingDiagnostics().catch(() => {})
      } else {
        queuePendingDiagnostic({ ...body, recommendations: recLabels, createdAt: new Date().toISOString() })
        setSaveStatus('offline')
      }
    } catch {
      queuePendingDiagnostic({ ...body, recommendations: recLabels, createdAt: new Date().toISOString() })
      setSaveStatus('offline')
    }
  }

  const levelLabel = assessmentResult
    ? assessmentResult.level === 'resilient'
      ? t('multi.resilient')
      : assessmentResult.level === 'moderate'
        ? t('multi.moderate')
        : t('multi.vulnerable')
    : ''

  const recommendations = assessmentResult?.recommendationKeys.map((k) => t(k)) ?? []
  const payload = buildAnswersPayload()

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">{t('multi.diag.title')}</h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">{t('multi.diag.subtitle')}</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">
            <ScienceCallout
              whatKey="diag.science.what"
              whyKey="diag.science.why"
              haitiKey="diag.science.haiti"
              limitsKey="diag.science.limits"
              impactKey="diag.science.impact"
            />
            <HaitiBuildingTypes />
            <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl max-w-2xl mx-auto p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home size={40} className="text-primary" />
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4">{t('multi.diag.introTitle')}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed text-sm sm:text-base max-w-md mx-auto">
                {t('multi.diag.introDesc')}
              </p>
              <button
                type="button"
                onClick={handleStart}
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-2 mx-auto"
              >
                {t('multi.startAssessment')} <ArrowRight size={18} />
              </button>
            </div>
            <DiagnosticQuizPanel />
          </motion.div>
        )}

        {step === 'questions' && (
          <motion.div key="questions" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
            <DiagnosticWizard
              questions={assessmentQuestions}
              answers={answers}
              step={wizardStep}
              onAnswer={(id, value) => setAnswers((prev) => ({ ...prev, [id]: value }))}
              onStepChange={setWizardStep}
              onSubmit={handleSubmit}
              onBackToIntro={() => setStep('intro')}
            />
          </motion.div>
        )}

        {step === 'results' && assessmentResult && payload && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
            <DiagnosticResultsPanel
              result={assessmentResult}
              answers={payload}
              levelLabel={levelLabel}
              recommendations={recommendations}
              saveStatus={saveStatus}
              onRestart={() => {
                setStep('intro')
                setAssessmentResult(null)
                setSaveStatus('idle')
                setWizardStep(0)
                setAnswers({})
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
