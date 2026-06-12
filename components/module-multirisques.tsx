'use client'

import { useLang } from '@/lib/lang-context'
import { useState, useEffect } from 'react'
import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Home } from 'lucide-react'
import { MultirisquesTab } from '@/components/multirisques/multirisques-tab'
import { DiagnosticTab } from '@/components/diagnostic/diagnostic-tab'

export function ModuleMultirisques() {
  const { t } = useLang()
  const { activeModule, setActiveModule } = useApp()
  const [activeTab, setActiveTab] = useState<'multirisques' | 'diagnostic'>(
    activeModule === 'diagnostic' ? 'diagnostic' : 'multirisques'
  )

  useEffect(() => {
    if (activeModule === 'multirisques') setActiveTab('multirisques')
    else if (activeModule === 'diagnostic') setActiveTab('diagnostic')
  }, [activeModule])

  const handleTabChange = (tab: 'multirisques' | 'diagnostic') => {
    setActiveTab(tab)
    setActiveModule(tab)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 relative overflow-hidden font-sans transition-colors duration-300">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-background to-red-500/5 dark:from-blue-900/20 dark:to-red-900/10 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            type="button"
            onClick={() => handleTabChange('multirisques')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border',
              activeTab === 'multirisques'
                ? 'bg-primary/10 border-primary text-foreground shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                : 'bg-card border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border'
            )}
          >
            <ShieldAlert size={18} className={activeTab === 'multirisques' ? 'text-primary' : ''} />
            {t('multi.title')}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('diagnostic')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border',
              activeTab === 'diagnostic'
                ? 'bg-primary/10 border-primary text-foreground shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                : 'bg-card border-border/50 text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border'
            )}
          >
            <Home size={18} className={activeTab === 'diagnostic' ? 'text-primary' : ''} />
            {t('multi.diag.title')}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'multirisques' ? (
            <motion.div key="multi" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <MultirisquesTab />
            </motion.div>
          ) : (
            <motion.div key="diag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <DiagnosticTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
