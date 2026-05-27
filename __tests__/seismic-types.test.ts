import { magnitudeToRisk, riskColor } from '@/lib/seismic-types'

describe('Seismic Types & Utils', () => {
  describe('magnitudeToRisk', () => {
    it('returns critical for magnitude >= 6.5', () => {
      expect(magnitudeToRisk(7.0)).toBe('critical')
      expect(magnitudeToRisk(6.5)).toBe('critical')
    })

    it('returns critical for magnitude >= 5.5 if distance < 100km', () => {
      expect(magnitudeToRisk(5.8, 50)).toBe('critical')
    })

    it('returns high for magnitude >= 5.5', () => {
      expect(magnitudeToRisk(6.0, 200)).toBe('high')
    })

    it('returns medium for magnitude >= 4.5', () => {
      expect(magnitudeToRisk(4.8, 200)).toBe('medium')
    })

    it('returns low for magnitude < 4.5', () => {
      expect(magnitudeToRisk(3.0, 200)).toBe('low')
    })
  })

  describe('riskColor', () => {
    it('returns correct colors', () => {
      expect(riskColor('critical')).toBe('#ff3333')
      expect(riskColor('high')).toBe('#ff6b6b')
      expect(riskColor('medium')).toBe('#ffb700')
      expect(riskColor('low')).toBe('#00f2ff')
    })
  })
})
