"use client"

import { useMemo, useState } from "react"
import { SOIL_OPTIONS } from "@/lib/labo-constants"
import { runLaboSimulation } from "@/shared/labo-simulation"
import type { BuildingQuality } from "@/lib/seismic-engine"

export function useLaboSimulation() {
  const [magnitude, setMagnitude] = useState(5.5)
  const [distance, setDistance] = useState(50)
  const [soilId, setSoilId] = useState("rock")
  const [buildingQuality, setBuildingQuality] = useState<BuildingQuality>("fair")
  const [shaking, setShaking] = useState(false)

  const soil = SOIL_OPTIONS.find((s) => s.id === soilId) ?? SOIL_OPTIONS[0]

  const simulation = useMemo(
    () =>
      runLaboSimulation({
        magnitude,
        distance,
        soilFactor: soil.factor,
        buildingQuality,
      }),
    [magnitude, distance, soil.factor, buildingQuality]
  )

  const triggerShake = () => {
    setShaking(true)
    setTimeout(() => setShaking(false), 1200)
  }

  return {
    magnitude,
    setMagnitude,
    distance,
    setDistance,
    soilId,
    setSoilId,
    soil,
    buildingQuality,
    setBuildingQuality,
    shaking,
    triggerShake,
    ...simulation,
  }
}

export type LaboSimulation = ReturnType<typeof useLaboSimulation>
