/**
 * État serveur pour détecter les nouveaux événements entre polls SSE.
 */

const snapshots = new Map<string, Set<string>>()

export function streamSnapshotKey(days: number, minMagnitude: number, includeGlobal: boolean): string {
  return `stream:${days}:${minMagnitude}:${includeGlobal ? 1 : 0}`
}

export function diffNewEventIds(key: string, currentIds: string[]): string[] {
  const prev = snapshots.get(key) ?? new Set<string>()
  const next = new Set(currentIds)
  snapshots.set(key, next)
  if (prev.size === 0) return []
  return currentIds.filter((id) => !prev.has(id))
}

export function resetStreamSnapshot(key: string): void {
  snapshots.delete(key)
}
