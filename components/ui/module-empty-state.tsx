'use client'

import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'error' | 'warning'

type Action = {
  label: string
  onClick: () => void
}

type Props = {
  variant?: Variant
  title?: string
  hint?: string
  icon?: LucideIcon
  primaryAction?: Action
  secondaryAction?: Action
  className?: string
}

const VARIANT_ICON: Record<Variant, LucideIcon> = {
  default: Inbox,
  error: AlertTriangle,
  warning: AlertTriangle,
}

const VARIANT_STYLE: Record<Variant, string> = {
  default: 'border-border/60 bg-muted/15',
  error: 'border-destructive/40 bg-destructive/5',
  warning: 'border-amber-500/40 bg-amber-500/10',
}

export function ModuleEmptyState({
  variant = 'default',
  title,
  hint,
  icon,
  primaryAction,
  secondaryAction,
  className,
}: Props) {
  const { t } = useLang()
  const Icon = icon ?? VARIANT_ICON[variant]
  const resolvedTitle =
    title ??
    (variant === 'error' ? t('mod.error.title') : t('mod.empty.title'))
  const resolvedHint = hint ?? t('mod.empty.hint')

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-12 px-6 text-center rounded-2xl border border-dashed',
        VARIANT_STYLE[variant],
        className
      )}
      role="status"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background/60 border border-border/50">
        <Icon size={28} className="text-muted-foreground/55" aria-hidden />
      </span>
      <div className="space-y-1.5 max-w-md">
        <p className="text-sm font-semibold text-foreground">{resolvedTitle}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{resolvedHint}</p>
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border/60 bg-background hover:bg-muted/50 transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={14} aria-hidden />
              {primaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
