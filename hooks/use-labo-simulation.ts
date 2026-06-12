"use client"

import { useEffect, useMemo, useState } from "react"
import { SOIL_OPTIONS } from "@/lib/labo-constants"
import { runLaboSimulation } from "@/shared/labo-simulation"
import type { BuildingQuality } from "@/lib/seismic-engine"
import { consumeLaboPreset, recordLaboSimulation, type LaboPreset } from "@/lib/offline-education"

export function useLaboSimulation() {
  const [magnitude, setMagnitude] = useState(5.5)
  const [distance, setDistance] = useState(50)
  const [soilId, setSoilId] = useState("rock")
  const [buildingQuality, setBuildingQuality] = useState<BuildingQuality>("fair")
  const [shaking, setShaking] = useState(false)
  const [fromDiagnostic, setFromDiagnostic] = useState(false)
  const [presetInfo, setPresetInfo] = useState<LaboPreset | null>(null)

  useEffect(() => {
    const preset = consumeLaboPreset()
    if (!preset) return
    setMagnitude(preset.magnitude)
    setDistance(preset.distance)
    setSoilId(preset.soilId)
    setBuildingQuality(preset.buildingQuality)
    setFromDiagnostic(true)
    setPresetInfo(preset)
  }, [])

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
    recordLaboSimulation()
    setTimeout(() => setShaking(false), 1200)
  }

  const dismissPresetBanner = () => {
    setFromDiagnostic(false)
    setPresetInfo(null)
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
    fromDiagnostic,
    presetInfo,
    dismissPresetBanner,
    ...simulation,
  }
}

export type LaboSimulation = ReturnType<typeof useLaboSimulation>
