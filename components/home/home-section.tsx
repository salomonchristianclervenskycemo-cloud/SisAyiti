'use client'

import { cn } from '@/lib/utils'

type Props = {
  id?: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  /** Bande alternée légèrement plus claire */
  alternate?: boolean
}

export function HomeSection({ id, title, subtitle, children, className, alternate }: Props) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40',
        alternate ? 'bg-card/30' : 'bg-background',
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <header className="mb-8 md:mb-10">
            {title && (
              <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">{title}</h2>
            )}
            {subtitle && (
              <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
