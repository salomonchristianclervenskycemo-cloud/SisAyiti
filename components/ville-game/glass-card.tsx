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
}
