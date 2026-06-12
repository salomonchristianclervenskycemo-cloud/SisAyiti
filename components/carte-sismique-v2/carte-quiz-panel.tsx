'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { carteQuiz, type CarteQuizLang } from '@/lib/translations/carte-quiz'
import { CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CarteQuizPanel() {
  const { lang, t } = useLang()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const quizLang: CarteQuizLang = lang === 'kr' ? 'kr' : lang === 'en' ? 'en' : lang === 'es' ? 'es' : 'fr'
  const questions = carteQuiz[quizLang] ?? carteQuiz.fr
  const score = questions.filter((q, i) => answers[i] === q.correct).length

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
      <div className="text-xs font-bold text-white flex items-center gap-2">
        <div className="w-1.5 h-4 bg-cyan-500 rounded-full" />
        {t('common.verifConnaissances')}
      </div>
      {questions.map((q, qi) => (
        <div key={qi} className="space-y-1.5">
          <p className="text-xs font-semibold text-gray-200">{q.q}</p>
          <div className="space-y-1.5">
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
                    'w-full text-left text-[11px] px-3 py-2 rounded-lg border transition-all',
                    isCorrect && 'bg-green-500/20 border-green-500/40 text-green-300',
                    isWrong && 'bg-red-500/20 border-red-500/40 text-red-300',
                    !isCorrect && !isWrong && isSelected && 'bg-cyan-500/20 border-cyan-500/40 text-gray-200',
                    !isCorrect && !isWrong && !isSelected && 'bg-black/30 border-white/10 text-gray-400 hover:border-cyan-500/30'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {submitted && isCorrect && <CheckCircle size={12} className="text-green-400 shrink-0" />}
                    {submitted && isWrong && <XCircle size={12} className="text-red-400 shrink-0" />}
                    {opt}
                  </span>
                </button>
              )
            })}
          </div>
          {submitted && answers[qi] !== q.correct && q.explain && (
            <p className="text-[10px] text-gray-500 border-l-2 border-cyan-500/40 pl-2">{q.explain}</p>
          )}
        </div>
      ))}
      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-2.5 rounded-lg bg-cyan-600 text-white text-xs font-bold disabled:opacity-40"
        >
          {t('quiz.submit')}
        </button>
      ) : (
        <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-lg border border-white/10">
          <span className={cn('text-xs font-bold', score === questions.length ? 'text-green-400' : 'text-amber-400')}>
            {score}/{questions.length} {t('quiz.correctAnswers')}
          </span>
          <button
            type="button"
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
            }}
            className="text-[10px] font-semibold text-cyan-400 underline"
          >
            {t('quiz.retry')}
          </button>
        </div>
      )}
    </div>
  )
}
