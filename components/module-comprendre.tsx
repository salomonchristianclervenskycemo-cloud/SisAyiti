"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useLang } from "@/lib/lang-context"
import { ChevronDown, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { comprendreQuizzes, type QuizLang } from "@/lib/translations/comprendre-quiz"
import { markComprendreSectionOpened } from "@/lib/offline-education"
import { LearnPathProgress } from "@/components/comprendre/learn-path-progress"
import { SvgSkeleton } from "@/components/comprendre/svg-skeleton"
import { ScienceCallout } from "@/components/comprendre/science-callout"
import { HaitiFaultMap } from "@/components/comprendre/haiti-fault-map"
import { HaitiHistoryPanel } from "@/components/comprendre/haiti-history-panel"
import { MagnitudeIntensityLab } from "@/components/comprendre/magnitude-intensity-lab"
import { HypocenterExplorer } from "@/components/comprendre/hypocenter-explorer"
import { WaveTimingDemo } from "@/components/comprendre/wave-timing-demo"
import { SoilAmplificationDemo } from "@/components/comprendre/soil-amplification-demo"
import { AftershocksPanel } from "@/components/comprendre/aftershocks-panel"
import { EarthLayersSVG } from "@/components/comprendre/earth-layers-svg"

const TectoniqueLazy = dynamic(
  () => import("@/components/comprendre/tectonique-svg").then((m) => ({ default: m.TectoniqueSVG })),
  { loading: () => <SvgSkeleton /> }
)
const OndesLazy = dynamic(
  () => import("@/components/comprendre/ondes-svg").then((m) => ({ default: m.OndesSVG })),
  { loading: () => <SvgSkeleton /> }
)

const GlassCard = ({ children, className, glowColor }: { children: React.ReactNode; className?: string; glowColor?: string }) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl",
      "shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500",
      className
    )}
  >
    {glowColor && (
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-30 dark:opacity-20 pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />
    )}
    {children}
  </div>
)

