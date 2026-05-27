"use client"
import { useState } from "react"
import { useLang } from "@/lib/lang-context"
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { comprendreQuizzes, type QuizLang } from "@/lib/translations/comprendre-quiz"

// --- Composants Utilitaires ---
const GlassCard = ({ children, className, glowColor }: { children: React.ReactNode, className?: string, glowColor?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl",
    "shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500",
    className
  )}>
    {glowColor && (
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-30 dark:opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: glowColor }}
      />
    )}
    {children}
  </div>
)

/* ── Animated SVGs ───────────────────────────────────────────── */

function TectoniqueSVG() {
  const { t } = useLang()
  return (
    <svg viewBox="0 0 400 180" className="w-full max-w-md h-44 drop-shadow-md" aria-label={t("comp.svg.tectonique")}>
      <defs>
        <linearGradient id="plateNA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="plateCA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <filter id="glowTecto" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* North American plate */}
      <rect x="0" y="30" width="185" height="120" rx="8" fill="url(#plateNA)" opacity="0.9">
        <animateTransform attributeName="transform" type="translate" values="0,0;-8,0;0,0" dur="4s" repeatCount="indefinite" />
      </rect>
      <text x="80" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" opacity="0.95">Plaque</text>
      <text x="80" y="108" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" opacity="0.95">Nord-américaine</text>
      <text x="40" y="155" fill="#bfdbfe" fontSize="10" fontWeight="bold">← Ouest</text>

      {/* Caribbean plate */}
      <rect x="215" y="30" width="185" height="120" rx="8" fill="url(#plateCA)" opacity="0.9">
        <animateTransform attributeName="transform" type="translate" values="0,0;8,0;0,0" dur="4s" repeatCount="indefinite" />
      </rect>
      <text x="310" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" opacity="0.95">Plaque</text>
      <text x="310" y="108" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" opacity="0.95">Caribéenne</text>
      <text x="320" y="155" fill="#bae6fd" fontSize="10" fontWeight="bold">Est →</text>

      {/* Fault zone */}
      <rect x="185" y="30" width="30" height="120" fill="#ef4444" opacity="0.4" filter="url(#glowTecto)" />
      <line x1="200" y1="20" x2="200" y2="160" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,4">
        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
      </line>
      <text x="200" y="15" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="800" filter="url(#glowTecto)">Faille EPGF</text>

      {/* Haiti pin */}
      <circle cx="185" cy="90" r="7" fill="#fbbf24" stroke="#fff" strokeWidth="2" filter="url(#glowTecto)">
        <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="185" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="900" filter="url(#glowTecto)">Haïti</text>

      {/* Arrows */}
      <text x="120" y="175" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">←←←</text>
      <text x="280" y="175" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">→→→</text>
    </svg>
  )
}

function FailleSVG() {
  const { t } = useLang()
  return (
    <svg viewBox="0 0 420 200" className="w-full max-w-md h-48" aria-label={t("comp.svg.faille")}>
      <defs>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4"/>
          <stop offset="30%" stopColor="#92400e" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#0D2B55" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      {/* Ground left block */}
      <path d="M0 80 L200 80 L205 200 L0 200 Z" fill="url(#groundGrad)" opacity="0.9">
        <animateTransform attributeName="transform" type="translate" values="0,0;-3,0;0,0" dur="5s" repeatCount="indefinite" />
      </path>
      {/* Ground right block */}
      <path d="M215 85 L420 85 L420 200 L210 200 Z" fill="url(#groundGrad)" opacity="0.9">
        <animateTransform attributeName="transform" type="translate" values="0,0;3,0;0,0" dur="5s" repeatCount="indefinite" />
      </path>
      {/* Surface */}
      <line x1="0" y1="80" x2="200" y2="80" stroke="#4ade80" strokeWidth="2.5"/>
      <line x1="215" y1="85" x2="420" y2="85" stroke="#4ade80" strokeWidth="2.5"/>
      {/* Fault plane */}
      <line x1="205" y1="200" x2="207" y2="0" stroke="#ff6b6b" strokeWidth="2.5" strokeDasharray="6,4"/>
      <text x="210" y="15" fill="#ff6b6b" fontSize="10" fontWeight="600">Faille d'Enriquillo</text>
      {/* Stress indicator */}
      <text x="50" y="130" fill="#93c5fd" fontSize="10">Compression ←</text>
      <text x="250" y="130" fill="#93c5fd" fontSize="10">→ Décrochement</text>
      {/* Labels */}
      <text x="80" y="70" fill="#4ade80" fontSize="9">Bloc Nord</text>
      <text x="280" y="75" fill="#4ade80" fontSize="9">Bloc Sud</text>
      <rect x="5" y="155" width="80" height="16" rx="3" fill="#fbbf24" opacity="0.15"/>
      <text x="45" y="167" textAnchor="middle" fill="#fbbf24" fontSize="9">Stress accumulé</text>
    </svg>
  )
}

