'use client';

import { useLang } from '@/lib/lang-context';
import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/lib/app-context';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Home, ShieldAlert, Zap, ArrowRight, CheckCircle, RotateCcw, Activity } from 'lucide-react';

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

interface RiskCard {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

interface AssessmentQuestion {
  id: string;
  factor: string;
  options: { value: string; label: string; score: number }[];
}

export function ModuleMultirisques() {
  const { lang, t } = useLang();
  const { activeModule, setActiveModule } = useApp();
  const [activeTab, setActiveTab] = useState<'multirisques' | 'diagnostic'>(
    activeModule === 'diagnostic' ? 'diagnostic' : 'multirisques'
  );
  const [assessmentStep, setAssessmentStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (activeModule === 'multirisques' || activeModule === 'diagnostic') {
      setActiveTab(activeModule);
    }
  }, [activeModule]);

  const handleTabChange = (tab: 'multirisques' | 'diagnostic') => {
    setActiveTab(tab);
    setActiveModule(tab);
  };

  const riskCards: RiskCard[] = [
    { id: 'landslides', title: t('multi.landslides'), description: t('multi.landslides.desc'), severity: 'high' },
    { id: 'floods', title: t('multi.floods'), description: t('multi.floods.desc'), severity: 'high' },
    { id: 'hurricanes', title: t('multi.hurricanes'), description: t('multi.hurricanes.desc2'), severity: 'high' },
    { id: 'erosion', title: t('multi.erosion'), description: t('multi.erosion.desc2'), severity: 'medium' },
    { id: 'drought', title: t('multi.drought'), description: t('multi.drought.desc2'), severity: 'medium' },
  ];

  const assessmentQuestions: AssessmentQuestion[] = [
    {
      id: 'structure',
      factor: t('multi.structure'),
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
      options: [
        { value: 'flat', label: t('multi.opt.terrainFlat'), score: 1 },
        { value: 'slope', label: t('multi.opt.terrainSlope'), score: 3 },
        { value: 'steep', label: t('multi.opt.terrainSteep'), score: 4 },
      ],
    },
  ];

