interface PGAGaugeProps {
  pga: number
  max?: number
}

export function PGAGauge({ pga, max = 2 }: PGAGaugeProps) {
  const pct = Math.min(pga / max, 1)
  const r = 60, cx = 70, cy = 70
  const startAngle = -210, sweepAngle = 240
  const toRad = (d: number) => (d * Math.PI) / 180
  const startRad = toRad(startAngle)
  const endRad = toRad(startAngle + sweepAngle * pct)
  const sx = cx + r * Math.cos(startRad), sy = cy + r * Math.sin(startRad)
  const ex = cx + r * Math.cos(endRad), ey = cy + r * Math.sin(endRad)
  const largeArc = sweepAngle * pct > 180 ? 1 : 0
  const color = pga < 0.05 ? "#22c55e" : pga < 0.2 ? "#fbbf24" : pga < 0.5 ? "#f97316" : "#ef4444"

  return (
    <svg viewBox="0 0 140 110" className="w-28 h-24 md:w-36 md:h-28" aria-label={`PGA: ${(pga*100).toFixed(2)}%g`}>
      {/* Background arc */}
      <path
        d={`M ${cx + r * Math.cos(toRad(startAngle))} ${cy + r * Math.sin(toRad(startAngle))} A ${r} ${r} 0 1 1 ${cx + r * Math.cos(toRad(startAngle + sweepAngle))} ${cy + r * Math.sin(toRad(startAngle + sweepAngle))}`}
        stroke="#1e3a5f" strokeWidth="10" fill="none" strokeLinecap="round"
      />
      {/* Value arc */}
      {pct > 0.01 && (
        <path
          d={`M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`}
          stroke={color} strokeWidth="10" fill="none" strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.5s ease" }}
        />
      )}
      <text x={cx} y={cy + 5} textAnchor="middle" fill={color} fontSize="13" fontWeight="700">
        {(pga * 100).toFixed(2)}
      </text>
      <text x={cx} y={cy + 17} textAnchor="middle" fill="#94a3b8" fontSize="7">%g</text>
      <text x={cx} y={cy + 28} textAnchor="middle" fill="#64748b" fontSize="7">PGA</text>
    </svg>
  )
}
