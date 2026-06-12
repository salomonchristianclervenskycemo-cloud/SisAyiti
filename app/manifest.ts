import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SisAyiti — Comprendre · Simuler · Se préparer',
    short_name: 'SisAyiti',
    description:
      'Plateforme éducative pour comprendre les séismes en Haïti et se préparer aux risques.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    lang: 'fr',
    categories: ['education', 'utilities'],
  }
}
