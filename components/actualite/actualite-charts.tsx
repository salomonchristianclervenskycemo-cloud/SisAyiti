"use client"

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, BarChart, Bar, Cell,
} from "recharts"
import { BarChart3, Layers, Activity } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { cn } from "@/lib/utils"

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl",
    "shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500",
    className
  )}>
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

export function ActualiteCharts({ chartData, magDistribution, depthDistribution }: Props) {
  const { t } = useLang()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
      <GlassCard className="p-4 flex flex-col lg:col-span-2 group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
            <BarChart3 size={14} className="text-blue-500" />
            {t("act.seismicEvolution")}
          </h3>
        </div>
        <div className="flex-1 min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} vertical={false} />
              <XAxis dataKey="time" stroke="currentColor" strokeOpacity={0.3} fontSize={9} tickMargin={10} minTickGap={30} />
              <YAxis stroke="currentColor" strokeOpacity={0.3} fontSize={9} domain={["dataMin - 1", "dataMax + 1"]} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                itemStyle={{ color: "var(--foreground)" }}
              />
              <Area type="monotone" dataKey="magnitude" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMag)" filter="url(#glow)" activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-4 flex flex-col group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
            <Layers size={14} className="text-blue-500" />
            {t("act.byMagnitude")}
          </h3>
        </div>
        <div className="flex-1 min-h-[150px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={magDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} vertical={false} />
              <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.3} fontSize={9} tickMargin={5} />
              <YAxis stroke="currentColor" strokeOpacity={0.3} fontSize={9} />
              <RechartsTooltip
                cursor={{ fill: "currentColor", opacity: 0.05 }}
                contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} className="group-hover:opacity-90 transition-opacity">
                {magDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-4 flex flex-col group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
            <Activity size={14} className="text-cyan-500" />
            {t("act.depth")}
          </h3>
        </div>
        <div className="flex-1 min-h-[150px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={depthDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.05} vertical={false} />
              <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.3} fontSize={9} tickMargin={5} />
              <YAxis stroke="currentColor" strokeOpacity={0.3} fontSize={9} />
              <RechartsTooltip
                cursor={{ fill: "currentColor", opacity: 0.05 }}
                contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              />
              <Bar dataKey="count" radius={[2, 2, 0, 0]} className="group-hover:opacity-90 transition-opacity">
                {depthDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  )
}
