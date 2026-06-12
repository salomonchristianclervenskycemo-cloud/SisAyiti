'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'
import { HAITI_FAULT_EPGF_PATH, HAITI_MAIN_PATH } from '@/lib/haiti-outline'

type Props = {
  className?: string
  variant?: 'hero' | 'compact'
}

/** Badge carré arrondi — lisible dès 40 px (sidebar) */
function LogoMark({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '')
  const gradId = `saGrad-${uid}`

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('shrink-0', className)}
      role="img"
      aria-label="SisAyiti"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d2b55" />
          <stop offset="100%" stopColor="#2e8bc0" />
        </linearGradient>
      </defs>

      <rect x="1" y="1" width="62" height="62" rx="16" fill={`url(#${gradId})`} />

      <g transform="translate(9, 11) scale(0.108)">
        <path
          d={HAITI_MAIN_PATH}
          fill="white"
          fillOpacity={0.92}
        />
        <path
          d={HAITI_FAULT_EPGF_PATH}
          fill="none"
          stroke="#ef4444"
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <polyline
        points="8,50 14,50 18,42 24,54 30,46 36,50 56,50"
        fill="none"
        stroke="white"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
      />
    </svg>
  )
}

function LogoWordmark({ variant }: { variant: 'hero' | 'compact' }) {
  const hero = variant === 'hero'

  return (
    <div className={cn('min-w-0', hero && 'space-y-1.5')}>
      <p
        className={cn(
          'font-black tracking-tight leading-none',
          hero ? 'text-[1.75rem] sm:text-4xl' : 'text-lg leading-tight'
        )}
      >
        <span className="text-foreground">Sis</span>
        <span className="text-primary">Ayiti</span>
      </p>
      {hero && (
        <p className="text-[11px] sm:text-xs font-medium text-muted-foreground tracking-wide">
          Konprann · Simile · Prepare
        </p>
      )}
    </div>
  )
}

export function SisAyitiLogo({ className, variant = 'hero' }: Props) {
  const compact = variant === 'compact'
  const markSize = compact ? 'w-10 h-10' : 'w-14 h-14 sm:w-16 sm:h-16'

  return (
    <div
      className={cn(
        'flex items-center',
        compact ? 'gap-2.5' : 'gap-3.5 sm:gap-4',
        className
      )}
    >
      <LogoMark className={markSize} />
      <LogoWordmark variant={variant} />
    </div>
  )
}
