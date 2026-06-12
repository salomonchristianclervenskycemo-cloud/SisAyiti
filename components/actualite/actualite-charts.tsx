"use client"

import { useEffect, useId, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { BarChart3, Layers, Activity } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { cn } from "@/lib/utils"

const CHART_H_MAIN = 220
const CHART_H_BAR = 180

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-2xl border border-border/50 bg-card/85 backdrop-blur-md shadow-sm",
      className
    )}
  >
    {children}
  </div>
)

type ChartPoint = { time: string; magnitude: number; depth: number; risk: string }
type DistPoint = { name: string; count: number; color: string }

type Props = {
  chartData: ChartPoint[]
  magDistribution: DistPoint[]
  depthDistribution: DistPoint[]
}

function ChartBox({
  height,
  children,
}: {
  height: number
  children: React.ReactNode
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return (
      <div
        className="w-full surveillance-shimmer rounded-lg"
        style={{ height }}
        aria-hidden
      />
    )
  }

  return (
    <div className="w-full min-w-0" style={{ height }}>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export function ActualiteCharts({ chartData, magDistribution, depthDistribution }: Props) {
  const { t } = useLang()
  const uid = useId().replace(/:/g, "")
  const gradMag = `colorMag-${uid}`
  const glowId = `glow-${uid}`

  if (chartData.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <GlassCard className="p-4 lg:col-span-2">
        <h3 className="text-[10px] font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider mb-3">
          <BarChart3 size={14} className="text-primary" aria-hidden />
          {t("act.seismicEvolution")}
        </h3>
        <ChartBox height={CHART_H_MAIN}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id={gradMag} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} vertical={false} />
            <XAxis dataKey="time" stroke="currentColor" strokeOpacity={0.35} fontSize={10} tickMargin={8} minTickGap={32} />
            <YAxis stroke="currentColor" strokeOpacity={0.35} fontSize={10} domain={["dataMin - 1", "dataMax + 1"]} width={32} />
            <RechartsTooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="magnitude"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${gradMag})`}
              activeDot={{ r: 5, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ChartBox>
      </GlassCard>

      <GlassCard className="p-4">
        <h3 className="text-[10px] font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider mb-3">
          <Layers size={14} className="text-primary" aria-hidden />
          {t("act.byMagnitude")}
        </h3>
        <ChartBox height={CHART_H_BAR}>
          <BarChart data={magDistribution} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} vertical={false} />
            <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.35} fontSize={10} />
            <YAxis stroke="currentColor" strokeOpacity={0.35} fontSize={10} width={28} allowDecimals={false} />
            <RechartsTooltip
              cursor={{ fill: "currentColor", opacity: 0.05 }}
              contentStyle={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {magDistribution.map((entry, index) => (
                <Cell key={`mag-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartBox>
      </GlassCard>

      <GlassCard className="p-4">
        <h3 className="text-[10px] font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider mb-3">
          <Activity size={14} className="text-cyan-600 dark:text-cyan-400" aria-hidden />
          {t("act.depth")}
        </h3>
        <ChartBox height={CHART_H_BAR}>
          <BarChart data={depthDistribution} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} vertical={false} />
            <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.35} fontSize={9} interval={0} angle={-12} textAnchor="end" height={48} />
            <YAxis stroke="currentColor" strokeOpacity={0.35} fontSize={10} width={28} allowDecimals={false} />
            <RechartsTooltip
              cursor={{ fill: "currentColor", opacity: 0.05 }}
              contentStyle={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {depthDistribution.map((entry, index) => (
                <Cell key={`depth-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartBox>
      </GlassCard>
    </div>
  )
}
