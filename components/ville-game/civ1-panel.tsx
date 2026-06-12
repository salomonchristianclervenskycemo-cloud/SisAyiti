"use client"

import { cn } from "@/lib/utils"
import { villePanel, villePanelTitle } from "./civ1-theme"

export function Civ1Panel({
  children,
  className,
  title,
  glowColor,
}: {
  children: React.ReactNode
  className?: string
  title?: string
  glowColor?: string
}) {
  return (
    <div className={cn(villePanel, "relative", className)}>
      {glowColor && (
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[70px] opacity-25 pointer-events-none"
          style={{ backgroundColor: glowColor }}
        />
      )}
      {title && <div className={villePanelTitle}>{title}</div>}
      <div className="p-4 relative z-10">{children}</div>
    </div>
  )
}

export function GlassCard({
  children,
  className,
  title,
  glowColor,
}: {
  children: React.ReactNode
  className?: string
  glowColor?: string
  title?: string
}) {
  return (
    <Civ1Panel className={className} title={title} glowColor={glowColor}>
      {children}
    </Civ1Panel>
  )
}
