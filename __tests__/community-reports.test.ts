import {
  mergeReports,
  type CommunityReport,
} from '@/lib/community-reports'

describe('mergeReports', () => {
  const local: CommunityReport[] = [
    {
      id: 'local-1',
      hazardType: 'flood',
      description: 'pending',
      severity: 'moderate',
      latitude: null,
      longitude: null,
      createdAt: '2026-05-26T12:00:00.000Z',
      synced: false,
      pendingSync: true,
    },
  ]

  const server: CommunityReport[] = [
    {
      id: 'local-1',
      hazardType: 'flood',
      description: 'synced',
      severity: 'moderate',
      latitude: null,
      longitude: null,
      createdAt: '2026-05-26T12:00:00.000Z',
      synced: true,
      pendingSync: false,
    },
    {
      id: 'srv-2',
      hazardType: 'landslide',
      description: '',
      severity: 'low',
      latitude: 18.5,
      longitude: -72.3,
      createdAt: '2026-05-26T11:00:00.000Z',
      synced: true,
      pendingSync: false,
    },
  ]

  it('keeps local pending over server copy', () => {
    const merged = mergeReports(local, server)
    const pending = merged.find((r) => r.id === 'local-1')
    expect(pending?.pendingSync).toBe(true)
    expect(pending?.description).toBe('pending')
  })

  it('includes server-only entries', () => {
    const merged = mergeReports(local, server)
    expect(merged.some((r) => r.id === 'srv-2')).toBe(true)
  })
})
