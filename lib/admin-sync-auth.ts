/**
 * Protects admin/cron sync routes in production.
 * Accepts: Authorization: Bearer <secret> or x-admin-sync-secret: <secret>
 * Secret: ADMIN_SYNC_SECRET (manual) or CRON_SECRET (Vercel Cron).
 */

export function verifySyncSecret(req: Request): boolean {
  const expected = process.env.ADMIN_SYNC_SECRET || process.env.CRON_SECRET

  if (!expected) {
    return process.env.NODE_ENV !== 'production'
  }

  const auth = req.headers.get('authorization')
  if (auth === `Bearer ${expected}`) return true

  const header = req.headers.get('x-admin-sync-secret')
  if (header === expected) return true

  return false
}

export function unauthorizedSyncResponse() {
  return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
}
