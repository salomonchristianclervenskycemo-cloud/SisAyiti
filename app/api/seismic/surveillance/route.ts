import { NextRequest, NextResponse } from 'next/server'

import { surveillanceEventsToUI } from '@/lib/surveillance/bridge-to-ui'

import { fetchResolvedSurveillanceFeed } from '@/lib/surveillance/fetch-resolved-feed'

import type { SeismicAggregationMeta, SurveillanceSeismicEvent } from '@/lib/surveillance/types'

import type { SeismicEventUI } from '@/lib/seismic-types'



export const dynamic = 'force-dynamic'



export type SurveillanceApiResponse = {

  success: boolean

  mode: string

  status_message_key: string

  from_cache: boolean

  server_cache: boolean

  count: number

  events: SurveillanceSeismicEvent[]

  haiti_events: SurveillanceSeismicEvent[]

  global_events: SurveillanceSeismicEvent[]

  ui_events: SeismicEventUI[]

  meta: SeismicAggregationMeta

  timestamp: string

  network_error?: string | null

}



export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams

  const days = Math.min(Math.max(parseInt(searchParams.get('days') || '7', 10), 1), 30)

  const minMagnitude = Math.max(parseFloat(searchParams.get('minMagnitude') || '2'), 0)

  const includeGlobal = searchParams.get('global') !== 'false'



  const { resolved, server_cache, network_error } = await fetchResolvedSurveillanceFeed({

    days,

    min_magnitude: minMagnitude,

    include_global: includeGlobal,

  })



  const body: SurveillanceApiResponse = {

    success: resolved.mode !== 'error',

    mode: resolved.mode,

    status_message_key: resolved.status_message_key,

    from_cache: resolved.from_cache || server_cache,

    server_cache,

    count: resolved.result.events.length,

    events: resolved.result.events,

    haiti_events: resolved.result.haiti_events,

    global_events: resolved.result.global_events,

    ui_events: surveillanceEventsToUI(resolved.result.events),

    meta: resolved.result.meta,

    timestamp: new Date().toISOString(),

    network_error: resolved.network_error ?? network_error,

  }



  return NextResponse.json(body, {
    status: 200,
    headers: {
      'Cache-Control': server_cache ? 'private, max-age=60' : 'no-store',
      'X-SisAyiti-Cache': server_cache ? 'hit' : 'miss',
    },
  })

}

