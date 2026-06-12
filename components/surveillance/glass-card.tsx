"use client"

import { cn } from "@/lib/utils"

export function GlassCard({
  children,
  className,
  glowColor,
}: {
  children: React.ReactNode
  className?: string
  glowColor?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "border border-border/50 bg-card/85 backdrop-blur-md",
        "shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.18)]",
        "transition-shadow duration-300",
        className
      )}
    >
      {glowColor && (
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[72px] opacity-25 dark:opacity-15 pointer-events-none"
          style={{ backgroundColor: glowColor }}
          aria-hidden
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}
