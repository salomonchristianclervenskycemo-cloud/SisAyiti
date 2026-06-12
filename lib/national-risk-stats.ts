export type NationalRiskId = 'landslides' | 'floods' | 'hurricanes' | 'erosion' | 'drought'

export type NationalRiskStat = {
  id: NationalRiskId
  levelPercent: number
  severity: 'high' | 'medium' | 'low'
  reasonKey: string
  titleKey: string
  descKey: string
}

/** Niveaux indicatifs pour Haïti (données pédagogiques, pas une API temps réel). */
export const NATIONAL_RISK_STATS: NationalRiskStat[] = [
  {
    id: 'landslides',
    titleKey: 'multi.landslides',
    descKey: 'multi.landslides.desc',
    levelPercent: 82,
    severity: 'high',
    reasonKey: 'multi.riskStat.landslides',
  },
  {
    id: 'floods',
    titleKey: 'multi.floods',
    descKey: 'multi.floods.desc',
    levelPercent: 78,
    severity: 'high',
    reasonKey: 'multi.riskStat.floods',
  },
  {
    id: 'hurricanes',
    titleKey: 'multi.hurricanes',
    descKey: 'multi.hurricanes.desc2',
    levelPercent: 85,
    severity: 'high',
    reasonKey: 'multi.riskStat.hurricanes',
  },
  {
    id: 'erosion',
    titleKey: 'multi.erosion',
    descKey: 'multi.erosion.desc2',
    levelPercent: 74,
    severity: 'high',
    reasonKey: 'multi.riskStat.erosion',
  },
  {
    id: 'drought',
    titleKey: 'multi.drought',
    descKey: 'multi.drought.desc2',
    levelPercent: 58,
    severity: 'medium',
    reasonKey: 'multi.riskStat.drought',
  },
]
