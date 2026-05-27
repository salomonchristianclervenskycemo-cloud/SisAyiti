"use client"

import { useMemo } from "react"
import { SeismicEventUI } from "@/lib/seismic-types"

interface WorldMapWidgetProps {
  events: SeismicEventUI[]
  selectedEventId?: string | null
  onSelectEvent?: (event: SeismicEventUI) => void
}

export function WorldMapWidget({ events, selectedEventId, onSelectEvent }: WorldMapWidgetProps) {
  // Conversion simple Lat/Lng vers X/Y pour une carte SVG (Mercator très basique)
  // Dimensions SVG arbitraires pour le ratio
  const SVG_WIDTH = 800
  const SVG_HEIGHT = 400

  const getCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * SVG_WIDTH
    // Approximation Mercator pour le Y
    const latRad = (lat * Math.PI) / 180
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
    const y = SVG_HEIGHT / 2 - (SVG_WIDTH * mercN) / (2 * Math.PI)
    return { x, y }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "#ef4444"
      case "high": return "#f97316"
      case "medium": return "#eab308"
      default: return "#3b82f6"
    }
  }

  return (
    <div className="relative w-full h-full min-h-[200px] bg-[#020617] rounded-xl border border-white/5 overflow-hidden">
      {/* Grille de fond */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="absolute inset-0 w-full h-full">
        {/* Simplified World Map Path (Equirectangular approximation) */}
        <path 
          d="M 100 100 Q 150 50 200 100 T 300 100 T 400 100 T 500 100 T 600 100 T 700 100 M 150 150 Q 200 200 250 150 T 350 150 T 450 150 T 550 150 T 650 150 M 200 200 Q 250 250 300 200 T 400 200 T 500 200 T 600 200 M 250 250 Q 300 300 350 250 T 450 250 T 550 250 M 300 300 Q 350 350 400 300 T 500 300 M 350 350 Q 400 400 450 350 M 400 400 Q 450 450 500 400 M 450 450 Q 500 500 550 450 M 500 500 Q 550 550 600 500 M 550 550 Q 600 600 650 550 M 600 600 Q 650 650 700 600 M 650 650 Q 700 700 750 650 M 700 700 Q 750 750 800 700" 
          stroke="rgba(255,255,255,0.1)" 
          fill="none" 
          strokeWidth="1" 
        />
        <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill="rgba(2,6,23,0.5)" />
        
        {/* Map Dots (Continents approximation) */}
        {Array.from({ length: 400 }).map((_, i) => {
          // Génération pseudo-aléatoire de points pour simuler une carte du monde stylisée
          const x = (Math.sin(i * 12.3) * 0.5 + 0.5) * SVG_WIDTH
          const y = (Math.cos(i * 4.5) * 0.5 + 0.5) * SVG_HEIGHT
          // Filtrer grossièrement pour ne garder que les zones terrestres (très simplifié)
          if ((x > 150 && x < 300 && y > 50 && y < 300) || // Amériques
              (x > 350 && x < 500 && y > 50 && y < 250) || // Europe/Afrique
              (x > 500 && x < 750 && y > 30 && y < 250) || // Asie
              (x > 600 && x < 750 && y > 250 && y < 350))  // Océanie
          {
            return <circle key={`bg-${i}`} cx={x} cy={y} r="1.5" fill="rgba(255,255,255,0.1)" />
          }
          return null
        })}

        {/* Seismic Events */}
        {events.map(event => {
          const { x, y } = getCoordinates(event.latitude, event.longitude)
          const isSelected = selectedEventId === event.id
          const color = getRiskColor(event.risk)
          const radius = Math.max(2, event.magnitude)

          return (
            <g 
              key={event.id} 
              className={isSelected ? "cursor-default" : "cursor-pointer hover:opacity-80"}
              onClick={() => onSelectEvent?.(event)}
            >
              {isSelected && (
                <>
                  <circle cx={x} cy={y} r={radius * 4} fill="none" stroke={color} strokeWidth="1" className="animate-ping opacity-50" />
                  <circle cx={x} cy={y} r={radius * 8} fill="none" stroke={color} strokeWidth="0.5" className="animate-ping opacity-30" style={{ animationDelay: '0.5s' }} />
                </>
              )}
              <circle cx={x} cy={y} r={radius} fill={color} opacity={isSelected ? 1 : 0.6} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