function OndesSVG() {
  const { t } = useLang()
  return (
    <svg viewBox="0 0 420 180" className="w-full max-w-md h-44 drop-shadow-md" aria-label={t("comp.svg.ondes")}>
      {/* P-waves (compression) */}
      <text x="10" y="30" fill="#3b82f6" fontSize="12" fontWeight="800">Ondes P (compression)</text>
      <g>
        {[0,20,40,60,80,100,120,140,160,180,200,220,240,260].map((x, i) => (
          <rect key={i} x={x+20} y={40} width={i % 2 === 0 ? 14 : 6} height={16} rx="4" fill="#3b82f6" opacity={0.8 + 0.2*Math.sin(i)}>
            <animateTransform attributeName="transform" type="translate"
              values="0,0;6,0;0,0;-6,0;0,0" dur={`${0.5 + i*0.05}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>
      <text x="300" y="53" fill="#3b82f6" fontSize="10" fontWeight="bold" opacity="0.8">←●→ Particules</text>

      {/* S-waves (shear) */}
      <text x="10" y="95" fill="#a855f7" fontSize="12" fontWeight="800">Ondes S (cisaillement)</text>
      <path
        d="M20 115 Q40 95 60 115 Q80 135 100 115 Q120 95 140 115 Q160 135 180 115 Q200 95 220 115 Q240 135 260 115 Q280 95 300 115"
        stroke="#a855f7" strokeWidth="4" strokeLinecap="round" fill="none"
      >
        <animateTransform attributeName="transform" type="translate" values="0,0;12,0;0,0" dur="1s" repeatCount="indefinite" />
      </path>
      <text x="305" y="119" fill="#a855f7" fontSize="10" fontWeight="bold" opacity="0.8">↕ Particules</text>

      {/* Surface waves */}
      <text x="10" y="155" fill="#22c55e" fontSize="12" fontWeight="800">Ondes de surface</text>
      <path
        d="M20 168 Q30 155 40 168 Q50 181 60 168 Q70 155 80 168 Q90 181 100 168 Q110 155 120 168 Q130 181 140 168 Q150 155 160 168 Q170 181 180 168 Q190 155 200 168"
        stroke="#22c55e" strokeWidth="4" strokeLinecap="round" fill="none"
      >
        <animateTransform attributeName="transform" type="translate" values="0,0;15,0;0,0" dur="1.5s" repeatCount="indefinite" />
      </path>
      <text x="205" y="172" fill="#22c55e" fontSize="10" fontWeight="bold" opacity="0.8">↕↔ Elliptique</text>
    </svg>
  )
}

function EchelleSVG({ magnitude }: { magnitude: number }) {
  const pga = Math.pow(10, (magnitude - 3) * 0.6 - 2)
  const intensity = Math.min(12, Math.max(1, Math.round((magnitude - 1) * 1.5)))
  const colors = ["#22c55e","#86efac","#fde047","#fb923c","#f87171","#dc2626","#991b1b","#7f1d1d"]
  const col = colors[Math.min(colors.length-1, Math.round((magnitude-3)/0.9))]

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border w-full max-w-xs">
      <div className="text-3xl font-bold" style={{ color: col }}>Mw {magnitude.toFixed(1)}</div>
      <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((magnitude-3)/6.5)*100}%`, background: col }} />
      </div>
      <div className="grid grid-cols-2 gap-3 w-full text-sm">
        <div className="text-center p-2 bg-card rounded-lg border border-border">
          <div className="text-xs text-muted-foreground">PGA estimé</div>
          <div className="font-bold text-foreground">{(pga*100).toFixed(2)}%g</div>
        </div>
        <div className="text-center p-2 bg-card rounded-lg border border-border">
          <div className="text-xs text-muted-foreground">Intensité EMS</div>
          <div className="font-bold" style={{ color: col }}>{"I".repeat(Math.min(intensity,4))}{intensity > 4 ? `+${intensity-4}` : ""} / XII</div>
        </div>
      </div>
    </div>
  )
}

function HypocentreSVG() {
  const { t } = useLang()
  return (
    <svg viewBox="0 0 380 220" className="w-full max-w-sm h-52" aria-label={t("comp.svg.hypocentre")}>
      <defs>
        <radialGradient id="epicGrad" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* Surface */}
      <line x1="0" y1="50" x2="380" y2="50" stroke="#4ade80" strokeWidth="2.5"/>
      <text x="10" y="45" fill="#4ade80" fontSize="10">Surface terrestre</text>

      {/* Depth layers */}
      <rect x="0" y="50" width="380" height="170" fill="#1A5E9A" opacity="0.15"/>
      <line x1="0" y1="110" x2="380" y2="110" stroke="#1A5E9A" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4"/>
      <line x1="0" y1="170" x2="380" y2="170" stroke="#1A5E9A" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4"/>
      <text x="345" y="108" fill="#60a5fa" fontSize="8" opacity="0.6">20 km</text>
      <text x="345" y="168" fill="#60a5fa" fontSize="8" opacity="0.6">60 km</text>

      {/* Hypocentre (Haiti 2010: 13km) */}
      <circle cx="190" cy="116" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2">
        <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <text x="210" y="120" fill="#ef4444" fontSize="10" fontWeight="600">Hypocentre (13 km)</text>

      {/* Projection line */}
      <line x1="190" y1="50" x2="190" y2="116" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5,3"/>
      <line x1="183" y1="14" x2="197" y2="14" stroke="#fbbf24" strokeWidth="2"/>
      <line x1="190" y1="10" x2="190" y2="20" stroke="#fbbf24" strokeWidth="2"/>
      <text x="205" y="18" fill="#fbbf24" fontSize="10" fontWeight="600">Épicentre</text>

      {/* Damage radius circles */}
      <ellipse cx="190" cy="50" rx="60" ry="8" fill="url(#epicGrad)" opacity="0.8"/>
      <ellipse cx="190" cy="50" rx="100" ry="12" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="5,4" opacity="0.4"/>
      <ellipse cx="190" cy="50" rx="140" ry="16" fill="none" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="5,4" opacity="0.25"/>

      {/* Depth arrow */}
      <line x1="30" y1="50" x2="30" y2="116" stroke="#93c5fd" strokeWidth="1.5" markerEnd="url(#arrow)"/>
      <text x="8" y="88" fill="#93c5fd" fontSize="9">13 km</text>
    </svg>
  )
}

/* ── Quiz component ──────────────────────────────────────────── */

function QuizPanel({ sectionIndex }: { sectionIndex: number }) {
  const { lang, t } = useLang()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const quizLang: QuizLang = lang === "kr" ? "kr" : lang === "en" ? "en" : lang === "es" ? "es" : "fr"
  const questions = comprendreQuizzes[sectionIndex]?.[quizLang] ?? comprendreQuizzes[sectionIndex]?.fr ?? []

  const handleSubmit = () => setSubmitted(true)
  const reset = () => { setAnswers({}); setSubmitted(false) }
  const score = questions.filter((q, i) => answers[i] === q.correct).length

  return (
    <div className="mt-6 p-5 rounded-xl bg-secondary/30 border border-border/50 shadow-inner space-y-5">
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
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [qi]: oi }))}
                  disabled={submitted}
                  className={cn(
                    "w-full text-left text-sm px-4 py-3 rounded-xl border transition-all duration-300",
                    isCorrect ? "bg-green-500/20 border-green-500/40 text-green-700 dark:text-green-400 font-medium" :
                    isWrong ? "bg-red-500/20 border-red-500/40 text-red-700 dark:text-red-400 font-medium" :
                    isSelected ? "bg-primary/20 border-primary/40 text-foreground font-medium shadow-[0_0_15px_rgba(59,130,246,0.1)]" :
                    "bg-card border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:shadow-sm"
                  )}
                >
                  <span className="flex items-center gap-3">
                    {submitted && isCorrect ? <CheckCircle size={16} className="text-green-500 shrink-0" /> :
                     submitted && isWrong ? <XCircle size={16} className="text-red-500 shrink-0" /> :
                     <div className={cn("w-4 h-4 rounded-full border flex-shrink-0 transition-colors", isSelected ? "border-primary border-4" : "border-muted-foreground")} />}
                    {opt}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold disabled:opacity-40 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {t("quiz.submit")}
        </button>
      ) : (
        <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border/50 shadow-sm">
          <div className={cn("text-base font-bold flex items-center gap-2", score === questions.length ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400")}>
            {score === questions.length ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {score}/{questions.length} {t("quiz.correctAnswers")}
          </div>
          <button onClick={reset} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
            {t("quiz.retry")}
          </button>
        </div>
      )}
    </div>
  )
}

