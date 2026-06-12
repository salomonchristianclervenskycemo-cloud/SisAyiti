'use client'

import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight, Activity } from 'lucide-react'
import { BuildingDiagram } from '@/components/diagnostic/building-diagram'

export type AssessmentQuestion = {
  id: string
  factor: string
  hintKey: string
  options: { value: string; label: string; score: number }[]
}

type Props = {
  questions: AssessmentQuestion[]
  answers: Record<string, string>
  step: number
  onAnswer: (questionId: string, value: string) => void
  onStepChange: (step: number) => void
  onSubmit: () => void
  onBackToIntro: () => void
}

export function DiagnosticWizard({
  questions,
  answers,
  step,
  onAnswer,
  onStepChange,
  onSubmit,
  onBackToIntro,
}: Props) {
  const { t } = useLang()
  const question = questions[step]
  const total = questions.length
  const isLast = step === total - 1
  const hasAnswer = Boolean(answers[question.id])
  const progress = Math.round(((step + (hasAnswer ? 1 : 0)) / total) * 100)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-muted-foreground">
          <span>{t('diag.wizard.step').replace('{current}', String(step + 1)).replace('{total}', String(total))}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <BuildingDiagram structure={answers.structure} shaking={hasAnswer && step >= 2} />
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center">
          <p className="text-xs text-muted-foreground leading-relaxed">{t(question.hintKey)}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 sm:p-8 space-y-5">
        <h3 className="text-base font-bold text-foreground flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0">
            {step + 1}
          </span>
          {question.factor}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {question.options.map((option) => {
            const isSelected = answers[question.id] === option.value
            return (
              <label
                key={option.value}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                    : 'border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30'
                )}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => onAnswer(question.id, option.value)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                    isSelected ? 'border-primary' : 'border-muted-foreground'
                  )}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <span className={cn('text-sm font-medium', isSelected ? 'text-foreground' : 'text-muted-foreground')}>
                  {option.label}
                </span>
              </label>
            )
          })}
        </div>

        <div className="flex gap-3 pt-4 border-t border-border/50">
          <button
            type="button"
            onClick={() => (step === 0 ? onBackToIntro() : onStepChange(step - 1))}
            className="px-5 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl font-bold transition-colors border border-border flex items-center gap-2"
          >
            <ArrowLeft size={16} /> {t('multi.back')}
          </button>
          {!isLast ? (
            <button
              type="button"
              onClick={() => onStepChange(step + 1)}
              disabled={!hasAnswer}
              className={cn(
                'flex-1 px-5 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2',
                hasAnswer
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              {t('multi.next')} <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!hasAnswer}
              className={cn(
                'flex-1 px-5 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2',
                hasAnswer
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              {t('multi.results')} <Activity size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
