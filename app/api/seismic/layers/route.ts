import { NextResponse } from 'next/server'
import {
  FAULT_LINES_GEOJSON,
  LIQUEFACTION_ZONES_GEOJSON,
  RISK_ZONES_GEOJSON,
} from '@/lib/seismic-layers-data'

// Static GeoJSON data — no DB or Redis dependency needed
const STATIC_RESPONSE = {
  success: true,
  layers: {
    faults: FAULT_LINES_GEOJSON,
    liquefaction: LIQUEFACTION_ZONES_GEOJSON,
    riskZones: RISK_ZONES_GEOJSON,
  },
}

export async function GET() {
  return NextResponse.json(STATIC_RESPONSE, {
    headers: {
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
    },
  })
}
