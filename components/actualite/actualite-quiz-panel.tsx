'use client'

import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { actualiteQuiz, type ActQuizLang } from '@/lib/translations/actualite-quiz'
import { cn } from '@/lib/utils'

export function ActualiteQuizPanel() {
  const { lang, t } = useLang()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const quizLang: ActQuizLang = lang === 'kr' ? 'kr' : lang === 'en' ? 'en' : lang === 'es' ? 'es' : 'fr'
  const questions = actualiteQuiz[quizLang] ?? actualiteQuiz.fr
  const score = questions.filter((q, i) => answers[i] === q.correct).length

  return (
    <div className="rounded-xl border border-border/50 bg-secondary/30 p-5 space-y-4">
      <div className="text-sm font-bold text-foreground flex items-center gap-2">
        <div className="w-2 h-5 bg-primary rounded-full" />
        {t('common.verifConnaissances')}
      </div>
      {questions.map((q, qi) => (
        <div key={qi} className="space-y-2">
          <p className="text-sm font-semibold text-foreground">{q.q}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const isSelected = answers[qi] === oi
              const isCorrect = submitted && oi === q.correct
              const isWrong = submitted && isSelected && oi !== q.correct
              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => !submitted && setAnswers((a) => ({ ...a, [qi]: oi }))}
                  disabled={submitted}
                  className={cn(
                    'w-full text-left text-sm px-4 py-3 rounded-xl border transition-all',
                    isCorrect && 'bg-green-500/20 border-green-500/40 text-green-700 dark:text-green-400',
                    isWrong && 'bg-red-500/20 border-red-500/40 text-red-700 dark:text-red-400',
                    !isCorrect && !isWrong && isSelected && 'bg-primary/15 border-primary/40 text-foreground',
                    !isCorrect && !isWrong && !isSelected && 'bg-card border-border/50 text-muted-foreground hover:border-primary/30'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {submitted && isCorrect && <CheckCircle size={14} className="text-green-500 shrink-0" />}
                    {submitted && isWrong && <XCircle size={14} className="text-red-500 shrink-0" />}
                    {opt}
                  </span>
                </button>
              )
            })}
          </div>
          {submitted && answers[qi] !== q.correct && q.explain && (
            <p className="text-xs text-muted-foreground border-l-2 border-primary/40 pl-3">{q.explain}</p>
          )}
        </div>
      ))}
      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold disabled:opacity-40"
        >
          {t('quiz.submit')}
        </button>
      ) : (
        <div className="flex items-center justify-between bg-card p-3 rounded-xl border border-border/50">
          <span className={cn('text-sm font-bold', score === questions.length ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400')}>
            {score}/{questions.length} {t('quiz.correctAnswers')}
          </span>
          <button
            type="button"
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
            }}
            className="text-xs font-semibold text-primary underline"
          >
            {t('quiz.retry')}
          </button>
        </div>
      )}
    </div>
  )
}
