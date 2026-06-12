const DEFAULT_ATTEMPTS = 2
const BACKOFF_MS = [0, 800]

export async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  options: { attempts?: number } = {}
): Promise<T> {
  const attempts = options.attempts ?? DEFAULT_ATTEMPTS
  let lastError: unknown = null

  for (let i = 0; i < attempts; i++) {
    if (i > 0) {
      await new Promise((r) => setTimeout(r, BACKOFF_MS[i] ?? 1000))
    }
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (i === attempts - 1) break
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Fetch failed after retries')
}
