"use client"

import { GlassCard } from "./glass-card"

export function SurveillanceDashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300" aria-hidden>
      <div className="h-16 rounded-xl surveillance-shimmer border border-border/40" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <GlassCard key={i} className="h-24 surveillance-shimmer">
            <span className="sr-only">Loading</span>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <GlassCard className="lg:col-span-4 h-[280px] surveillance-shimmer">
          <span className="sr-only">Loading</span>
        </GlassCard>
        <GlassCard className="lg:col-span-8 h-[280px] surveillance-shimmer">
          <span className="sr-only">Loading</span>
        </GlassCard>
      </div>
    </div>
  )
}
