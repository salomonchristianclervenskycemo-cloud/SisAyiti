"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  icon: LucideIcon
  title: string
  badge?: string
  className?: string
}

export function SurveillanceSectionHeading({ icon: Icon, title, badge, className }: Props) {
  return (
    <div className={cn("flex items-center gap-2.5 min-h-9", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0">
        <Icon size={16} strokeWidth={2.25} />
      </span>
      <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">{title}</h2>
      {badge != null && (
        <span className="ml-auto text-xs font-medium tabular-nums text-muted-foreground bg-muted/60 border border-border/60 px-2.5 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
  )
}
