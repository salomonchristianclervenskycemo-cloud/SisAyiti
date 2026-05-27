/**
 * @jest-environment node
 */
import { verifySyncSecret } from '@/lib/admin-sync-auth'

describe('verifySyncSecret', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv, NODE_ENV: 'production', ADMIN_SYNC_SECRET: 'test-secret' }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('accepts Bearer token', () => {
    const req = new Request('http://localhost/api/external/usgs-sync', {
      headers: { authorization: 'Bearer test-secret' },
    })
    expect(verifySyncSecret(req)).toBe(true)
  })

  it('accepts x-admin-sync-secret header', () => {
    const req = new Request('http://localhost/api/external/usgs-sync', {
      headers: { 'x-admin-sync-secret': 'test-secret' },
    })
    expect(verifySyncSecret(req)).toBe(true)
  })

  it('rejects wrong secret', () => {
    const req = new Request('http://localhost/api/external/usgs-sync', {
      headers: { authorization: 'Bearer wrong' },
    })
    expect(verifySyncSecret(req)).toBe(false)
  })

  it('allows open access in development when no secret set', () => {
    process.env = { ...originalEnv, NODE_ENV: 'development' }
    delete process.env.ADMIN_SYNC_SECRET
    delete process.env.CRON_SECRET
    const req = new Request('http://localhost/api/external/usgs-sync')
    expect(verifySyncSecret(req)).toBe(true)
  })
})