  const calculateVulnerability = () => {
    let totalScore = 0;
    Object.values(answers).forEach(val => {
      const score = parseInt(val);
      if (!isNaN(score)) totalScore += score;
    });
    const avgScore = totalScore / assessmentQuestions.length;

    if (avgScore <= 1.5) return { level: 'resilient', label: t('multi.resilient') };
    if (avgScore <= 2.5) return { level: 'moderate', label: t('multi.moderate') };
    return { level: 'vulnerable', label: t('multi.vulnerable') };
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const allAnswered = assessmentQuestions.every(q => answers[q.id]);

  const handleStartAssessment = () => {
    setAnswers({});
    setAssessmentStep('questions');
  };

  const handleSubmitAssessment = () => {
    if (allAnswered) {
      setAssessmentStep('results');
    }
  };

  const vulnerability = calculateVulnerability();

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Background Textures */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-background to-red-500/5 dark:from-blue-900/20 dark:to-red-900/10 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => handleTabChange('multirisques')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border",
              activeTab === 'multirisques'
                ? "bg-primary/10 border-primary text-foreground shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                : "bg-card border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border"
            )}
          >
            <ShieldAlert size={18} className={activeTab === 'multirisques' ? "text-primary" : ""} />
            {t('multi.title')}
          </button>
          <button
            onClick={() => handleTabChange('diagnostic')}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border",
              activeTab === 'diagnostic'
                ? "bg-primary/10 border-primary text-foreground shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                : "bg-card border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border"
            )}
          >
            <Home size={18} className={activeTab === 'diagnostic' ? "text-primary" : ""} />
            {t('multi.diag.title')}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'multirisques' ? (
            <motion.div key="multi" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">{t('multi.title')}</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">{t('multi.subtitle')}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {riskCards.map((risk) => (
                  <GlassCard
                    key={risk.id}
                    glowColor={risk.severity === 'high' ? '#ef4444' : risk.severity === 'medium' ? '#eab308' : '#22c55e'}
                    className="p-6 group hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 relative z-10">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110",
                          risk.severity === 'high' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          risk.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          'bg-green-500/10 text-green-500 border border-green-500/20'
                        )}
                      >
                        <AlertTriangle size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-2">{risk.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{risk.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="diag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">{t('multi.diag.title')}</h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">{t('multi.diag.subtitle')}</p>
              </div>

              <AnimatePresence mode="wait">
                {assessmentStep === 'intro' && (
                  <motion.div key="intro" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <GlassCard className="max-w-2xl mx-auto p-8 md:p-12 text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Home size={40} className="text-primary" />
                      </div>
                      <h3 className="text-2xl font-black text-foreground mb-4">
                        {t('multi.diag.introTitle')}
                      </h3>
                      <p className="text-muted-foreground mb-8 leading-relaxed text-sm sm:text-base max-w-md mx-auto">
                        {t('multi.diag.introDesc')}
                      </p>
                      <button
                        onClick={handleStartAssessment}
                        className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all duration-300 active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-2 mx-auto"
                      >
                        {t('multi.startAssessment')} <ArrowRight size={18} />
                      </button>
                    </GlassCard>
                  </motion.div>
                )}

                {assessmentStep === 'questions' && (
                  <motion.div key="questions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <GlassCard className="max-w-2xl mx-auto p-6 sm:p-8 space-y-8">
                      {assessmentQuestions.map((question, index) => (
                        <div key={question.id} className="space-y-4">
                          <h3 className="text-base font-bold text-foreground flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0">{index + 1}</span>
                            {question.factor}
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {question.options.map((option) => {
                              const isSelected = answers[question.id] === option.score.toString();
                              return (
                                <label
                                  key={option.value}
                                  className={cn(
                                    "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                                    isSelected
                                      ? "border-primary bg-primary/5 text-primary shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                      : "border-border/50 bg-secondary/30 text-foreground hover:bg-secondary/50 hover:border-primary/30"
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name={question.id}
                                    value={option.score}
                                    checked={isSelected}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                    className="sr-only"
                                  />
                                  <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors", isSelected ? "border-primary" : "border-muted-foreground")}>
                                    {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                                  </div>
                                  <span className={cn("text-sm font-medium", isSelected ? "text-foreground" : "text-muted-foreground")}>
                                    {option.label}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-4 pt-6 border-t border-border/50">
                        <button
                          onClick={() => setAssessmentStep('intro')}
                          className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl font-bold transition-colors border border-border"
                        >
                          {t('multi.back')}
                        </button>
                        <button
                          onClick={handleSubmitAssessment}
                          disabled={!allAnswered}
                          className={cn(
                            "flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2",
                            allAnswered
                              ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-[0.98]"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                          )}
                        >
                          {t('multi.results')} <Activity size={18} />
                        </button>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {assessmentStep === 'results' && (
                  <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <GlassCard className="max-w-2xl mx-auto p-6 sm:p-10 space-y-8 text-center" glowColor={vulnerability.level === 'resilient' ? '#22c55e' : vulnerability.level === 'moderate' ? '#eab308' : '#ef4444'}>
                      
                      {/* Score visuel */}
                      <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-secondary" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path
                            className={cn("transition-all duration-1000 ease-out", 
                              vulnerability.level === 'resilient' ? "text-green-500" : 
                              vulnerability.level === 'moderate' ? "text-yellow-500" : "text-red-500"
                            )}
                            strokeWidth="3"
                            strokeDasharray={`${vulnerability.level === 'resilient' ? 100 : vulnerability.level === 'moderate' ? 60 : 25}, 100`}
                            stroke="currentColor" fill="none" strokeLinecap="round"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-black text-foreground">
                            {vulnerability.level === 'resilient' ? "A" : vulnerability.level === 'moderate' ? "C" : "E"}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Score</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-black text-foreground mb-2">{t('multi.results')}</h3>
                        <div className={cn(
                          "inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm tracking-wide border",
                          vulnerability.level === 'resilient' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' : 
                          vulnerability.level === 'moderate' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' : 
                          'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                        )}>
                          {vulnerability.level === 'resilient' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                          {vulnerability.label}
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 text-left">
                        <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                          <Zap size={18} className="text-primary" /> {t('multi.recommendations')}
                        </h4>
                        <ul className="space-y-3">
                          {[t('multi.reinforceWalls'), t('multi.improveFoundation'), t('multi.addBracing'), t('multi.improveQuality')].map((rec, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle size={12} />
                              </div>
                              <span className="leading-relaxed">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setAssessmentStep('intro')}
                        className="w-full px-6 py-4 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl font-bold transition-all border border-border flex items-center justify-center gap-2"
                      >
                        <RotateCcw size={18} /> {t('multi.restart')}
                      </button>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