function QuizPanel({ sectionIndex }: { sectionIndex: number }) {
  const { lang, t } = useLang()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const quizLang: QuizLang = lang === "kr" ? "kr" : lang === "en" ? "en" : lang === "es" ? "es" : "fr"
  const questions = comprendreQuizzes[sectionIndex]?.[quizLang] ?? comprendreQuizzes[sectionIndex]?.fr ?? []

  if (questions.length === 0) return null

  const score = questions.filter((q, i) => answers[i] === q.correct).length

  return (
    <div className="mt-6 p-5 rounded-xl bg-secondary/30 border border-border/50 space-y-5">
      <div className="text-base font-bold text-foreground flex items-center gap-2">
        <div className="w-2 h-6 bg-primary rounded-full" />
        {t("common.verifConnaissances")}
      </div>
      {questions.map((q, qi) => (
        <div key={qi} className="space-y-3">
          <p className="text-sm text-foreground font-semibold">{q.q}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const isSelected = answers[qi] === oi
              const isCorrect = submitted && oi === q.correct
              const isWrong = submitted && isSelected && oi !== q.correct
              return (
                <button
                  key={oi}
                  onClick={() => !submitted && setAnswers((a) => ({ ...a, [qi]: oi }))}
                  disabled={submitted}
                  className={cn(
                    "w-full text-left text-sm px-4 py-3 rounded-xl border transition-all",
                    isCorrect && "bg-green-500/20 border-green-500/40 text-green-700 dark:text-green-400 font-medium",
                    isWrong && "bg-red-500/20 border-red-500/40 text-red-700 dark:text-red-400 font-medium",
                    !isCorrect && !isWrong && isSelected && "bg-primary/20 border-primary/40 text-foreground font-medium",
                    !isCorrect && !isWrong && !isSelected && "bg-card border-border/50 text-muted-foreground hover:border-primary/30"
                  )}
                >
                  <span className="flex items-center gap-3">
                    {submitted && isCorrect ? <CheckCircle size={16} className="text-green-500 shrink-0" /> : null}
                    {submitted && isWrong ? <XCircle size={16} className="text-red-500 shrink-0" /> : null}
                    {!submitted || (!isCorrect && !isWrong) ? (
                      <div className={cn("w-4 h-4 rounded-full border shrink-0", isSelected ? "border-primary border-4" : "border-muted-foreground")} />
                    ) : null}
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
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold disabled:opacity-40"
        >
          {t("quiz.submit")}
        </button>
      ) : (
        <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border/50">
          <div className={cn("text-base font-bold flex items-center gap-2", score === questions.length ? "text-green-600" : "text-orange-600")}>
            {score}/{questions.length} {t("quiz.correctAnswers")}
          </div>
          <button onClick={() => { setAnswers({}); setSubmitted(false) }} className="text-sm font-semibold text-primary underline">
            {t("quiz.retry")}
          </button>
        </div>
      )}
    </div>
  )
}

export default function ModuleComprendre() {
  const { t } = useLang()
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]))

  useEffect(() => {
    markComprendreSectionOpened(0)
  }, [])

  const toggle = (i: number) => {
    const willOpen = !openSections.has(i)
    setOpenSections((s) => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
    if (willOpen) {
      markComprendreSectionOpened(i)
    }
  }

  const deepTecto = (
    <div className="space-y-4">
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <h3 className="font-bold text-foreground text-base mb-2">{t("comp.tecto.gonave")}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("comp.tecto.desc")}</p>
      </div>
      <div className="flex justify-center py-4"><TectoniqueLazy /></div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
          <h4 className="font-bold text-sm text-destructive mb-2">{t("comp.tecto.failleSeptentrionale")}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.tecto.failleSepDesc")}</p>
        </div>
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
          <h4 className="font-bold text-sm text-orange-600 dark:text-orange-400 mb-2">{t("comp.tecto.failleEnriquillo")}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.tecto.failleEnDesc")}</p>
        </div>
      </div>
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
        <h4 className="font-bold text-sm text-foreground mb-2">{t("comp.mecaDécroch")}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.mecaDesc")}</p>
      </div>
    </div>
  )

  const deepOndes = (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-4 rounded-xl border border-border/50">{t("comp.ondes.intro")}</p>
      <div className="flex justify-center py-4"><OndesLazy /></div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4">
          <h4 className="font-bold text-sm text-foreground mb-2">{t("comp.ondesP.title")}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.ondesP.desc")}</p>
        </div>
        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
          <h4 className="font-bold text-sm text-foreground mb-2">{t("comp.ondesS.title")}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.ondesS.desc")}</p>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
          <h4 className="font-bold text-sm text-foreground mb-2">{t("comp.ondesLove.title")}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.ondesLove.desc")}</p>
        </div>
        <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4">
          <h4 className="font-bold text-sm text-foreground mb-2">{t("comp.ondesRayleigh.title")}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.ondesRayleigh.desc")}</p>
        </div>
      </div>
    </div>
  )

  const deepStructure = (
    <div className="space-y-4">
      <EarthLayersSVG />
      <div className="bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-5 text-sm space-y-3 text-muted-foreground">
        {(["comp.structure.croute", "comp.structure.manteau", "comp.structure.noyauExterne", "comp.structure.noyauInterne"] as const).map((key) => (
          <p key={key} className="leading-relaxed border-l-2 border-primary/30 pl-3">{t(key)}</p>
        ))}
      </div>
    </div>
  )

  const deepConstruct = (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        <h4 className="font-bold text-base text-foreground mb-2">{t("comp.construct.chainee")}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("comp.construct.chaineeDesc")}</p>
      </div>
      <div>
        <h4 className="font-bold text-base text-foreground mb-3">{t("comp.construct.erreurs")}</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {(["comp.construct.sableSale", "comp.construct.betonLiquide", "comp.construct.fersLisses", "comp.construct.clissage"] as const).map((key, idx) => (
            <div key={key} className={cn("bg-card border-2 rounded-2xl p-4 text-sm", idx < 3 ? "border-red-500/20" : "border-green-500/20")}>
              <p className="font-bold text-foreground mb-1">{t(key).split(":")[0]}</p>
              <p className="text-xs text-muted-foreground">{t(key).split(":").slice(1).join(":").trim()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const sections = [
    {
      titleKey: "comp.ch0.title",
      content: (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{t("comp.ch0.intro")}</p>
          <ScienceCallout whatKey="comp.ch0.what" whyKey="comp.ch0.why" haitiKey="comp.ch0.haiti" limitsKey="comp.ch0.limits" impactKey="comp.ch0.impact" />
          <HaitiFaultMap />
        </div>
      ),
    },
    {
      titleKey: "comp.ch1.title",
      content: <HaitiHistoryPanel />,
    },
    {
      titleKey: "comp.ch2.title",
      content: (
        <div className="space-y-6">
          <MagnitudeIntensityLab />
          <HypocenterExplorer />
        </div>
      ),
    },
    {
      titleKey: "comp.ch3.title",
      content: <WaveTimingDemo />,
    },
    {
      titleKey: "comp.ch4.title",
      content: <SoilAmplificationDemo />,
    },
    {
      titleKey: "comp.ch5.title",
      content: <AftershocksPanel />,
    },
    {
      titleKey: "comp.ch6.title",
      content: (
        <div className="space-y-8">
          {deepTecto}
          {deepOndes}
          {deepStructure}
          {deepConstruct}
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">{t("nav.comprendre")}</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">{t("comp.subtitle")}</p>
        </div>

        <LearnPathProgress />

        <div className="space-y-4">
          {sections.map((section, i) => (
            <GlassCard key={i} className="group hover:border-primary/30 transition-colors">
              <button onClick={() => toggle(i)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={openSections.has(i)}>
                <div className="flex items-center gap-4">
                  <span className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm", openSections.has(i) ? "bg-primary text-primary-foreground font-bold" : "bg-primary/10 text-primary font-semibold")}>
                    {i + 1}
                  </span>
                  <span className="font-bold text-foreground text-base">{t(section.titleKey)}</span>
                </div>
                <motion.div animate={{ rotate: openSections.has(i) ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={20} className="text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openSections.has(i) && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 border-t border-border/50">
                      {section.content}
                      <QuizPanel sectionIndex={i} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
