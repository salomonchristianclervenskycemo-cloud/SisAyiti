import { render, screen } from '@testing-library/react'
import { RealTimeBadge } from '@/components/shared/real-time-badge'

// Mock the store
jest.mock('@/lib/seismic-store', () => ({
  useSeismicStore: jest.fn((selector) => {
    const state = {
      liveConnected: true,
      lastSync: '2026-05-23T12:00:00Z',
    }
    return selector(state)
  }),
}))

describe('RealTimeBadge', () => {
  it('renders correctly in French', () => {
    render(<RealTimeBadge lang="fr" />)
    expect(screen.getByText('TEMPS RÉEL')).toBeInTheDocument()
  })

  it('renders correctly in Haitian Creole', () => {
    render(<RealTimeBadge lang="kr" />)
    expect(screen.getByText('TAN REYÈL')).toBeInTheDocument()
  })
})
