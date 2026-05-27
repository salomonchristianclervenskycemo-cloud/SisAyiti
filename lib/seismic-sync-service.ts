/**
 * Seismic Sync Service
 * Background service for periodic synchronization with USGS/EMSC
 */

import { prisma } from './db'
import { getCache, setCache } from './redis'
import { seismicProcessor, SeismicEventData } from './seismic-service'

const SYNC_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes
const CACHE_KEY = 'seismic:last-sync'
const EVENTS_CACHE_KEY = 'seismic:events'
const HAITI_BBOX = { minLat: 17.5, maxLat: 20.5, minLon: -74.5, maxLon: -71.5 }

// ============================================
// Sync Service
// ============================================

export class SeismicSyncService {
  private syncInProgress = false
  private syncTimer: NodeJS.Timeout | null = null

  /**
   * Start background sync service
   */
  start() {
    console.log('[SeismicSync] Service starting...')
    this.sync() // Initial sync
    this.syncTimer = setInterval(() => this.sync(), SYNC_INTERVAL_MS)
  }

  /**
   * Stop background sync service
   */
  stop() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer)
      this.syncTimer = null
    }
    console.log('[SeismicSync] Service stopped')
  }

  /**
   * Manual sync trigger
   */
  async sync() {
    if (this.syncInProgress) {
      console.log('[SeismicSync] Sync already in progress, skipping...')
      return
    }

    this.syncInProgress = true
    const startTime = Date.now()

    try {
      console.log('[SeismicSync] Starting synchronization...')

      // Fetch Haiti-specific data
      const haitiEvents = await seismicProcessor.fetchHaitiData(2.0)
      console.log(`[SeismicSync] Fetched ${haitiEvents.length} events from Haiti region`)

      // Process each event
      const processedCount = await this.processEvents(haitiEvents)
      console.log(`[SeismicSync] Processed ${processedCount} new events`)

      // Update daily statistics
      await this.updateDailyStatistics()

      // Update cache
      await this.updateEventCache(haitiEvents)

      // Update last sync timestamp
      await setCache(CACHE_KEY, new Date().toISOString(), 24 * 3600)

      const duration = Date.now() - startTime
      console.log(`[SeismicSync] Sync completed in ${duration}ms`)
    } catch (error) {
      console.error('[SeismicSync] Sync error:', error)
    } finally {
      this.syncInProgress = false
    }
  }

  /**
   * Process and store seismic events
   */
  private async processEvents(events: SeismicEventData[]): Promise<number> {
    let processedCount = 0

    for (const event of events) {
      try {
        // Check if event already exists
        const existing = await prisma.seismicEvent.findFirst({
          where: {
            OR: [{ usgsId: event.usgsId }, { emscId: event.emscId }],
          },
        })

        if (existing) continue

        // Create new event
        await prisma.seismicEvent.create({
          data: {
            usgsId: event.usgsId,
            emscId: event.emscId,
            source: event.source,
            latitude: event.latitude,
            longitude: event.longitude,
            depth: event.depth,
            magnitude: event.magnitude,
            magnitudeType: event.magnitudeType,
            eventType: event.eventType,
            eventTime: event.eventTime,
            region: event.region,
            tsunami: event.tsunami || false,
            felt: event.felt || false,
            reviewed: event.reviewed || false,
          },
        })

        // Create alert if high magnitude
        if (event.magnitude >= 5.0) {
          const riskLevel = seismicProcessor.classifyRiskLevel(event)
          const severity = this.mapRiskToSeverity(riskLevel)

          const newEvent = await prisma.seismicEvent.findFirst({
            where: {
              OR: [{ usgsId: event.usgsId }, { emscId: event.emscId }],
            },
          })

          if (newEvent) {
            await prisma.realTimeAlert.create({
              data: {
                eventId: newEvent.id,
                alertType: 'magnitude_threshold',
                severity,
                message: `Séisme M${event.magnitude.toFixed(1)} — ${event.region ?? 'Haïti'}`,
                affectedLatitude: event.latitude,
                affectedLongitude: event.longitude,
                affectedRadius: 100,
              },
            })
          }
        }

        processedCount++
      } catch (error) {
        console.error('[SeismicSync] Error processing event:', error)
      }
    }

    return processedCount
  }

  /**
   * Update daily statistics
   */
  private async updateDailyStatistics() {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const dailyStats = await prisma.dailyStatistics.upsert({
        where: { date: today },
        create: {
          date: today,
          earthquakeCount: 0,
          avgMagnitude: 0,
          maxMagnitude: 0,
          minMagnitude: 0,
          activeUsers: 0,
          diagnosticsCompleted: 0,
          gamesPlayed: 0,
          alertsTriggered: 0,
          criticalAlerts: 0,
        },
        update: {},
      })

      // Calculate today's statistics
      const eventsToday = await prisma.seismicEvent.findMany({
        where: {
          eventTime: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      })

      const alertsToday = await prisma.realTimeAlert.findMany({
        where: {
          createdAt: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      })

      const criticalAlerts = alertsToday.filter((a) => a.severity === 'critical').length

      if (eventsToday.length > 0) {
        const magnitudes = eventsToday.map((e) => e.magnitude)
        const avgMagnitude = magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length

        await prisma.dailyStatistics.update({
          where: { id: dailyStats.id },
          data: {
            earthquakeCount: eventsToday.length,
            avgMagnitude,
            maxMagnitude: Math.max(...magnitudes),
            minMagnitude: Math.min(...magnitudes),
            alertsTriggered: alertsToday.length,
            criticalAlerts,
          },
        })
      }
    } catch (error) {
      console.error('[SeismicSync] Error updating daily statistics:', error)
    }
  }

  /**
   * Update Redis cache with events
   */
  private async updateEventCache(events: SeismicEventData[]) {
    try {
      // Sort by magnitude and take top 100
      const topEvents = events.sort((a, b) => b.magnitude - a.magnitude).slice(0, 100)

      await setCache(EVENTS_CACHE_KEY, topEvents, 5 * 60)
    } catch (error) {
      console.error('[SeismicSync] Error updating event cache:', error)
    }
  }

  /**
   * Map risk level to alert severity
   */
  private mapRiskToSeverity(
    riskLevel: string
  ): 'low' | 'medium' | 'high' | 'critical' {
    switch (riskLevel) {
      case 'CRITICAL':
        return 'critical'
      case 'HIGH':
        return 'high'
      case 'MEDIUM':
        return 'medium'
      default:
        return 'low'
    }
  }
}

// Create singleton instance
let syncService: SeismicSyncService | null = null

export function getSeismicSyncService(): SeismicSyncService {
  if (!syncService) {
    syncService = new SeismicSyncService()
  }
  return syncService
}

// Auto-start in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    const service = getSeismicSyncService()
    service.start()
  }, 1000)
}
