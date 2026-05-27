'use client'

import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts'
import { riskColor, type RiskLevel } from '@/lib/seismic-types'

interface MiniChartProps {
  data: Record<RiskLevel, number>
}

const LABELS: Record<RiskLevel, string> = {
  critical: 'Crit',
  high: 'Élev',
  medium: 'Mod',
  low: 'Faib',
}

export function MiniChart({ data }: MiniChartProps) {
  const safeData =
    data && typeof data === 'object'
      ? data
      : ({ critical: 0, high: 0, medium: 0, low: 0 } as Record<RiskLevel, number>)
  const chartData = (Object.keys(safeData) as RiskLevel[]).map((key) => ({
    name: LABELS[key],
    value: safeData[key],
    fill: riskColor(key),
  }))

  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