/* ── Main Module ─────────────────────────────────────────────── */

type Section = { titleKey: string; content: React.ReactNode }

export default function ModuleComprendre() {
  const { lang, t } = useLang()
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]))
  const [magnitude, setMagnitude] = useState(7.0)

  const toggle = (i: number) =>
    setOpenSections(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })

  const sections = [
    {
      titleKey: "comp.tecto.title",
      content: (
        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-foreground text-base mb-2">{t("comp.tecto.gonave")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("comp.tecto.desc")}</p>
          </div>
          <div className="flex justify-center py-4"><TectoniqueSVG /></div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 shadow-sm hover:bg-destructive/10 transition-colors">
              <h4 className="font-bold text-sm text-destructive mb-2">{t("comp.tecto.failleSeptentrionale")}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.tecto.failleSepDesc")}</p>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 shadow-sm hover:bg-orange-500/10 transition-colors">
              <h4 className="font-bold text-sm text-orange-600 dark:text-orange-400 mb-2">{t("comp.tecto.failleEnriquillo")}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.tecto.failleEnDesc")}</p>
            </div>
          </div>
          
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-sm text-foreground mb-2">{t("comp.mecaDécroch")}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.mecaDesc")}</p>
          </div>
        </div>
      ),
    },
    {
      titleKey: "comp.ondes.title",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-4 rounded-xl border border-border/50">{t("comp.ondes.intro")}</p>
          <div className="flex justify-center py-4"><OndesSVG /></div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-sky-500/5 border border-sky-500/20 rounded-xl p-4 shadow-sm hover:bg-sky-500/10 transition-colors">
              <h4 className="font-bold text-sm text-sky-600 dark:text-sky-400 mb-2">{t("comp.ondesP.title")}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.ondesP.desc")}</p>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 shadow-sm hover:bg-purple-500/10 transition-colors">
              <h4 className="font-bold text-sm text-purple-600 dark:text-purple-400 mb-2">{t("comp.ondesS.title")}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.ondesS.desc")}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 shadow-sm hover:bg-emerald-500/10 transition-colors">
              <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-2">{t("comp.ondesLove.title")}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.ondesLove.desc")}</p>
            </div>
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 shadow-sm hover:bg-rose-500/10 transition-colors">
              <h4 className="font-bold text-sm text-rose-600 dark:text-rose-400 mb-2">{t("comp.ondesRayleigh.title")}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("comp.ondesRayleigh.desc")}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      titleKey: "comp.structure.title",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-5 text-sm leading-relaxed space-y-4 text-muted-foreground shadow-sm">
            <div className="flex items-center gap-4 p-3 bg-card/50 rounded-lg border border-border/50 hover:border-amber-500/30 transition-colors">
              <div className="w-8 h-8 rounded-full border-4 border-amber-500/30 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 rounded-full bg-amber-500" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-foreground">{t("comp.structure.croute")}</div>
                <div className="text-xs opacity-80">Solide, 0-70 km</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-card/50 rounded-lg border border-border/50 hover:border-red-500/30 transition-colors">
              <div className="w-8 h-8 rounded-full border-4 border-red-500/30 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 rounded-full bg-red-500" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-foreground">{t("comp.structure.manteau")}</div>
                <div className="text-xs opacity-80">Visqueux, 70-2900 km</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-card/50 rounded-lg border border-border/50 hover:border-blue-500/30 transition-colors">
              <div className="w-8 h-8 rounded-full border-4 border-blue-500/30 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-foreground">{t("comp.structure.noyauExterne")}</div>
                <div className="text-xs opacity-80">Liquide, 2900-5100 km</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-card/50 rounded-lg border border-border/50 hover:border-yellow-500/30 transition-colors">
              <div className="w-8 h-8 rounded-full border-4 border-yellow-500/30 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-foreground">{t("comp.structure.noyauInterne")}</div>
                <div className="text-xs opacity-80">Solide, 5100-6371 km</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      titleKey: "comp.chrono.title",
      content: (
        <div className="space-y-4">
          <div className="bg-red-500/5 border-l-4 border-red-500 p-5 rounded-r-xl text-sm leading-relaxed text-muted-foreground shadow-sm hover:bg-red-500/10 transition-colors relative overflow-hidden group">
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="font-black text-red-600 dark:text-red-400 mb-1 text-lg tracking-tight">1751 & 1770</div>
            <p className="relative z-10">{t("comp.chrono.1751")}</p>
          </div>
          <div className="bg-orange-500/5 border-l-4 border-orange-500 p-5 rounded-r-xl text-sm leading-relaxed text-muted-foreground shadow-sm hover:bg-orange-500/10 transition-colors relative overflow-hidden group">
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="font-black text-orange-600 dark:text-orange-400 mb-1 text-lg tracking-tight">1842</div>
            <p className="relative z-10">{t("comp.chrono.1842")}</p>
          </div>
          <div className="bg-destructive/5 border-l-4 border-destructive p-5 rounded-r-xl text-sm leading-relaxed text-muted-foreground shadow-sm hover:bg-destructive/10 transition-colors relative overflow-hidden group">
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="font-black text-destructive mb-1 text-lg tracking-tight">12 janvier 2010 <span className="text-xs font-bold bg-destructive/20 px-2 py-0.5 rounded-full ml-2">Mw 7.0</span></div>
            <p className="relative z-10">{t("comp.chrono.2010")}</p>
          </div>
          <div className="bg-destructive/5 border-l-4 border-destructive p-5 rounded-r-xl text-sm leading-relaxed text-muted-foreground shadow-sm hover:bg-destructive/10 transition-colors relative overflow-hidden group">
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="font-black text-destructive mb-1 text-lg tracking-tight">14 août 2021 <span className="text-xs font-bold bg-destructive/20 px-2 py-0.5 rounded-full ml-2">Mw 7.2</span></div>
            <p className="relative z-10">{t("comp.chrono.2021")}</p>
          </div>
        </div>
      ),
    },
    {
      titleKey: "comp.construct.title",
      content: (
        <div className="space-y-6">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-base text-foreground mb-2">{t("comp.construct.chainee")}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("comp.construct.chaineeDesc")}</p>
          </div>
          
          <div>
            <h4 className="font-bold text-base text-foreground mb-3">{t("comp.construct.erreurs")}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border-2 border-red-500/20 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all group">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <XCircle size={20} className="text-red-500" />
                </div>
                <p className="font-bold text-foreground mb-1">{t("comp.construct.sableSale").split(":")[0]}</p>
                <p className="text-xs">{t("comp.construct.sableSale").split(":")[1]}</p>
              </div>
              <div className="bg-card border-2 border-orange-500/20 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all group">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <XCircle size={20} className="text-orange-500" />
                </div>
                <p className="font-bold text-foreground mb-1">{t("comp.construct.betonLiquide").split(":")[0]}</p>
                <p className="text-xs">{t("comp.construct.betonLiquide").split(":")[1]}</p>
              </div>
              <div className="bg-card border-2 border-yellow-500/20 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] transition-all group">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <XCircle size={20} className="text-yellow-500" />
                </div>
                <p className="font-bold text-foreground mb-1">{t("comp.construct.fersLisses").split(":")[0]}</p>
                <p className="text-xs">{t("comp.construct.fersLisses").split(":")[1]}</p>
              </div>
              <div className="bg-card border-2 border-green-500/20 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all group">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <p className="font-bold text-foreground mb-1">{t("comp.construct.clissage").split(":")[0]}</p>
                <p className="text-xs">{t("comp.construct.clissage").split(":")[1]}</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Background Textures */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-background to-red-500/5 dark:from-blue-900/20 dark:to-red-900/10 pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            {t("nav.comprendre")}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            {t("comp.subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section, i) => (
            <GlassCard key={i} className="group hover:border-primary/30 transition-colors duration-300">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
                aria-expanded={openSections.has(i)}
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                    openSections.has(i) ? "bg-primary text-primary-foreground font-bold" : "bg-primary/10 text-primary font-semibold group-hover:bg-primary/20"
                  )}>
                    {i + 1}
                  </span>
                  <span className="font-bold text-foreground text-base">{t(section.titleKey)}</span>
                </div>
                <motion.div
                  animate={{ rotate: openSections.has(i) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown size={20} className="text-muted-foreground" />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openSections.has(i) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
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
