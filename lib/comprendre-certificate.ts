const CERT_KEY = 'sisayiti_comprendre_certificate'

export type ComprendreCertificate = {
  issuedAt: string
  sectionsCompleted: number
}

export function loadComprendreCertificate(): ComprendreCertificate | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CERT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ComprendreCertificate
  } catch {
    return null
  }
}

export function issueComprendreCertificate(sectionsCompleted: number): ComprendreCertificate {
  const cert: ComprendreCertificate = {
    issuedAt: new Date().toISOString(),
    sectionsCompleted,
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(CERT_KEY, JSON.stringify(cert))
    window.dispatchEvent(new Event('sisayiti-comprendre-progress'))
  }
  return cert
}
