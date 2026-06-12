'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

type ReportToastProps = {
  message: string
  offline?: boolean
  open: boolean
  onClose: () => void
  durationMs?: number
}

export function ReportToast({
  message,
  offline = false,
  open,
  onClose,
  durationMs = 5000,
}: ReportToastProps) {
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(onClose, durationMs)
    return () => window.clearTimeout(t)
  }, [open, durationMs, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[200] pointer-events-none"
        >
          <div
            className={cn(
              'flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-xl pointer-events-auto',
              offline
                ? 'bg-amber-500/15 border-amber-500/40 text-foreground'
                : 'bg-emerald-500/15 border-emerald-500/40 text-foreground'
            )}
          >
            {offline ? (
              <WifiOff className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" size={20} />
            ) : (
              <CheckCircle className="shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" size={20} />
            )}
            <p className="text-sm font-medium leading-snug">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
