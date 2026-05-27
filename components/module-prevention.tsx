'use client';

import { useLang } from '@/lib/lang-context';
import { useState, useMemo } from 'react';
import { AlertTriangle, CheckCircle, Shield, Heart, ChevronRight, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { l } from '@/lib/i18n';
import { preventionItems } from '@/lib/translations/prevention';

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

type TabType = 'bese' | 'pwoteje' | 'kenbe' | 'dangers' | 'kit';

interface ActionItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

function mapItems(tab: keyof typeof preventionItems, lang: ReturnType<typeof useLang>['lang']): ActionItem[] {
  return preventionItems[tab].map((item) => ({
    id: item.id,
    icon: item.icon,
    title: l(item.title, lang),
    description: l(item.description, lang),
  }))
}

export function ModulePrevention() {
  const { lang, t } = useLang();
  const [activeTab, setActiveTab] = useState<TabType>('bese');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) newChecked.delete(id);
    else newChecked.add(id);
    setCheckedItems(newChecked);
  };

  const tabItems = useMemo(() => ({
    bese: mapItems('bese', lang),
    pwoteje: mapItems('pwoteje', lang),
    kenbe: mapItems('kenbe', lang),
    dangers: mapItems('dangers', lang),
    kit: mapItems('kit', lang),
  }), [lang]);

  const currentItems = tabItems[activeTab];

  const progress = useMemo(() => {
    const total = currentItems.length;
    if (total === 0) return 0;
    const checked = currentItems.filter(item => checkedItems.has(item.id)).length;
    return Math.round((checked / total) * 100);
  }, [currentItems, checkedItems]);

  const tabConfig = [
    { key: 'bese' as const, label: t('prev.tab.bese'), color: '#3b82f6' },
    { key: 'pwoteje' as const, label: t('prev.tab.pwoteje'), color: '#eab308' },
    { key: 'kenbe' as const, label: t('prev.tab.kenbe'), color: '#22c55e' },
    { key: 'dangers' as const, label: t('prev.tab.dangers'), color: '#ef4444' },
    { key: 'kit' as const, label: t('prev.tab.kit'), color: '#a855f7' },
  ];

  const done = currentItems.filter(item => checkedItems.has(item.id)).length;
  const progressHint = t('prev.progress.hint')
    .replace('{done}', String(done))
    .replace('{total}', String(currentItems.length));

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 relative overflow-hidden font-sans transition-colors duration-300">
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-background to-red-500/5 dark:from-blue-900/20 dark:to-red-900/10 pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            {t('prev.title')}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            {t('prev.subtitleLong')}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {tabConfig.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap border',
                activeTab === tab.key
                  ? 'bg-primary/10 border-primary/50 text-foreground shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'bg-card border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border'
              )}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tab.color, boxShadow: `0 0 8px ${tab.color}` }} />
              {tab.label}
            </button>
          ))}
        </div>

        <GlassCard className="p-5 flex items-center gap-6">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-secondary" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-primary transition-all duration-1000 ease-out" strokeWidth="3" strokeDasharray={`${progress}, 100`} stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
              {progress}%
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">
              {activeTab === 'kit' ? t('prev.progress.kit') : t('prev.progress.gestures')}
            </h3>
            <p className="text-sm text-muted-foreground">{progressHint}</p>
          </div>
        </GlassCard>

        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {currentItems.map((item) => {
              const isChecked = checkedItems.has(item.id);
              return (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    'p-5 rounded-2xl border-2 transition-all text-left relative overflow-hidden group',
                    isChecked
                      ? 'border-primary/50 bg-primary/5 shadow-sm'
                      : 'border-border/50 bg-card hover:border-primary/30 hover:bg-secondary/30'
                  )}
                >
                  {isChecked && (
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                  )}
                  <div className="flex gap-4 relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300",
                      isChecked ? "scale-110 bg-primary/20" : "bg-secondary group-hover:scale-110"
                    )}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={cn(
                        "font-bold text-base mb-1 flex items-center justify-between gap-2 transition-colors",
                        isChecked ? "text-primary" : "text-foreground"
                      )}>
                        <span className="line-clamp-1">{item.title}</span>
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                          isChecked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/50"
                        )}>
                          {isChecked && <CheckCircle size={12} />}
                        </div>
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

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
  );
}
